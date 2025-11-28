import axios from 'axios';
import { config } from '../config/env.js';

// DeepSeek API Base URL
const DEEPSEEK_API_BASE = 'https://api.deepseek.com/v1';
const DEEPSEEK_MODEL = 'deepseek-chat'; // A good general-purpose model

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Helper function to make DeepSeek API calls
async function deepseekApiCall(messages: ChatMessage[], temperature: number, max_tokens: number): Promise<string> {
    try {
        const response = await axios.post(
            `${DEEPSEEK_API_BASE}/chat/completions`,
            {
                model: DEEPSEEK_MODEL,
                messages: messages,
                temperature: temperature,
                max_tokens: max_tokens,
            },
            {
                headers: {
                    'Authorization': `Bearer ${config.deepseek.apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.choices[0].message.content;
    } catch (error: any) {
        console.error('DeepSeek API Error:', error.response?.data || error.message);
        throw new Error('Failed to get AI response from DeepSeek');
    }
}

export async function chatWithAI(messages: ChatMessage[]): Promise<string> {
    const systemMessage: ChatMessage = {
        role: 'system',
        content: `أنت مساعد سفر ذكي اسمه "عقل سفر". تساعد المستخدمين في:
- البحث عن رحلات طيران وفنادق
- تقديم نصائح السفر
- الإجابة على أسئلة السفر
- اقتراح وجهات سياحية

كن ودوداً ومفيداً. أجب باللغة العربية إذا كان السؤال بالعربية، وبالإنجليزية إذا كان السؤال بالإنجليزية.`,
    };

    const fullMessages = [systemMessage, ...messages];
    return deepseekApiCall(fullMessages, 0.7, 500);
}

export async function parseSmartSearch(query: string): Promise<{
    origin?: string;
    destination?: string;
    departureDate?: string;
    returnDate?: string;
    passengers?: number;
}> {
    const systemMessage: ChatMessage = {
        role: 'system',
        content: `أنت محلل نصوص للبحث عن رحلات الطيران. استخرج المعلومات التالية من نص المستخدم:
- origin: رمز المطار للمغادرة (IATA code)
- destination: رمز المطار للوصول (IATA code)
- departureDate: تاريخ المغادرة بصيغة YYYY-MM-DD
- returnDate: تاريخ العودة بصيغة YYYY-MM-DD (إن وجد)
- passengers: عدد المسافرين

أرجع النتيجة بصيغة JSON فقط، بدون أي نص إضافي.`,
    };

    const fullMessages = [systemMessage, { role: 'user', content: query }];
    const content = await deepseekApiCall(fullMessages, 0.3, 200);

    try {
        return JSON.parse(content);
    } catch (e) {
        console.error('Smart search parsing error: Failed to parse JSON from DeepSeek', content);
        throw new Error('Failed to parse search query from AI');
    }
}
