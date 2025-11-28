import { Request, Response } from 'express';
import { searchFlights } from '../services/flightService.js';
import { parseSmartSearch } from '../services/aiService.js';

export const search = async (req: Request, res: Response): Promise<void> => {
  try {
    const { origin, destination, departureDate, returnDate, adults, cabinClass } = req.body;

    if (!origin || !destination || !departureDate) {
      res.status(400).json({ error: 'Missing required parameters' });
      return;
    }

    const results = await searchFlights({
      origin,
      destination,
      departureDate,
      returnDate,
      adults: adults || 1,
      cabinClass: cabinClass || 'economy',
    });

    res.json(results);
  } catch (error: any) {
    console.error('Flight search error:', error);
    res.status(500).json({ error: 'Failed to search flights' });
  }
};

export const smartSearch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.body;

    if (!query) {
      res.status(400).json({ error: 'Query is required' });
      return;
    }

    // Parse the natural language query
    const searchParams = await parseSmartSearch(query);

    if (!searchParams.origin || !searchParams.destination || !searchParams.departureDate) {
      res.status(400).json({ 
        error: 'Could not extract required information from query',
        parsed: searchParams,
      });
      return;
    }

    // Search flights with parsed parameters
    const results = await searchFlights({
      origin: searchParams.origin,
      destination: searchParams.destination,
      departureDate: searchParams.departureDate,
      returnDate: searchParams.returnDate,
      adults: searchParams.passengers || 1,
      cabinClass: 'economy',
    });

    res.json({
      parsed: searchParams,
      results,
    });
  } catch (error: any) {
    console.error('Smart search error:', error);
    res.status(500).json({ error: 'Failed to process smart search' });
  }
};
