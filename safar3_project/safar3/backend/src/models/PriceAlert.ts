import mongoose, { Document, Schema } from 'mongoose';

export interface IPriceAlert extends Document {
  userId: mongoose.Types.ObjectId;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  targetPrice: number;
  currentPrice?: number;
  passengers: number;
  cabinClass: string;
  isActive: boolean;
  notified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const priceAlertSchema = new Schema<IPriceAlert>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    departureDate: {
      type: String,
      required: true,
    },
    returnDate: {
      type: String,
    },
    targetPrice: {
      type: Number,
      required: true,
    },
    currentPrice: {
      type: Number,
    },
    passengers: {
      type: Number,
      default: 1,
    },
    cabinClass: {
      type: String,
      default: 'economy',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    notified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const PriceAlert = mongoose.model<IPriceAlert>('PriceAlert', priceAlertSchema);
