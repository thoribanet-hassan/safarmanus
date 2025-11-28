import axios from 'axios';
import { config } from '../config/env.js';

interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  cabinClass: string;
}

interface AmadeusToken {
  access_token: string;
  expires_in: number;
}

let amadeusToken: string | null = null;
let tokenExpiry: number = 0;

async function getAmadeusToken(): Promise<string> {
  if (amadeusToken && Date.now() < tokenExpiry) {
    return amadeusToken;
  }

  try {
    const response = await axios.post<AmadeusToken>(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: config.amadeus.apiKey,
        client_secret: config.amadeus.apiSecret,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    amadeusToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in - 60) * 1000;
    return amadeusToken;
  } catch (error) {
    console.error('Error getting Amadeus token:', error);
    throw new Error('Failed to authenticate with Amadeus API');
  }
}

export async function searchFlights(params: FlightSearchParams) {
  try {
    const token = await getAmadeusToken();

    const searchParams = new URLSearchParams({
      originLocationCode: params.origin,
      destinationLocationCode: params.destination,
      departureDate: params.departureDate,
      adults: params.adults.toString(),
      travelClass: params.cabinClass.toUpperCase(),
      max: '10',
    });

    if (params.returnDate) {
      searchParams.append('returnDate', params.returnDate);
    }

    const response = await axios.get(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?${searchParams}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Flight search error:', error.response?.data || error.message);
    throw new Error('Failed to search flights');
  }
}

export async function getFlightPrice(
  origin: string,
  destination: string,
  departureDate: string
): Promise<number | null> {
  try {
    const result = await searchFlights({
      origin,
      destination,
      departureDate,
      adults: 1,
      cabinClass: 'economy',
    });

    if (result.data && result.data.length > 0) {
      return parseFloat(result.data[0].price.total);
    }

    return null;
  } catch (error) {
    console.error('Error getting flight price:', error);
    return null;
  }
}
