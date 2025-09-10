# Carbon Calculator App 🌱

A comprehensive carbon footprint tracking application built with Next.js, featuring AI-powered recommendations and social media sharing capabilities.

## 🚀 Live Demo

Visit the live application: [https://your-app-name.vercel.app](https://your-app-name.vercel.app)

## Features

### 🧮 Carbon Footprint Calculator
- Track daily activities across 4 categories:
  - **Transportation**: Car, public transport, flights, walking, cycling
  - **Energy**: Electricity, heating, cooling consumption
  - **Food**: Meat, dairy, vegetables, processed food servings
  - **Waste**: Recycling, landfill, composting weights

### 📊 Data Visualization & Analytics
- Interactive charts showing carbon footprint breakdown
- Historical trend analysis with Chart.js
- Daily, weekly, and monthly tracking
- Air quality impact analysis
- Professional report generation (PDF/CSV)

### 🤖 AI-Powered Recommendations
- Personalized suggestions using Google Gemini AI
- Impact-based recommendations (easy/medium/hard difficulty)
- Estimated CO2 reduction potential for each suggestion

### ✅ Action Plan & Todos
- Convert AI recommendations into actionable todos
- Priority-based task management
- Progress tracking with completion dates
- Category-based organization

### 👤 User Profiles & Gamification
- Comprehensive user profiles with roles
- Eco points and achievement system
- Badge collection and challenges
- Social sharing capabilities

### 📱 Social Media Integration
- Generate beautiful share images with Canvas API
- Direct sharing to Twitter/X and Instagram
- Downloadable infographics
- Profile sharing and app invitations

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **AI**: Google Gemini API
- **Charts**: Chart.js with react-chartjs-2
- **Authentication**: NextAuth.js
- **Image Generation**: HTML5 Canvas API, jsPDF
- **Icons**: Lucide React
- **Deployment**: Vercel

## Environment Variables

Create a `.env.local` file with:

```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://your-app-name.vercel.app
```

## Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/carbcalc.git
cd carbcalc
``` 

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
- Copy `.env.example` to `.env.local`
- Add your MongoDB Atlas connection string
- Add your Google Gemini API key
- Generate a secure NextAuth secret

4. **Run development server:**
```bash
npm run dev
```

5. **Build for production:**
```bash
npm run build
npm start
```

## Deployment on Vercel

### Quick Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/carbcalc)

### Manual Deployment

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel --prod
```

4. **Set Environment Variables in Vercel Dashboard:**
- Go to your project settings
- Add all environment variables from `.env.example`
- Redeploy if needed

## API Endpoints

- `POST /api/carbon` - Calculate and store carbon footprint
- `GET /api/carbon` - Retrieve historical data
- `POST /api/recommendations` - Get AI recommendations
- `GET/POST/PUT /api/todos` - Manage action items
- `GET/PUT /api/profile` - User profile management
- `GET /api/air-quality` - Air quality data
- `POST /api/share` - Generate share images

## Carbon Calculation Methodology

The app uses scientifically-backed emission factors:

- **Transportation**: Based on fuel consumption and distance
- **Energy**: Grid electricity factors and heating/cooling efficiency
- **Food**: Lifecycle emissions per serving size
- **Waste**: Landfill methane vs recycling benefits

## Features Overview

### Dashboard
- Multi-tab interface with calculator, results, air quality, challenges
- Real-time data visualization
- Responsive design for all devices

### Profile System
- Role-based access (User, Premium, Government, Admin)
- Achievement tracking and badge system
- Social sharing capabilities
- Comprehensive statistics

### Air Quality Integration
- Real-time air quality monitoring
- Impact analysis based on carbon footprint
- Health recommendations
- Pollutant level tracking

### Report Generation
- Professional PDF reports
- CSV data export
- Email sharing functionality
- Comprehensive analytics

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions:
- Open a GitHub issue
- Contact: hello@carbcalc.com
- Documentation: [Wiki](https://github.com/yourusername/carbcalc/wiki)

## Acknowledgments

- Google Gemini AI for intelligent recommendations
- Chart.js for beautiful data visualization
- MongoDB Atlas for reliable data storage
- Vercel for seamless deployment

---

**Start tracking your carbon footprint today and make a positive impact on our planet! 🌍**

Made with 💚 for a sustainable future.