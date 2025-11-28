import { Request, Response } from 'express';
import { PriceAlert } from '../models/PriceAlert.js';
import { AuthRequest } from '../middleware/auth.js';

export const createAlert = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { origin, destination, departureDate, returnDate, targetPrice, passengers, cabinClass } = req.body;

    if (!origin || !destination || !departureDate || !targetPrice) {
      res.status(400).json({ error: 'Missing required parameters' });
      return;
    }

    const alert = await PriceAlert.create({
      userId,
      origin,
      destination,
      departureDate,
      returnDate,
      targetPrice,
      passengers: passengers || 1,
      cabinClass: cabinClass || 'economy',
    });

    res.status(201).json(alert);
  } catch (error: any) {
    console.error('Create alert error:', error);
    res.status(500).json({ error: 'Failed to create alert' });
  }
};

export const getAlerts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const alerts = await PriceAlert.find({ userId }).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error: any) {
    console.error('Get alerts error:', error);
    res.status(500).json({ error: 'Failed to get alerts' });
  }
};

export const deleteAlert = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const alert = await PriceAlert.findOneAndDelete({ _id: id, userId });

    if (!alert) {
      res.status(404).json({ error: 'Alert not found' });
      return;
    }

    res.json({ message: 'Alert deleted successfully' });
  } catch (error: any) {
    console.error('Delete alert error:', error);
    res.status(500).json({ error: 'Failed to delete alert' });
  }
};

export const updateAlert = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const updates = req.body;

    const alert = await PriceAlert.findOneAndUpdate(
      { _id: id, userId },
      updates,
      { new: true }
    );

    if (!alert) {
      res.status(404).json({ error: 'Alert not found' });
      return;
    }

    res.json(alert);
  } catch (error: any) {
    console.error('Update alert error:', error);
    res.status(500).json({ error: 'Failed to update alert' });
  }
};
