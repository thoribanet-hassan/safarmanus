# Safar - سَفَر

<div align="center">

![Safar Logo](https://img.shields.io/badge/سَفَر-Travel_Assistant-brightgreen?style=for-the-badge)
[![React](https://img.shields.io/badge/React-18.2-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple?style=flat-square&logo=vite)](https://vitejs.dev/)

**مساعدك الذكي للسفر في المملكة العربية السعودية**

</div>

---

## 🌟 Features

- 🤖 **AI-Powered Travel Assistant** - Chat with Safar Brain for personalized travel recommendations
- ✈️ **Flight Search** - Search flights using multiple providers (Amadeus, Skyscanner, Duffel)
- 💰 **Price Monitoring** - Track flight prices and get alerts
- 🌐 **Arabic & English Support** - Automatic language detection and response
- 🎨 **Premium UI** - Dark mode with glassmorphism effects
- 🔒 **100% Secure** - All API keys stored in environment variables only

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
cd /Users/Hassan/Downloads/safar3
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure API Keys:**

Copy `.env.example` to `.env` and add your API keys:

```bash
cp .env.example .env
```

Edit `.env` and add your keys (NEVER commit this file):

```.env
# Flight APIs
VITE_AMADEUS_API_KEY=your_actual_amadeus_key
VITE_AMADEUS_API_SECRET=your_actual_amadeus_secret
VITE_SKYSCANNER_API_KEY=your_actual_skyscanner_key

# AI APIs
VITE_OPENAI_API_KEY=your_actual_openai_key
VITE_GEMINI_API_KEY=your_actual_gemini_key
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open your browser:**
Navigate to `http://localhost:5173`

---

## 🔐 API Security Guidelines

**CRITICAL**: Safar follows strict API security rules:

### ✅ DO:
- ✓ Store ALL API keys in `.env` file
- ✓ Use `import.meta.env.VITE_*` to access keys
- ✓ Add `.env` to `.gitignore`
- ✓ Use `.env.example` as a template (without real keys)

### ❌ DON'T:
- ✗ NEVER hardcode API keys in source code
- ✗ NEVER use dummy keys like "123" or "test"
- ✗ NEVER commit `.env` file to git
- ✗ NEVER expose keys in console logs
- ✗ NEVER share keys in screenshots or documentation

---

## 🏗️ Architecture

```
safar3/
├── src/
│   ├── components/        # React components
│   │   ├── Header.tsx     # Navigation header
│   │   └── ChatInterface.tsx  # AI chat interface
│   ├── services/          # API services
│   │   ├── aiService.ts   # AI providers (OpenAI, Gemini)
│   │   └── flightService.ts  # Flight search providers
│   ├── config/            # Configuration
│   │   └── api.ts         # Secure API key management
│   ├── App.tsx            # Main application
│   └── main.tsx           # Entry point
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore (includes .env)
└── package.json           # Dependencies
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: CSS Custom Properties + Glassmorphism
- **Icons**: Lucide React
- **Fonts**: Cairo & Tajawal (Arabic support)

### API Integrations

- **Flight Search**: Amadeus, Skyscanner, Duffel
- **AI Chat**: OpenAI GPT-4, Google Gemini
- **Hotel Search**: Amadeus Hotels API

---

## 📖 Usage

### Chat with Safar Brain

```typescript
// Example: Search for flights
"ابحث عن رحلات من الرياض إلى جدة"

// Example: Get travel advice
"ما هي أفضل الأوقات للسفر إلى دبي؟"

// Example: Monitor prices
"راقب سعر رحلة من جدة إلى القاهرة"
```

### Using Flight Service

```typescript
import { searchFlights } from './services/flightService';

const results = await searchFlights({
  origin: 'RUH',
  destination: 'JED',
  departureDate: '2024-12-01',
  adults: 1,
  cabinClass: 'ECONOMY'
});
```

---

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🌍 Environment Variables

All API keys must be prefixed with `VITE_` to be accessible in the frontend:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_AMADEUS_API_KEY` | Amadeus API key | ✓ |
| `VITE_AMADEUS_API_SECRET` | Amadeus API secret | ✓ |
| `VITE_OPENAI_API_KEY` | OpenAI API key | ✓ |
| `VITE_GEMINI_API_KEY` | Google Gemini API key | Optional |
| `VITE_SKYSCANNER_API_KEY` | Skyscanner API key | Optional |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Note**: Never commit `.env` files or API keys!

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **Amadeus** - Flight and hotel data
- **OpenAI** - AI chat capabilities
- **Google Gemini** - Alternative AI provider
- **Lucide** - Beautiful icons

---

## 📧 Support

For questions or support, please open an issue on GitHub.

---

<div align="center">

**Made with ❤️ for Saudi travelers**

سَفَر - رفيقك في كل رحلة

</div>
