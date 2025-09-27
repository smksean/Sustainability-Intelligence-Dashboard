# Nexus - Sustainability Intelligence Platform

A comprehensive sustainability intelligence platform designed for electricity and heat generation companies to track, analyze, and report on their sustainability metrics for regulatory compliance and net-zero targets.

## 🎯 Overview

Nexus addresses the critical need for real-time sustainability reporting in the energy sector, helping companies:
- Meet EU ETS, CSRD/ESRS, and US IRA compliance requirements
- Reduce manual reporting by 70%
- Gain investor confidence through standardized data
- Accelerate decarbonization with real-time visibility

## 🏗️ Architecture

### Frontend (Next.js 15)
- Real-time dashboard with live data updates
- Interactive charts for CO₂ intensity and generation mix
- KPI cards and goal tracking
- Responsive design with Tailwind CSS

### Backend (Node.js/TypeScript)
- Express.js API with Swagger documentation
- Supabase integration for real-time data
- RESTful endpoints for data access
- Security features (CORS, Helmet, rate limiting)

### Data Simulation (Python)
- Sophisticated simulation engine for realistic energy data
- Weather variation modeling for renewable availability
- Diurnal demand patterns and price shock simulations
- Multiple output formats (CSV, Supabase)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- Supabase account (for production)

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd nexus-sustainability-intelligence
npm install
cd backend && npm install
```

2. **Set up environment variables:**
```bash
# Copy example files
cp .env.example .env.local
cp backend/.env.example backend/.env
```

3. **Start the development servers:**
```bash
# Start both frontend and backend
npm run dev:all

# Or start individually
npm run dev          # Frontend only
npm run dev:backend  # Backend only
```

4. **Run data simulation:**
```bash
# One-time simulation
npm run simulate

# Continuous simulation
npm run simulate:continuous
```

## 📊 Key Metrics

- **CO₂ Intensity** (g/kWh) - Carbon emissions per unit electricity
- **Generation Mix** (MW) - Power output by source
- **Renewable Share** (%) - Clean energy percentage
- **Net-Zero Alignment** (%) - Progress toward 2050 targets
- **Real-time Alignment Index** - Current vs target performance
- **YTD Carbon Budget** - Year-to-date emissions tracking

## 📁 Project Structure

```
├── app/                    # Next.js frontend application
├── backend/               # Node.js/TypeScript API server
├── components/            # Shared React components
├── lib/                   # Utility functions and data fetching
├── simulator/             # Python data simulation engine
├── analysis/              # Data analysis Python modules
├── data/                  # CSV data files
├── supabase/              # Database schema and migrations
├── documentation/         # Project documentation
└── public/                # Static assets
```

## 🛠️ Available Scripts

- `npm run dev` - Start frontend development server
- `npm run dev:backend` - Start backend development server
- `npm run dev:all` - Start both frontend and backend
- `npm run build` - Build frontend for production
- `npm run build:all` - Build both frontend and backend
- `npm run simulate` - Run data simulation once
- `npm run simulate:continuous` - Run continuous data simulation

## 📚 Documentation

- [Business Case](BUSINESS_CASE.md) - Executive summary and market analysis
- [Metrics Reference](METRICS.md) - Detailed explanation of tracked metrics
- [Documentation](documentation/) - Additional project documentation

## 🌐 Deployment

The application is configured for deployment on Vercel with automatic builds and deployments.

## 📄 License

MIT License - see LICENSE file for details.
