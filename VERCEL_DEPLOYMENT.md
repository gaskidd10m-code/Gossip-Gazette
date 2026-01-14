# Vercel Deployment Guide

## Environment Variables

After deploying to Vercel, you MUST add the following environment variable in your Vercel project settings:

### Required Environment Variable:

**Name:** `DATABASE_URL`

**Value:** 
```
postgresql://neondb_owner:npg_WJ1ZTf9CjBgz@ep-sparkling-band-a4xf8pjv-pooler.us-east-1.aws.neon.tech/Gossip.Gazette?sslmode=require&channel_binding=require
```

### How to Add Environment Variables in Vercel:

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project (Gossip-Gazette)
3. Go to **Settings** → **Environment Variables**
4. Add the variable:
   - **Key:** `DATABASE_URL`
   - **Value:** (paste the connection string above)
   - **Environment:** Select all (Production, Preview, Development)
5. Click **Save**
6. **Redeploy** your project for the changes to take effect

## Deployment Steps

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Configure Vercel deployment with serverless API"
   git push
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository: `gaskidd10m-code/Gossip-Gazette`
   - Vercel will auto-detect the settings from `vercel.json`
   - Add the `DATABASE_URL` environment variable (see above)
   - Click "Deploy"

3. **Verify Deployment:**
   - Once deployed, visit your Vercel URL
   - Check that articles load on the homepage
   - Test category pages and search functionality

## Important Notes

- The `api/` directory contains your serverless backend functions
- The `dist/` directory (created during build) contains your frontend static files
- Vercel automatically routes `/api/*` requests to your serverless functions
- The old `server/` directory is no longer used in production (kept for local development)
