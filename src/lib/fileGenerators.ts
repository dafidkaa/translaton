import { PoEntry } from "../components/TranslatorApp";

export type ExportFormat = 'po' | 'pot' | 'json' | 'csv' | 'html';

// Generate .po/.pot file content
export function generatePoFile(entries: PoEntry[], originalFileName: string, isPot: boolean = false): string {
  let content = '';
  
  // Add header
  content += '# Translation file\n';
  content += `# Generated from ${originalFileName}\n`;
  content += `# Date: ${new Date().toISOString()}\n`;
  content += '\n';
  
  // Add metadata entry
  content += 'msgid ""\n';
  content += 'msgstr ""\n';
  content += '"Content-Type: text/plain; charset=UTF-8\\n"\n';
  content += '"Language: \\n"\n';
  content += '"MIME-Version: 1.0\\n"\n';
  content += '"Content-Transfer-Encoding: 8bit\\n"\n';
  content += '\n';

  // Add entries
  entries.forEach(entry => {
    if (entry.msgid.trim() === '') return;

    // Add references if available
    if (entry.references && entry.references.length > 0) {
      entry.references.forEach(ref => {
        content += `#: ${ref}\n`;
      });
    }

    // Add msgid
    content += `msgid "${escapePoString(entry.msgid)}"\n`;
    
    // Add msgstr (empty for .pot files)
    if (isPot) {
      content += 'msgstr ""\n';
    } else {
      content += `msgstr "${escapePoString(entry.msgstr || '')}"\n`;
    }
    
    content += '\n';
  });

  return content;
}

// Generate JSON file content
export function generateJsonFile(entries: PoEntry[], format: 'flat' | 'nested' = 'flat'): string {
  const data: Record<string, string> = {};

  entries.forEach(entry => {
    if (entry.msgid.trim() === '') return;
    
    if (format === 'flat') {
      data[entry.msgid] = entry.msgstr || entry.msgid;
    } else {
      // For nested format, use references as keys if available
      const key = entry.references && entry.references.length > 0 
        ? entry.references[0] 
        : entry.msgid;
      data[key] = entry.msgstr || entry.msgid;
    }
  });

  return JSON.stringify(data, null, 2);
}

// Generate CSV file content
export function generateCsvFile(entries: PoEntry[]): string {
  let content = 'Source,Translation,Reference\n';

  entries.forEach(entry => {
    if (entry.msgid.trim() === '') return;

    const source = escapeCsvField(entry.msgid);
    const translation = escapeCsvField(entry.msgstr || '');
    const reference = escapeCsvField(
      entry.references && entry.references.length > 0 
        ? entry.references[0] 
        : ''
    );

    content += `${source},${translation},${reference}\n`;
  });

  return content;
}

// Generate HTML file content
export function generateHtmlFile(entries: PoEntry[], originalFileName: string): string {
  let content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Translation Export - ${originalFileName}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .translation-entry { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .source { font-weight: bold; color: #333; margin-bottom: 5px; }
        .translation { color: #666; margin-bottom: 5px; }
        .reference { font-size: 0.8em; color: #999; }
        .empty-translation { color: #ff6b6b; font-style: italic; }
    </style>
</head>
<body>
    <h1>Translation Export</h1>
    <p>Generated from: ${originalFileName}</p>
    <p>Date: ${new Date().toLocaleString()}</p>
    <hr>
`;

  entries.forEach((entry, index) => {
    if (entry.msgid.trim() === '') return;

    content += `    <div class="translation-entry">
        <div class="source">Source: ${escapeHtml(entry.msgid)}</div>
        <div class="translation ${!entry.msgstr ? 'empty-translation' : ''}">
            Translation: ${entry.msgstr ? escapeHtml(entry.msgstr) : '[Not translated]'}
        </div>`;

    if (entry.references && entry.references.length > 0) {
      content += `        <div class="reference">Reference: ${escapeHtml(entry.references[0])}</div>`;
    }

    content += `    </div>
`;
  });

  content += `</body>
</html>`;

  return content;
}

// Helper function to escape strings for .po files
function escapePoString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\t/g, '\\t')
    .replace(/\r/g, '\\r');
}

// Helper function to escape CSV fields
function escapeCsvField(str: string): string {
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Helper function to escape HTML
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Main export function
export function generateFile(
  entries: PoEntry[], 
  format: ExportFormat, 
  originalFileName: string
): { content: string; filename: string; mimeType: string } {
  const baseName = originalFileName.replace(/\.[^/.]+$/, '');
  
  switch (format) {
    case 'po':
      return {
        content: generatePoFile(entries, originalFileName, false),
        filename: `${baseName}_translated.po`,
        mimeType: 'text/plain'
      };
      
    case 'pot':
      return {
        content: generatePoFile(entries, originalFileName, true),
        filename: `${baseName}_template.pot`,
        mimeType: 'text/plain'
      };
      
    case 'json':
      return {
        content: generateJsonFile(entries),
        filename: `${baseName}_translated.json`,
        mimeType: 'application/json'
      };
      
    case 'csv':
      return {
        content: generateCsvFile(entries),
        filename: `${baseName}_translated.csv`,
        mimeType: 'text/csv'
      };
      
    case 'html':
      return {
        content: generateHtmlFile(entries, originalFileName),
        filename: `${baseName}_translated.html`,
        mimeType: 'text/html'
      };
      
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
}

// Create download URL for a file
export function createDownloadUrl(content: string, mimeType: string): string {
  const blob = new Blob([content], { type: mimeType });
  return URL.createObjectURL(blob);
}

// Download a file
export function downloadFile(content: string, filename: string, mimeType: string): void {
  const url = createDownloadUrl(content, mimeType);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
