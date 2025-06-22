# 🚀 AspirePath Deployment Guide

## 📋 Overview

This guide will help you deploy AspirePath to production. The project consists of a React frontend and Node.js backend that can be deployed separately.

## 🌐 Frontend Deployment (Vercel/Netlify)

### Option 1: Vercel (Recommended)

1. **Connect to GitHub**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import the `aspirepath` repository

2. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Environment Variables**
   ```
   VITE_API_BASE_URL=https://your-backend-url.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

### Option 2: Netlify

1. **Connect to GitHub**
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "New site from Git"
   - Choose the `aspirepath` repository

2. **Configure Build Settings**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

3. **Environment Variables**
   - Go to Site settings > Environment variables
   - Add: `VITE_API_BASE_URL=https://your-backend-url.com`

## 🔧 Backend Deployment (Railway/Render)

### Option 1: Railway (Recommended)

1. **Connect to GitHub**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select the `aspirepath` repository

2. **Configure Service**
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

3. **Environment Variables**
   ```
   PORT=3001
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.com
   OPENAI_API_KEY=your_openai_api_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Deploy**
   - Railway will automatically deploy when you push to main

### Option 2: Render

1. **Create New Web Service**
   - Go to [render.com](https://render.com)
   - Sign in with GitHub
   - Click "New Web Service"
   - Connect the `aspirepath` repository

2. **Configure Service**
   - **Name**: `aspirepath-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

3. **Environment Variables**
   - Add all the environment variables listed above

## 🗄️ Database Setup (Supabase)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and API keys

2. **Database Schema**
   ```sql
   -- Users table
   CREATE TABLE users (
     id UUID REFERENCES auth.users(id) PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     education_level TEXT,
     financial_status TEXT,
     skills TEXT[],
     location TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Roadmaps table
   CREATE TABLE roadmaps (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES users(id) ON DELETE CASCADE,
     goals JSONB NOT NULL,
     steps JSONB NOT NULL,
     progress INTEGER DEFAULT 0,
     estimated_completion_date TIMESTAMP WITH TIME ZONE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;

   -- Create policies
   CREATE POLICY "Users can view own profile" ON users
     FOR SELECT USING (auth.uid() = id);

   CREATE POLICY "Users can update own profile" ON users
     FOR UPDATE USING (auth.uid() = id);

   CREATE POLICY "Users can view own roadmaps" ON roadmaps
     FOR SELECT USING (auth.uid() = user_id);

   CREATE POLICY "Users can insert own roadmaps" ON roadmaps
     FOR INSERT WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Users can update own roadmaps" ON roadmaps
     FOR UPDATE USING (auth.uid() = user_id);
   ```

## 🔑 Environment Variables Setup

### Frontend (.env)
```env
VITE_API_BASE_URL=https://your-backend-url.com
```

### Backend (.env)
```env
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.com
OPENAI_API_KEY=your_openai_api_key_here
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret_here
```

## 🚀 Production Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend deployed and API endpoints working
- [ ] Database connected and schema created
- [ ] Environment variables configured
- [ ] OpenAI API key added
- [ ] CORS configured for production domains
- [ ] SSL certificates enabled
- [ ] Domain configured (optional)
- [ ] Monitoring and logging set up
- [ ] Error tracking configured

## 📱 PWA Configuration

The app is already configured as a PWA with:
- Service worker for offline functionality
- Web app manifest for installation
- Responsive design for mobile devices

## 🔍 Testing Deployment

1. **Frontend Test**
   - Visit your frontend URL
   - Complete the onboarding flow
   - Test offline functionality

2. **Backend Test**
   - Test the health endpoint: `GET /health`
   - Test roadmap generation: `POST /api/generate-roadmap`
   - Verify CORS is working

3. **Integration Test**
   - Complete full user journey
   - Test data persistence
   - Verify offline sync

## 🛠️ Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `FRONTEND_URL` is set correctly in backend
   - Check that the frontend URL is in the CORS allowed origins

2. **Build Failures**
   - Verify all dependencies are installed
   - Check TypeScript compilation errors
   - Ensure environment variables are set

3. **API Errors**
   - Verify OpenAI API key is valid
   - Check Supabase connection
   - Review server logs for errors

### Support

For deployment issues, check:
- Platform-specific documentation
- Application logs
- Network connectivity
- Environment variable configuration

---

**🎉 Your AspirePath app is now ready for production!** 