# Strapi CMS Integration Context

## Project Status
Successfully integrated Strapi v5 CMS with Astro blog. Fixed initial "Cannot read properties of null (reading 'map')" error and configured proper data fetching.

## Current Setup
- **Strapi CMS**: Running on `http://localhost:1337`
- **Main site**: `/sites/main-site/` (Astro)
- **CMS location**: `/packages/cms/` (Strapi v5)

## What We've Done

### 1. Fixed Initial Integration Issues
- Fixed API endpoint: Changed `/api/posts` → `/api/case-studies`
- Fixed data structure: Strapi v5 returns data directly, not wrapped in `attributes`
- Added error handling and 403 permissions fix
- Environment: `STRAPI_URL=http://localhost:1337` in `/sites/main-site/.env`

### 2. Updated Strapi Schema
**File**: `/packages/cms/src/api/case-study/content-types/case-study/schema.json`

Updated to match existing MDX frontmatter structure:
```json
{
  "attributes": {
    "title": { "type": "string", "required": true },
    "date": { "type": "date", "required": true },
    "thumbnail": { "type": "string" },
    "description": { "type": "text", "required": true },
    "hasMore": { "type": "boolean", "default": false },
    "type": { "type": "relation", "relation": "manyToOne", "target": "api::post-type.post-type", "required": true },
    "externalUrl": { "type": "string" },
    "hasDarkImage": { "type": "boolean", "default": false },
    "content": { "type": "richtext" }
  }
}
```

### 3. Created Post Type Content Type
**Files created**:
- `/packages/cms/src/api/post-type/content-types/post-type/schema.json`
- `/packages/cms/src/api/post-type/controllers/post-type.ts`
- `/packages/cms/src/api/post-type/routes/post-type.ts`
- `/packages/cms/src/api/post-type/services/post-type.ts`

**Post types to add in Strapi admin**:
1. `component-api` → Component API
2. `design-tokens` → Design Tokens  
3. `visual-polish` → Visual Polish
4. `talk` → Talk
5. `article` → Article

### 4. API Integration
**File**: `/sites/main-site/src/lib/strapi.js`
```javascript
export async function fetchPosts() {
  try {
    const response = await fetch(`${strapiUrl}/api/case-studies?populate=*`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}
```

## Next Steps (When Resuming)
1. **Complete Post Types Setup in Strapi Admin**:
   - Go to `http://localhost:1337/admin`
   - Set permissions: Settings → Roles → Public → Post-type (check find & findOne)
   - Add the 5 post types in Content Manager → Post Type
   
2. **Test the Integration**:
   - Create test case studies with the new schema
   - Verify data displays correctly on CV page
   
3. **Consider Future Enhancements**:
   - Create proper case study listing page
   - Add image upload handling for thumbnails
   - Implement rich content rendering

## Key Files Modified
- `/sites/main-site/src/lib/strapi.js` - API fetching logic
- `/sites/main-site/src/pages/cv.astro` - Test page (user removed Strapi integration)
- `/packages/cms/src/api/case-study/content-types/case-study/schema.json` - Updated schema
- New post-type content type files

## Commands to Remember
- Start Strapi: `cd packages/cms && npm run dev`
- Start Astro: `cd sites/main-site && npm run dev`
- Strapi admin: `http://localhost:1337/admin`