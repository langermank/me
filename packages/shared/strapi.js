// Default to production Strapi URL
const strapiUrl = import.meta.env.STRAPI_URL || 'https://fruitful-harmony-26f2f31d62.strapiapp.com';

// Fallback fetch function for Node.js environments
async function safeFetch(url, options = {}) {
  try {
    // Try standard fetch first
    return await fetch(url, options);
  } catch (error) {
    if (error.cause?.code === 'ECONNREFUSED' && typeof process !== 'undefined') {
      // In Node.js environment, try with node-fetch as fallback
      console.log('🔄 Fetch failed, trying alternative approach...');
      const https = await import('https');
      const http = await import('http');
      
      return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const client = urlObj.protocol === 'https:' ? https : http;
        
        const req = client.request(url, {
          method: options.method || 'GET',
          headers: options.headers || {},
          timeout: 10000
        }, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            resolve({
              ok: res.statusCode >= 200 && res.statusCode < 300,
              status: res.statusCode,
              json: () => Promise.resolve(JSON.parse(data)),
              text: () => Promise.resolve(data)
            });
          });
        });
        
        req.on('error', reject);
        req.on('timeout', () => reject(new Error('Request timeout')));
        req.end();
      });
    }
    throw error;
  }
}

async function fetchFromStrapi(endpoint) {
  try {
    // Add timeout and additional options for Node.js fetch
    const response = await safeFetch(`${strapiUrl}/api/${endpoint}?populate=*`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      // Add timeout for Node.js
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API Error: ${response.status} - ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Process the data to fix image URLs
    const processedData = (result.data || []).map(item => {
      if (item.thumbnail && item.thumbnail.url) {
        // If thumbnail URL doesn't start with http, prepend Strapi URL
        if (!item.thumbnail.url.startsWith('http')) {
          item.thumbnail.url = `${strapiUrl}${item.thumbnail.url}`;
        }
      }
      if (item.darkThumbnail && item.darkThumbnail.url) {
        if (!item.darkThumbnail.url.startsWith('http')) {
          item.darkThumbnail.url = `${strapiUrl}${item.darkThumbnail.url}`;
        }
      }
      return item;
    });
    
    return processedData;
  } catch (error) {
    console.error(`❌ Error fetching ${endpoint}:`, error.message);
    console.error(`🌐 Strapi URL: ${strapiUrl}`);
    
    // Try to provide more helpful error info
    if (error.cause?.code === 'ECONNREFUSED') {
      console.error('🚫 Connection refused - check if Strapi URL is correct and accessible');
    }
    if (error.name === 'AbortError') {
      console.error('⏱️  Request timed out - Strapi Cloud might be slow');
    }
    
    return [];
  }
}

export async function fetchCaseStudies() {
  return fetchFromStrapi('case-studies');
}

export async function fetchDiyPosts() {
  return fetchFromStrapi('diy-posts');
}

export async function fetchPostTypes() {
  return fetchFromStrapi('post-types');
}

// Legacy alias for backward compatibility
export async function fetchPosts() {
  return fetchCaseStudies();
}