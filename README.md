# Carbon Calculator App 🌱

A comprehensive carbon footprint tracking application built with Next.js, featuring AI-powered recommendations and social media sharing capabilities.

## Features

### 🧮 Carbon Footprint Calculator
- Track daily activities across 4 categories:
  - **Transportation**: Car, public transport, flights, walking, cycling
  - **Energy**: Electricity, heating, cooling consumption
  - **Food**: Meat, dairy, vegetables, processed food servings
  - **Waste**: Recycling, landfill, composting weights

### 📊 Data Visualization
- Interactive charts showing carbon footprint breakdown
- Historical trend analysis with Chart.js
- Daily, weekly, and monthly tracking

### 🤖 AI-Powered Recommendations
- Personalized suggestions using Google Gemini AI
- Impact-based recommendations (easy/medium/hard difficulty)
- Estimated CO2 reduction potential for each suggestion

### ✅ Action Plan & Todos
- Convert AI recommendations into actionable todos
- Priority-based task management
- Progress tracking with completion dates
- Category-based organization

### 📱 Social Media Sharing
- Generate beautiful share images with Canvas API
- Direct sharing to Twitter/X and Instagram
- Downloadable infographics
- Copy-to-clipboard functionality

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **AI**: Google Gemini API
- **Charts**: Chart.js with react-chartjs-2
- **Image Generation**: HTML5 Canvas API
- **Icons**: Lucide React
- **Deployment**: Railway

## Environment Variables

Create a `.env.local` file with:

```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

## Installation & Setup

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
- Copy `.env.local` and add your credentials
- MongoDB Atlas connection string
- Google Gemini API key

3. **Run development server:**
```bash
npm run dev
```

4. **Build for production:**
```bash
npm run build
npm start
```

## Deployment on Railway

1. Connect your GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Deploy automatically on push to main branch

## Carbon Calculation Methodology

The app uses scientifically-backed emission factors:

- **Transportation**: Based on fuel consumption and distance
- **Energy**: Grid electricity factors and heating/cooling efficiency
- **Food**: Lifecycle emissions per serving size
- **Waste**: Landfill methane vs recycling benefits

## API Endpoints

- `POST /api/carbon` - Calculate and store carbon footprint
- `GET /api/carbon` - Retrieve historical data
- `POST /api/recommendations` - Get AI recommendations
- `GET/POST/PUT /api/todos` - Manage action items
- `POST /api/share` - Generate share images

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open a GitHub issue or contact the development team.

---

**Start tracking your carbon footprint today and make a positive impact on our planet! 🌍**