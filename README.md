# 🚀 AspirePath

**AI-powered career roadmap generator for students and young professionals**

AspirePath is a mobile-first Progressive Web App (PWA) designed to help SHS students and ambitious youth in Ghana (and similar contexts) define life goals and receive personalized, actionable roadmaps using AI.

## 📋 Features

- **🎯 Personalized Goal Setting**: Define 1-3 main goals with detailed descriptions
- **🤖 AI-Powered Roadmaps**: GPT-4 generated step-by-step plans
- **📱 Mobile-First PWA**: Works offline with local storage
- **🎓 Education-Focused**: Tailored for students and young professionals
- **💰 Financial Awareness**: Considers budget constraints in recommendations
- **🌍 Local Context**: Ghana-specific resources and communities
- **📊 Progress Tracking**: Visual progress indicators and milestone completion

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **localForage** for offline storage
- **PWA** capabilities

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **OpenAI GPT-4** for AI roadmap generation
- **Supabase** for authentication and database
- **REST API** architecture

### Infrastructure
- **Supabase Auth** (email + password, future biometrics)
- **PostgreSQL** database via Supabase
- **Offline-first** with background sync
- **Mobile-responsive** design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key
- Supabase project (optional for full features)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install
cp env.example .env
# Edit .env with your API keys
npm run dev
```

The backend will be available at `http://localhost:3001`

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Supabase Configuration (optional for MVP)
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## 📱 PWA Features

- **Offline Support**: Works without internet connection
- **Install Prompt**: Can be installed on mobile devices
- **Background Sync**: Syncs data when connection is restored
- **Local Storage**: Caches roadmaps and user data

## 🎯 User Flow

1. **Onboarding**: User inputs current status (education, skills, financial level)
2. **Goal Setting**: User defines 1-3 main goals with timelines
3. **AI Generation**: Backend calls OpenAI to create personalized roadmap
4. **Dashboard**: User views and tracks progress through steps
5. **Progress Tracking**: Mark steps complete and view next milestones

## 🔧 Development

### Project Structure

```
aspirepath/
├── frontend/                 # React PWA
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── types/          # TypeScript types
│   │   └── hooks/          # Custom React hooks
│   ├── public/             # PWA assets
│   └── package.json
├── backend/                 # Express API
│   ├── src/
│   │   ├── routes/         # API routes
│   │   └── server.ts       # Main server file
│   └── package.json
└── docs/                   # Documentation
    └── PRD.md             # Product Requirements
```

### Available Scripts

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

**Backend:**
```bash
npm run dev          # Start development server with nodemon
npm run build        # Build TypeScript
npm start           # Start production server
```

## 🧪 Testing

The application includes placeholder logic for:
- ✅ Roadmap storage in Supabase
- ✅ Local/offline caching
- ✅ Auth and user profile creation
- ✅ AI integration with OpenAI

## 📊 API Endpoints

### Roadmap Generation
- `POST /api/generate-roadmap` - Generate AI-powered roadmap

### Authentication (Placeholder)
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### User Management (Placeholder)
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/roadmaps` - Get user roadmaps

## 🎨 Design System

The app uses a consistent design system with:
- **Primary Colors**: Blue (#0ea5e9) for main actions
- **Secondary Colors**: Purple (#d946ef) for accents
- **Typography**: Inter font family
- **Animations**: Framer Motion for smooth transitions
- **Mobile-First**: Responsive design optimized for mobile

## 🔮 Future Features

- **Biometric Login**: Fingerprint/FaceID support
- **Voice Input**: For low-literacy users
- **Mentorship Matching**: Connect with local mentors
- **Scholarship Notifications**: Ghana/WA specific opportunities
- **Peer Groups**: Goal-tracking communities
- **AI Chat Support**: Interactive mentor bot

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or support, please refer to the PRD document in `docs/PRD.md` for detailed product requirements and context.

---

**Built with ❤️ for empowering students and young professionals in Ghana and beyond.** 