/**
 * خدمة البحث عن الفنادق المتقدمة
 * Advanced Hotel Search Service
 * 
 * يدعم:
 * - البحث بالسعر (Lowest Price)
 * - البحث الجغرافي (Geographical)
 * - البحث الشامل (Deep Search)
 * - البحث الذكي (Smart Recommendations)
 * - حساب القيمة (Value Score)
 * - بدائل المنطقة (Area Alternatives)
 */

// ════════════════════════════════════════════════════════════
// Types & Interfaces
// ════════════════════════════════════════════════════════════

export interface HotelResult {
    id: string;
    name: string;
    image: string;
    pricePerNight: number;
    totalPrice: number;
    currency: string;
    stars: number;
    rating: number;
    distanceKm: number;
    areaName: string;
    amenities: string[];
    cancellationPolicy: string;
    availableRoom: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}

export interface HotelSearchParams {
    city: string;
    checkIn: string;
    checkOut: string;
    guests?: number;
    minPrice?: number;
    maxPrice?: number;
    minStars?: number;
    minRating?: number;
    area?: string;
    radius?: number; // km
    coordinates?: {
        lat: number;
        lng: number;
    };
    boundingBox?: {
        topLeft: { lat: number; lng: number };
        bottomRight: { lat: number; lng: number };
    };
    amenities?: string[];
    sortBy?: 'price' | 'rating' | 'distance' | 'value';
}

export interface HotelSearchResponse {
    success: boolean;
    hotels: HotelResult[];
    count: number;
    averagePrice?: number;
    suggestions?: string[];
    alternatives?: AreaAlternative[];
}

export interface AreaAlternative {
    areaName: string;
    minPrice: number;
    distanceKm: number;
}

// ════════════════════════════════════════════════════════════
// Helper Functions
// ════════════════════════════════════════════════════════════

/**
 * حساب Value Score
 * ValueScore = (rating * stars) / pricePerNight
 */
const calculateValueScore = (hotel: HotelResult): number => {
    if (hotel.pricePerNight === 0) return 0;
    return (hotel.rating * hotel.stars) / hotel.pricePerNight;
};

/**
 * حساب متوسط الأسعار
 */
const calculateAveragePrice = (hotels: HotelResult[]): number => {
    if (hotels.length === 0) return 0;
    const total = hotels.reduce((sum, h) => sum + h.pricePerNight, 0);
    return total / hotels.length;
};

/**
 * حساب المسافة بين نقطتين (Haversine formula)
 */
const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
): number => {
    const R = 6371; // نصف قطر الأرض بالكيلومترات
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

/**
 * التحقق من وجود الفندق داخل Bounding Box
 */
const isInBoundingBox = (
    hotelLat: number,
    hotelLng: number,
    box: { topLeft: { lat: number; lng: number }; bottomRight: { lat: number; lng: number } }
): boolean => {
    return (
        hotelLat <= box.topLeft.lat &&
        hotelLat >= box.bottomRight.lat &&
        hotelLng >= box.topLeft.lng &&
        hotelLng <= box.bottomRight.lng
    );
};

/**
 * فلترة الفنادق حسب المعايير
 */
const filterHotels = (
    hotels: HotelResult[],
    params: HotelSearchParams
): HotelResult[] => {
    let filtered = [...hotels];

    // فلتر السعر
    if (params.minPrice !== undefined) {
        filtered = filtered.filter(h => h.pricePerNight >= params.minPrice!);
    }
    if (params.maxPrice !== undefined) {
        filtered = filtered.filter(h => h.pricePerNight <= params.maxPrice!);
    }

    // فلتر النجوم
    if (params.minStars !== undefined) {
        filtered = filtered.filter(h => h.stars >= params.minStars!);
    }

    // فلتر التقييم
    if (params.minRating !== undefined) {
        filtered = filtered.filter(h => h.rating >= params.minRating!);
    }

    // فلتر المنطقة
    if (params.area) {
        filtered = filtered.filter(h =>
            h.areaName.toLowerCase().includes(params.area!.toLowerCase())
        );
    }

    // فلتر نصف القطر
    if (params.coordinates && params.radius) {
        filtered = filtered.filter(h => {
            const distance = calculateDistance(
                params.coordinates!.lat,
                params.coordinates!.lng,
                h.coordinates.lat,
                h.coordinates.lng
            );
            return distance <= params.radius!;
        });
    }

    // فلتر Bounding Box
    if (params.boundingBox) {
        filtered = filtered.filter(h =>
            isInBoundingBox(
                h.coordinates.lat,
                h.coordinates.lng,
                params.boundingBox!
            )
        );
    }

    // فلتر المرافق
    if (params.amenities && params.amenities.length > 0) {
        filtered = filtered.filter(h =>
            params.amenities!.every(amenity =>
                h.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
            )
        );
    }

    return filtered;
};

/**
 * ترتيب الفنادق
 */
const sortHotels = (
    hotels: HotelResult[],
    sortBy: 'price' | 'rating' | 'distance' | 'value'
): HotelResult[] => {
    const sorted = [...hotels];

    switch (sortBy) {
        case 'price':
            return sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'distance':
            return sorted.sort((a, b) => a.distanceKm - b.distanceKm);
        case 'value':
            return sorted.sort((a, b) =>
                calculateValueScore(b) - calculateValueScore(a)
            );
        default:
            return sorted;
    }
};

/**
 * توليد اقتراحات ذكية
 */
const generateSmartSuggestions = (
    hotels: HotelResult[],
    params: HotelSearchParams,
    averagePrice: number
): string[] => {
    const suggestions: string[] = [];

    if (hotels.length === 0) {
        return ['ما لقيت فنادق تطابق معاييرك… حاول تخفيف الفلاتر'];
    }

    const cheapest = hotels[0];
    const priceDiff = ((cheapest.pricePerNight - averagePrice) / averagePrice) * 100;

    // تحذير للأسعار المنخفضة جداً
    if (priceDiff < -40) {
        suggestions.push(
            `السعر منخفض جداً مقارنة بالمتوسط (${Math.abs(priceDiff).toFixed(0)}% أقل)… قد يكون عرض محدود.`
        );
    }

    // اقتراح للميزانية المحدودة
    if (params.maxPrice && cheapest.pricePerNight <= params.maxPrice) {
        suggestions.push(
            `أرخص خيار مناسب ضمن ميزانيتك هو ${cheapest.name} بسعر ${cheapest.pricePerNight} ريال.`
        );
    }

    // اقتراح للمنطقة الغالية
    if (params.area && averagePrice > 800) {
        suggestions.push(
            `الأسعار في ${params.area} مرتفعة… أفضل خيار قريب منها هو ${cheapest.name}.`
        );
    }

    return suggestions;
};

/**
 * البحث عن بدائل في المناطق المجاورة
 */
const findAreaAlternatives = async (
    city: string,
    area: string,
    params: HotelSearchParams
): Promise<AreaAlternative[]> => {
    // في الإنتاج سيتم استدعاء خدمة Backend—هنا نكتفي بتسجيل المعلمات لضمان عدم ظهور تحذيرات TypeScript
    console.log(`🔍 Searching alternatives for ${area} in ${city}`, {
        radius: params.radius ?? 'default',
        guests: params.guests ?? 1,
    });

    return [];
};

// ════════════════════════════════════════════════════════════
// Main Search Function
// ════════════════════════════════════════════════════════════

/**
 * البحث المتقدم عن الفنادق
 */
export const searchHotels = async (
    params: HotelSearchParams
): Promise<HotelSearchResponse> => {
    console.log('🏨 Advanced Hotel Search:', params);

    try {
        // 1. استدعاء Backend API
        const response = await fetch('/api/hotels/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });

        if (!response.ok) {
            throw new Error('Backend request failed');
        }

        const data = await response.json();
        let hotels: HotelResult[] = data.hotels || [];

        // 2. فلترة الفنادق
        hotels = filterHotels(hotels, params);

        // 3. ترتيب الفنادق
        const sortBy = params.sortBy || 'price';
        hotels = sortHotels(hotels, sortBy);

        // 4. أخذ أفضل 3 فنادق فقط (للبحث بالسعر)
        const top3Hotels = hotels.slice(0, 3);

        // 5. حساب متوسط الأسعار
        const averagePrice = calculateAveragePrice(hotels);

        // 6. توليد اقتراحات ذكية
        const suggestions = generateSmartSuggestions(top3Hotels, params, averagePrice);

        // 7. البحث عن بدائل في المناطق المجاورة (إذا لزم الأمر)
        let alternatives: AreaAlternative[] = [];
        if (top3Hotels.length === 0 && params.area) {
            alternatives = await findAreaAlternatives(params.city, params.area, params);
        }

        console.log(`✅ Found ${top3Hotels.length} hotels (from ${hotels.length} total)`);

        return {
            success: true,
            hotels: top3Hotels,
            count: top3Hotels.length,
            averagePrice,
            suggestions,
            alternatives
        };

    } catch (error) {
        console.error('❌ Hotel search error:', error);
        return {
            success: false,
            hotels: [],
            count: 0,
            suggestions: ['الخدمة معلّقة مؤقتاً… جرّب بعد لحظات.']
        };
    }
};

/**
 * البحث بأقل سعر
 */
export const searchLowestPriceHotels = async (
    city: string,
    checkIn: string,
    checkOut: string
): Promise<HotelSearchResponse> => {
    return searchHotels({
        city,
        checkIn,
        checkOut,
        sortBy: 'price'
    });
};

/**
 * البحث بأفضل قيمة (Value Score)
 */
export const searchBestValueHotels = async (
    city: string,
    checkIn: string,
    checkOut: string
): Promise<HotelSearchResponse> => {
    return searchHotels({
        city,
        checkIn,
        checkOut,
        sortBy: 'value'
    });
};

/**
 * البحث الجغرافي
 */
export const searchHotelsByLocation = async (
    city: string,
    checkIn: string,
    checkOut: string,
    coordinates: { lat: number; lng: number },
    radius: number
): Promise<HotelSearchResponse> => {
    return searchHotels({
        city,
        checkIn,
        checkOut,
        coordinates,
        radius,
        sortBy: 'distance'
    });
};

// --- Sniper Feature ---

export interface SniperParams {
    target: string; // Hotel name or Area
    maxPrice: number;
    checkIn: string;
    checkOut: string;
    durationHours: number; // How long to keep searching
    frequencyMinutes: number; // How often to search
}

export const createHotelSniper = async (params: SniperParams): Promise<{ success: boolean; message: string; id?: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const frequencyText = params.frequencyMinutes >= 60
        ? `كل ${params.frequencyMinutes / 60} ساعة`
        : `كل ${params.frequencyMinutes} دقيقة`;

    return {
        success: true,
        message: `تم تفعيل صائد الحجوزات! سنراقب "${params.target}" بسعر أقل من ${params.maxPrice} ريال لمدة ${params.durationHours} ساعة (${frequencyText}). سنبلغك فور توفر طلبك.`,
        id: Math.random().toString(36).substr(2, 9)
    };
};

export interface PriceMonitorParams {
    city: string;
    checkIn: string;
    checkOut: string;
    email?: string;
}

export const createHotelPriceMonitor = async (params: PriceMonitorParams): Promise<{ success: boolean; message: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        success: true,
        message: `تم تفعيل مراقبة الأسعار في "${params.city}" للفترة من ${params.checkIn} إلى ${params.checkOut}. سنرسل لك تنبيهاً عند انخفاض الأسعار.`
    };
};
