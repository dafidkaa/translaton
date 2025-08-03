// IndexNow API integration for instant search engine indexing
// https://www.indexnow.org/

const INDEXNOW_KEY = '43dda6a2b8604cf0957ba8c67884f6e8';
const SITE_URL = 'https://translaton.com';

interface IndexNowSubmission {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

/**
 * Submit URLs to IndexNow for instant indexing by search engines
 * @param urls Array of URLs to submit for indexing
 * @returns Promise<boolean> Success status
 */
export async function submitToIndexNow(urls: string[]): Promise<boolean> {
  try {
    const submission: IndexNowSubmission = {
      host: 'translaton.com',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls.map(url => url.startsWith('http') ? url : `${SITE_URL}${url}`)
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission)
    });

    if (response.ok) {
      console.log('✅ IndexNow submission successful:', urls);
      return true;
    } else {
      console.warn('⚠️ IndexNow submission failed:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('❌ IndexNow submission error:', error);
    return false;
  }
}

/**
 * Submit the main pages for indexing
 */
export async function submitMainPages(): Promise<boolean> {
  const mainPages = [
    '/',
    '/web-development',
    '/mobile-apps',
    '/json-translation',
    '/csv-translation'
  ];

  return await submitToIndexNow(mainPages);
}

/**
 * Submit a single page for indexing
 * @param url URL to submit
 */
export async function submitSinglePage(url: string): Promise<boolean> {
  return await submitToIndexNow([url]);
}
