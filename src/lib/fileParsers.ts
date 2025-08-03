import { PoEntry } from "../components/TranslatorApp";

export interface ParsedFile {
  entries: PoEntry[];
  format: 'po' | 'json' | 'csv' | 'html' | 'mo';
  metadata?: Record<string, any>;
}

/**
 * Filters out unwanted HTML content from translation entries
 */
function shouldSkipEntry(msgid: string): boolean {
  // Skip empty entries
  if (!msgid || msgid.trim() === '') return true;

  // Skip entries that are just HTML tags without meaningful content
  const htmlOnlyRegex = /^<[^>]*>$/;
  if (htmlOnlyRegex.test(msgid.trim())) return true;

  // Skip WordPress-specific footer/credit messages
  const wordpressCredits = [
    /Hvala vam što stvarate s WordPressom/i,
    /Thank you for creating with WordPress/i,
    /Proudly powered by WordPress/i,
    /WordPress\.org/i,
    /WordPress\.com/i
  ];

  if (wordpressCredits.some(pattern => pattern.test(msgid))) return true;

  // Skip entries that are just HTML paragraph tags with generic content
  const genericParagraphRegex = /<p[^>]*>.*?(WordPress|wp-|admin).*?<\/p>/i;
  if (genericParagraphRegex.test(msgid)) return true;

  // Skip entries that contain only HTML entities or special characters
  const htmlEntitiesOnlyRegex = /^(&[a-zA-Z0-9#]+;|\s|<[^>]*>)*$/;
  if (htmlEntitiesOnlyRegex.test(msgid)) return true;

  return false;
}

/**
 * Cleans HTML content while preserving meaningful text
 */
function cleanHtmlContent(msgid: string): string {
  // Remove HTML comments
  let cleaned = msgid.replace(/<!--[\s\S]*?-->/g, '');

  // Remove script and style tags completely
  cleaned = cleaned.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, '');

  // For paragraph tags, extract the text content if it's meaningful
  cleaned = cleaned.replace(/<p[^>]*>(.*?)<\/p>/gi, (match, content) => {
    const textContent = content.replace(/<[^>]*>/g, '').trim();
    // If the paragraph contains meaningful text (not just WordPress credits), keep the text
    if (textContent && !shouldSkipEntry(textContent)) {
      return textContent;
    }
    return ''; // Remove the entire paragraph if it's not meaningful
  });

  return cleaned.trim();
}

// Parse .po/.pot files
export function parsePoFile(content: string): ParsedFile {
  const entries: PoEntry[] = [];
  const lines = content.split('\n');
  
  let currentEntry: Partial<PoEntry> = {};
  let currentMsgid = '';
  let currentMsgstr = '';
  let inMsgid = false;
  let inMsgstr = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines and comments (except special comments)
    if (!line || line.startsWith('#~')) continue;

    // Handle references
    if (line.startsWith('#:')) {
      if (!currentEntry.references) currentEntry.references = [];
      currentEntry.references.push(line.substring(2).trim());
      continue;
    }

    // Handle other comments
    if (line.startsWith('#')) continue;

    // Handle msgid
    if (line.startsWith('msgid ')) {
      if (currentMsgid && currentEntry.msgid !== undefined) {
        // Save previous entry
        entries.push({
          msgid: currentEntry.msgid || '',
          msgstr: currentEntry.msgstr || '',
          references: currentEntry.references || [],
        });
      }
      
      currentEntry = {};
      currentMsgid = line.substring(6).trim();
      currentMsgid = currentMsgid.substring(1, currentMsgid.length - 1); // Remove quotes
      inMsgid = true;
      inMsgstr = false;
      continue;
    }

    // Handle msgstr
    if (line.startsWith('msgstr ')) {
      currentMsgstr = line.substring(7).trim();
      currentMsgstr = currentMsgstr.substring(1, currentMsgstr.length - 1); // Remove quotes
      currentEntry.msgid = currentMsgid;
      currentEntry.msgstr = currentMsgstr;
      inMsgid = false;
      inMsgstr = true;
      continue;
    }

    // Handle multiline strings
    if (line.startsWith('"') && line.endsWith('"')) {
      const content = line.substring(1, line.length - 1);
      if (inMsgid) {
        currentMsgid += content;
      } else if (inMsgstr) {
        currentMsgstr += content;
        currentEntry.msgstr = currentMsgstr;
      }
      continue;
    }
  }

  // Add the last entry
  if (currentMsgid && currentEntry.msgid !== undefined) {
    entries.push({
      msgid: currentEntry.msgid || '',
      msgstr: currentEntry.msgstr || '',
      references: currentEntry.references || [],
    });
  }

  // Filter and clean entries
  const filteredEntries = entries
    .map(entry => ({
      ...entry,
      msgid: cleanHtmlContent(entry.msgid)
    }))
    .filter(entry => !shouldSkipEntry(entry.msgid));

  return {
    entries: filteredEntries,
    format: 'po'
  };
}

// Parse JSON files
export function parseJsonFile(content: string): ParsedFile {
  try {
    const data = JSON.parse(content);
    const entries: PoEntry[] = [];

    // Handle different JSON structures
    if (Array.isArray(data)) {
      // Array of objects with key-value pairs
      data.forEach((item, index) => {
        if (typeof item === 'object' && item !== null) {
          Object.entries(item).forEach(([key, value]) => {
            if (typeof value === 'string') {
              entries.push({
                msgid: key,
                msgstr: '',
                references: [`array[${index}]`],
              });
            }
          });
        }
      });
    } else if (typeof data === 'object' && data !== null) {
      // Flat object with key-value pairs
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'string') {
          entries.push({
            msgid: value,
            msgstr: '',
            references: [key],
          });
        }
      });
    }

    return {
      entries,
      format: 'json',
      metadata: { originalStructure: typeof data }
    };
  } catch (error) {
    throw new Error('Invalid JSON file format');
  }
}

// Parse CSV files
export function parseCsvFile(content: string): ParsedFile {
  const lines = content.split('\n');
  const entries: PoEntry[] = [];

  // Skip header if present
  let startIndex = 0;
  if (lines.length > 0 && (lines[0].toLowerCase().includes('source') || lines[0].toLowerCase().includes('original'))) {
    startIndex = 1;
  }

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Simple CSV parsing (handles basic cases)
    const columns = line.split(',').map(col => col.trim().replace(/^"(.*)"$/, '$1'));
    
    if (columns.length >= 1 && columns[0]) {
      entries.push({
        msgid: columns[0],
        msgstr: columns.length > 1 ? columns[1] : '',
        references: [`line ${i + 1}`],
      });
    }
  }

  return {
    entries,
    format: 'csv'
  };
}

// Parse HTML files
export function parseHtmlFile(content: string): ParsedFile {
  const entries: PoEntry[] = [];
  
  // Extract text content from HTML tags
  const textRegex = />([^<]+)</g;
  let match;
  let index = 0;

  while ((match = textRegex.exec(content)) !== null) {
    const text = match[1].trim();
    if (text && text.length > 1 && !text.match(/^\s*$/)) {
      entries.push({
        msgid: text,
        msgstr: '',
        references: [`html-text-${index++}`],
      });
    }
  }

  // Extract alt attributes
  const altRegex = /alt\s*=\s*["']([^"']+)["']/gi;
  while ((match = altRegex.exec(content)) !== null) {
    const altText = match[1].trim();
    if (altText) {
      entries.push({
        msgid: altText,
        msgstr: '',
        references: [`alt-attribute-${index++}`],
      });
    }
  }

  // Extract title attributes
  const titleRegex = /title\s*=\s*["']([^"']+)["']/gi;
  while ((match = titleRegex.exec(content)) !== null) {
    const titleText = match[1].trim();
    if (titleText) {
      entries.push({
        msgid: titleText,
        msgstr: '',
        references: [`title-attribute-${index++}`],
      });
    }
  }

  // Filter and clean entries
  const filteredEntries = entries
    .map(entry => ({
      ...entry,
      msgid: cleanHtmlContent(entry.msgid)
    }))
    .filter(entry => !shouldSkipEntry(entry.msgid));

  return {
    entries: filteredEntries,
    format: 'html'
  };
}

// Parse .mo files (binary format - simplified)
export function parseMoFile(buffer: ArrayBuffer): ParsedFile {
  // This is a simplified parser for .mo files
  // In a real implementation, you'd need to properly parse the binary format
  throw new Error('.mo file parsing is not yet implemented. Please use .po files instead.');
}

// Main parser function
export function parseFile(file: File, content: string | ArrayBuffer): Promise<ParsedFile> {
  return new Promise((resolve, reject) => {
    try {
      const extension = file.name.toLowerCase().split('.').pop();
      
      switch (extension) {
        case 'po':
        case 'pot':
          if (typeof content !== 'string') {
            reject(new Error('Invalid file content for .po/.pot file'));
            return;
          }
          resolve(parsePoFile(content));
          break;
          
        case 'json':
          if (typeof content !== 'string') {
            reject(new Error('Invalid file content for JSON file'));
            return;
          }
          resolve(parseJsonFile(content));
          break;
          
        case 'csv':
          if (typeof content !== 'string') {
            reject(new Error('Invalid file content for CSV file'));
            return;
          }
          resolve(parseCsvFile(content));
          break;
          
        case 'html':
        case 'htm':
          if (typeof content !== 'string') {
            reject(new Error('Invalid file content for HTML file'));
            return;
          }
          resolve(parseHtmlFile(content));
          break;
          
        case 'mo':
          if (typeof content === 'string') {
            reject(new Error('Invalid file content for .mo file'));
            return;
          }
          resolve(parseMoFile(content));
          break;
          
        default:
          reject(new Error(`Unsupported file format: ${extension}`));
      }
    } catch (error) {
      reject(error);
    }
  });
}
