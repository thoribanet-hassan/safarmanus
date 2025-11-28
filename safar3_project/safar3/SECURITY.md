# 🔐 API Security & Provider Integration Guide

## Critical Rules (MUST FOLLOW)

This document outlines the **mandatory security rules** for Safar application. ALL developers MUST follow these rules without exception.

---

## 1. API Key Security

### ✅ ALWAYS DO:

1. **Store keys in environment variables ONLY**
   ```bash
   # In .env file (NEVER commit this file)
   VITE_AMADEUS_API_KEY=your_actual_key_here
   VITE_OPENAI_API_KEY=your_actual_key_here
   ```

2. **Access keys through environment variables**
   ```typescript
   // ✅ CORRECT
   const apiKey = import.meta.env.VITE_AMADEUS_API_KEY;
   
   // ✅ CORRECT - With validation
   const getApiKey = (keyName: string): string => {
     const key = import.meta.env[keyName];
     if (!key) {
       console.warn(`⚠️ ${keyName} not configured`);
       return '';
     }
     return key;
   };
   ```

3. **Add .env to .gitignore**
   ```gitignore
   # Environment variables
   .env
   .env.local
   .env.*.local
   ```

### ❌ NEVER DO:

1. **NEVER hardcode API keys**
   ```typescript
   // ❌ WRONG - NEVER DO THIS
   const API_KEY = "sk-1234567890abcdef";
   const AMADEUS_KEY = "test123";
   ```

2. **NEVER use dummy/test keys**
   ```typescript
   // ❌ WRONG - NEVER DO THIS
   const API_KEY = "123";
   const API_KEY = "test";
   const API_KEY = "YOUR_KEY_HERE";
   ```

3. **NEVER expose keys in logs**
   ```typescript
   // ❌ WRONG - NEVER DO THIS
   console.log('API Key:', apiKey);
   console.log('Using key:', API_KEYS.OPENAI);
   ```

4. **NEVER modify keys or try to guess them**
   ```typescript
   // ❌ WRONG - NEVER DO THIS
   const modifiedKey = apiKey + "_modified";
   const guessedKey = "sk-" + randomString();
   ```

---

## 2. Travel Provider Integration

### Flight Search Providers

Safar supports multiple flight providers. The backend handles authentication.

#### Amadeus API
```typescript
// ✅ CORRECT Implementation
import { API_KEYS, isApiConfigured } from '../config/api';

export const searchFlights = async (params: FlightSearchParams) => {
  // Check if configured
  if (!isApiConfigured('AMADEUS')) {
    throw new Error('Flight API not configured');
  }
  
  // Use the key from environment variable
  const response = await fetch(API_ENDPOINT, {
    headers: {
      'Authorization': `Bearer ${API_KEYS.AMADEUS}`
    }
  });
  
  // Handle response...
};
```

#### Skyscanner API
```typescript
// ✅ CORRECT Implementation
export const searchWithSkyscanner = async (params: SearchParams) => {
  if (!isApiConfigured('SKYSCANNER')) {
    throw new Error('Skyscanner not configured');
  }
  
  // Backend handles the actual API call
  const response = await fetch('/api/skyscanner/search', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};
```

### Hotel Search
```typescript
// ✅ CORRECT Implementation
export const searchHotels = async (params: HotelSearchParams) => {
  if (!isApiConfigured('AMADEUS')) {
    return { error: 'Hotel search not available' };
  }
  
  // Use backend endpoint that has secure keys
  const response = await fetch('/api/hotels', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};
```

---

## 3. AI Model Integration

### OpenAI Integration
```typescript
// ✅ CORRECT Implementation
const generateWithOpenAI = async (messages: ChatMessage[]) => {
  if (!isApiConfigured('OPENAI')) {
    throw new Error('OpenAI not configured');
  }
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEYS.OPENAI}`, // From env only
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages
    })
  });
  
  return response.json();
};
```

### Google Gemini Integration
```typescript
// ✅ CORRECT Implementation
const generateWithGemini = async (prompt: string) => {
  if (!isApiConfigured('GEMINI')) {
    throw new Error('Gemini not configured');
  }
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEYS.GEMINI}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    }
  );
  
  return response.json();
};
```

---

## 4. Error Handling

### Graceful Degradation

When an API fails, NEVER expose the reason or API details to users.

```typescript
// ✅ CORRECT Error Handling
try {
  const results = await searchFlights(params);
  return results;
} catch (error) {
  console.error('Flight search failed:', error instanceof Error ? error.message : 'Unknown');
  
  // Return user-friendly message
  throw new Error('No data returned from provider. Please try an alternative source.');
}
```

```typescript
// ❌ WRONG - Exposes internal details
catch (error) {
  throw new Error(`Amadeus API failed with key ${API_KEY}: ${error}`);
}
```

### Provider Fallback

```typescript
// ✅ CORRECT - Try multiple providers
export const searchFlightsWithFallback = async (params: SearchParams) => {
  // Try Amadeus first
  if (isApiConfigured('AMADEUS')) {
    try {
      return await searchWithAmadeus(params);
    } catch (error) {
      console.warn('Amadeus failed, trying Skyscanner...');
    }
  }
  
  // Fallback to Skyscanner
  if (isApiConfigured('SKYSCANNER')) {
    try {
      return await searchWithSkyscanner(params);
    } catch (error) {
      console.warn('Skyscanner failed, trying Duffel...');
    }
  }
  
  // Last resort
  if (isApiConfigured('DUFFEL')) {
    return await searchWithDuffel(params);
  }
  
  throw new Error('No flight provider available');
};
```

---

## 5. File Modification Rules

### CRITICAL: Single File Updates Only

When fixing a specific module, **ONLY** update the requested file.

```typescript
// ✅ CORRECT
// User asks: "Fix the flight search service"
// You modify: ONLY src/services/flightService.ts

// ❌ WRONG
// User asks: "Fix the flight search service"  
// You modify: flightService.ts, aiService.ts, api.ts, App.tsx
```

**Rule**: Never cascade changes to unrelated files unless explicitly requested.

---

## 6. Environment Setup

### Development Environment

1. Create `.env` file:
```bash
cp .env.example .env
```

2. Add your actual keys:
```env
# Flight APIs
VITE_AMADEUS_API_KEY=your_real_key_here
VITE_AMADEUS_API_SECRET=your_real_secret_here

# AI APIs  
VITE_OPENAI_API_KEY=your_real_openai_key
VITE_GEMINI_API_KEY=your_real_gemini_key
```

3. **NEVER commit .env file**:
```bash
# Verify it's in .gitignore
git status
# .env should NOT appear in changed files
```

### Production Environment

For production deployment:

1. **Use environment variables from hosting provider**
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & Deploy → Environment
   - AWS/Azure: Use secrets manager

2. **NEVER include .env in build**

3. **Rotate keys regularly**

---

## 7. Code Review Checklist

Before committing code, verify:

- [ ] No hardcoded API keys
- [ ] No dummy/test keys
- [ ] All keys accessed via `import.meta.env`
- [ ] .env file is in .gitignore
- [ ] No console.log of sensitive data
- [ ] Error messages don't expose API details
- [ ] Provider fallbacks implemented
- [ ] Only requested files modified

---

## 8. Security Best Practices

### Rate Limiting
```typescript
// ✅ Implement rate limiting
const rateLimiter = {
  requests: 0,
  lastReset: Date.now(),
  limit: 60, // 60 requests per minute
  
  canMakeRequest(): boolean {
    if (Date.now() - this.lastReset > 60000) {
      this.requests = 0;
      this.lastReset = Date.now();
    }
    
    if (this.requests >= this.limit) {
      return false;
    }
    
    this.requests++;
    return true;
  }
};
```

### Input Validation
```typescript
// ✅ Validate all user inputs
export const searchFlights = async (params: FlightSearchParams) => {
  // Validate dates
  if (!isValidDate(params.departureDate)) {
    throw new Error('Invalid departure date');
  }
  
  // Validate airport codes
  if (!/^[A-Z]{3}$/.test(params.origin)) {
    throw new Error('Invalid origin airport code');
  }
  
  // Continue with search...
};
```

### Sanitize Responses
```typescript
// ✅ Remove sensitive data from responses
const sanitizeResponse = (data: any) => {
  const { apiKey, secret, ...safeData } = data;
  return safeData;
};
```

---

## 9. Testing

### Test Without Real Keys

Use mocks for testing:

```typescript
// ✅ CORRECT - Mock for tests
import { vi } from 'vitest';

vi.mock('../config/api', () => ({
  API_KEYS: {
    AMADEUS: 'mock-key',
    OPENAI: 'mock-key'
  },
  isApiConfigured: () => true
}));
```

### Never Use Real Keys in Tests

```typescript
// ❌ WRONG - NEVER use real keys in tests
test('should search flights', async () => {
  const result = await searchFlights({
    apiKey: 'sk-real-key-12345', // NEVER DO THIS
    origin: 'RUH'
  });
});
```

---

## 10. Summary

**The Golden Rule**: 

> **NEVER expose, print, modify, or guess ANY API key. ALL keys MUST come from environment variables ONLY.**

If you're unsure whether something is secure, ask yourself:

1. Would this code work if someone saw it on GitHub?
2. Are any secrets visible in the code?
3. Could an attacker get API keys from this code?

If the answer to 2 or 3 is "yes", **don't commit it**.

---

## 📞 Questions?

If you have questions about API security, please:

1. Review this document
2. Check the implementation in `src/config/api.ts`
3. Ask the team lead before making changes

**Remember**: Security is not optional. It's mandatory.

---

**Last Updated**: 2024-11-24  
**Version**: 1.0.0
