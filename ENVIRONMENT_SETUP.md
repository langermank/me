# Environment Setup Guide

**Current Setup:** Both sites always use production Strapi Cloud for content.

## Current Configuration

**Both Main Site & DIY Site:** Always use production Strapi (simplified setup)
- **Local Development:** `https://fruitful-harmony-26f2f31d62.strapiapp.com`
- **Production:** `https://fruitful-harmony-26f2f31d62.strapiapp.com`

## Development Workflow

```bash
# Start main site (always uses production Strapi content)
npm run dev:main

# Start DIY site (always uses production Strapi content)  
npm run dev:diy

# Add/edit content in Strapi Cloud admin
# Restart dev server to see new content
```

## Benefits

- ✅ **Simplified** - No environment switching needed
- ✅ **Consistent** - Both sites use the same content source
- ✅ **Fast** - No local Strapi setup required
- ✅ **Real content** - Always see your actual production content while developing

## For Strapi Development

If you need to work on Strapi schema changes:

```bash
# Start local Strapi for schema development
cd packages/cms && npm run dev

# Temporarily change STRAPI_URL in .env files to http://localhost:1337
# Make your schema changes
# Deploy schema changes to production
# Change STRAPI_URL back to production
```

## Files

- `sites/main-site/.env` - Production Strapi configuration
- `sites/diy-site/.env` - Production Strapi configuration
- `.env.example` - Template for new setups