import cron from 'node-cron';
import { PriceAlert } from '../models/PriceAlert.js';
import { getFlightPrice } from './flightService.js';

// Check prices every 6 hours
export function startPriceMonitoring(): void {
  cron.schedule('0 */6 * * *', async () => {
    console.log('🔍 Running price monitoring check...');
    
    try {
      const activeAlerts = await PriceAlert.find({
        isActive: true,
        notified: false,
      });

      for (const alert of activeAlerts) {
        try {
          const currentPrice = await getFlightPrice(
            alert.origin,
            alert.destination,
            alert.departureDate
          );

          if (currentPrice !== null) {
            alert.currentPrice = currentPrice;

            // Check if price is below target
            if (currentPrice <= alert.targetPrice) {
              alert.notified = true;
              alert.isActive = false;
              
              console.log(`✅ Price alert triggered for ${alert.origin} → ${alert.destination}`);
              console.log(`   Target: $${alert.targetPrice}, Current: $${currentPrice}`);
              
              // TODO: Send notification to user (email, push notification, etc.)
            }

            await alert.save();
          }
        } catch (error) {
          console.error(`Error checking alert ${alert._id}:`, error);
        }
      }

      console.log(`✅ Price monitoring completed. Checked ${activeAlerts.length} alerts.`);
    } catch (error) {
      console.error('Error in price monitoring:', error);
    }
  });

  console.log('✅ Price monitoring service started');
}
