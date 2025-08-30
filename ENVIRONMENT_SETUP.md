# Environment Setup Guide

**Current Setup:** Local development always uses production Strapi Cloud for content.

## Current Configuration

**Main Site:** Can switch between local and production Strapi (currently uses production)
- **Local Development:** `https://fruitful-harmony-26f2f31d62.strapiapp.com` 
- **Production:** `https://fruitful-harmony-26f2f31d62.strapiapp.com`

**DIY Site:** Always uses production Strapi (simplified setup)
- **Local Development:** `https://fruitful-harmony-26f2f31d62.strapiapp.com`
- **Production:** `https://fruitful-harmony-26f2f31d62.strapiapp.com`

## Available Commands (for future use if needed)

Switch main site to local Strapi:
```bash
npm run env:local
```

Switch main site to production Strapi:
```bash
npm run env:production
```

Check current environment:
```bash
npm run env:status
```

## Individual Site Commands

Switch only main site:
```bash
npm run env:main:local        # Local Strapi
npm run env:main:production   # Production Strapi
```

Switch only DIY site:
```bash
npm run env:diy:local         # Local Strapi
npm run env:diy:production    # Production Strapi
```

## Setup

1. **Update your production URLs:**
   - Edit `sites/main-site/.env.production`
   - Edit `sites/diy-site/.env.production` 
   - Replace `https://your-strapi-cloud-url.com` with your actual Strapi Cloud URL

2. **Default to local environment:**
   ```bash
   npm run env:local
   ```

## Workflow

### For Development & Schema Changes:
```bash
npm run env:local        # Use local Strapi
cd packages/cms && npm run dev  # Start local Strapi
npm run dev             # Start main site
```

### For Testing with Production Content:
```bash
npm run env:production   # Switch to production Strapi
npm run dev             # Start site with production content
```

### For Production Deployment:
- Your deployed site should have `STRAPI_URL` pointing to your Strapi Cloud URL
- Environment switching only affects local development

## Files Created

- `.env.local` - Local Strapi configuration
- `.env.production` - Production Strapi configuration  
- `switch-env.js` - Environment switching script

The active `.env` file is created by copying from `.env.local` or `.env.production`.