import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/safar',
  jwtSecret: process.env.JWT_SECRET || 'default_secret_change_me',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  
  // API Keys
  amadeus: {
    apiKey: process.env.AMADEUS_API_KEY || '',
    apiSecret: process.env.AMADEUS_API_SECRET || '',
  },
  skyscanner: {
    apiKey: process.env.SKYSCANNER_API_KEY || '',
  },
  duffel: {
    apiKey: process.env.DUFFEL_API_KEY || '',
  },
  deepseek: {
    apiKey: process.env.DEEPSEEK_API_KEY || '',
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
  },
  claude: {
    apiKey: process.env.CLAUDE_API_KEY || '',
  },
  aeroapi: {
    apiKey: process.env.AEROAPI_KEY || '',
  },
  travelData: {
    apiKey: process.env.TRAVEL_DATA_API_KEY || '',
  },
};
