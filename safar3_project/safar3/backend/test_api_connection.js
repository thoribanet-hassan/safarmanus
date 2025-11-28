const { OpenAI } = require('openai');
const axios = require('axios');
require('dotenv').config({ path: './.env' });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;

async function testOpenAI() {
    console.log('--- Testing OpenAI Connection ---');
    if (!OPENAI_API_KEY) {
        console.error('OPENAI_API_KEY is missing.');
        return false;
    }

    try {
        const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Say 'Hello' in one word." }],
            max_tokens: 5,
        });
        
        const result = response.choices[0].message.content.trim();
        if (result.toLowerCase().includes('hello')) {
            console.log(`✅ OpenAI Test Successful. Response: "${result}"`);
            return true;
        } else {
            console.error(`❌ OpenAI Test Failed. Unexpected response: "${result}"`);
            return false;
        }
    } catch (error) {
        console.error('❌ OpenAI Test Failed. Error:', error.message);
        return false;
    }
}

async function getAmadeusToken() {
    const url = 'https://test.api.amadeus.com/v1/security/oauth2/token';
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('client_id', AMADEUS_API_KEY);
    data.append('client_secret', AMADEUS_API_SECRET);

    try {
        const response = await axios.post(url, data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('❌ Amadeus Token Request Failed. Error:', error.response ? error.response.data : error.message);
        return null;
    }
}

async function testAmadeus() {
    console.log('\n--- Testing Amadeus Connection ---');
    if (!AMADEUS_API_KEY || !AMADEUS_API_SECRET) {
        console.error('Amadeus API keys are missing.');
        return false;
    }

    const token = await getAmadeusToken();
    if (!token) {
        console.error('❌ Amadeus Test Failed: Could not get access token.');
        return false;
    }

    console.log('✅ Amadeus Token Received. Testing Flight Search API...');
    
    const flightSearchUrl = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
    const params = {
        originLocationCode: 'JED',
        destinationLocationCode: 'RUH',
        departureDate: '2025-12-01',
        adults: 1,
        max: 1
    };

    try {
        const response = await axios.get(flightSearchUrl, {
            params: params,
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.status === 200 && response.data.data.length > 0) {
            console.log('✅ Amadeus Flight Search Test Successful. Found flight offers.');
            return true;
        } else {
            console.error('❌ Amadeus Flight Search Test Failed. No offers found or unexpected response.');
            return false;
        }
    } catch (error) {
        console.error('❌ Amadeus Flight Search Test Failed. Error:', error.response ? error.response.data : error.message);
        return false;
    }
}

async function runTests() {
    const openaiSuccess = await testOpenAI();
    const amadeusSuccess = await testAmadeus();

    console.log('\n--- Final Summary ---');
    console.log(`OpenAI Connection: ${openaiSuccess ? '✅ SUCCESS' : '❌ FAILED'}`);
    console.log(`Amadeus Connection: ${amadeusSuccess ? '✅ SUCCESS' : '❌ FAILED'}`);
}

runTests();
