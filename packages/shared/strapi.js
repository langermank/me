const strapiUrl = import.meta.env.STRAPI_URL || 'http://localhost:1337';

async function fetchFromStrapi(endpoint) {
  try {
    const response = await fetch(`${strapiUrl}/api/${endpoint}?populate=*`);
    
    if (!response.ok) {
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
      return item;
    });
    
    return processedData;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
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