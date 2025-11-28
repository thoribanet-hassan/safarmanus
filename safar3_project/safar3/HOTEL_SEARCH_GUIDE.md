# 🏨 نظام البحث المتقدم عن الفنادق

## نظرة عامة

نظام بحث احترافي ومتقدم يدعم جميع أنواع البحث والفلترة والاقتراحات الذكية.

---

## 1. البحث بالسعر (Lowest Price Search) 💰

### الميزات:
- ✅ عرض أرخص 3 فنادق فقط
- ✅ حساب نسبة الفرق عن متوسط الأسعار
- ✅ تحذير للأسعار المنخفضة جداً

### الاستخدام:
```typescript
const response = await searchLowestPriceHotels(
    'الرياض',
    '2025-12-01',
    '2025-12-05'
);
```

### مثال النتيجة:
```json
{
  "hotels": [
    {
      "name": "فندق النخيل",
      "pricePerNight": 280,
      "totalPrice": 1120,
      "stars": 3,
      "rating": 4.2,
      "distanceKm": 2.5,
      "areaName": "العليا",
      "image": "https://...",
      "amenities": ["wifi", "parking", "pool"],
      "cancellationPolicy": "إلغاء مجاني قبل 24 ساعة",
      "availableRoom": "غرفة مزدوجة قياسية"
    }
  ],
  "averagePrice": 450,
  "suggestions": [
    "السعر منخفض جداً مقارنة بالمتوسط (38% أقل)… قد يكون عرض محدود."
  ]
}
```

### منطق التحذير:
```typescript
const priceDiff = ((hotelPrice - averagePrice) / averagePrice) * 100;

if (priceDiff < -40) {
    // السعر أقل ب 40% من المتوسط
    warning = "السعر منخفض جداً مقارنة بالمتوسط… قد يكون عرض محدود.";
}
```

---

## 2. البحث الجغرافي (Geographical Search) 📍

### أ) البحث بالمنطقة:
```typescript
const response = await searchHotels({
    city: 'الرياض',
    area: 'العليا',
    checkIn: '2025-12-01',
    checkOut: '2025-12-05'
});
```

### ب) البحث بنصف القطر:
```typescript
const response = await searchHotelsByLocation(
    'الرياض',
    '2025-12-01',
    '2025-12-05',
    { lat: 24.7136, lng: 46.6753 }, // موقع محدد
    5 // 5 كيلومتر
);
```

**الحسابات:**
```typescript
// Haversine Formula لحساب المسافة
const distance = calculateDistance(
    hotelLat, hotelLng,
    userLat, userLng
);

if (distance <= radius) {
    // الفندق ضمن النطاق
}
```

### ج) البحث بـ Bounding Box:
```typescript
const response = await searchHotels({
    city: 'الرياض',
    boundingBox: {
        topLeft: { lat: 24.800, lng: 46.600 },
        bottomRight: { lat: 24.600, lng: 46.800 }
    },
    checkIn: '2025-12-01',
    checkOut: '2025-12-05'
});
```

### رسالة "لا نتائج":
```
"ما لقيت فنادق داخل النطاق المطلوب… تبغاني أوسع البحث؟"
```

---

## 3. البحث الشامل (Deep Hotel Search) 🔍

### الفلاتر المدعومة:

#### أ) السعر:
```typescript
{
    minPrice: 200,
    maxPrice: 600
}
```

#### ب) التقييم والنجوم:
```typescript
{
    minStars: 4,      // 4 نجوم فأكثر
    minRating: 4.0    // تقييم 4.0 فأكثر
}
```

#### ج) المرافق:
```typescript
{
    amenities: ['pool', 'breakfast', 'parking', 'wifi', 'family-rooms']
}
```

### ترتيب الأولويات:
```
1. المنطقة
2. السعر
3. النجوم
4. المسافة
5. الترتيب
```

### مثال بحث متقدم:
```typescript
const response = await searchHotels({
    city: 'الرياض',
    area: 'بوليفارد',
    maxPrice: 600,
    minStars: 5,
    amenities: ['pool', 'wifi'],
    sortBy: 'price',
    checkIn: '2025-12-01',
    checkOut: '2025-12-05'
});
```

**الطلب:**
"أبغى فندق خمس نجوم قريب من البوليفارد أقل من 600 ريال"

**التنفيذ:**
1. فلتر: area = "بوليفارد" ✅
2. فلتر: maxPrice = 600 ✅
3. فلتر: minStars = 5 ✅
4. حساب: المسافة من البوليفارد ✅
5. ترتيب: حسب السعر (الأرخص أولاً) ✅

---

## 4. البحث الذكي (Smart Recommendations) 🧠

### أ) ميزانية محدودة:
```typescript
if (cheapest.pricePerNight <= params.maxPrice) {
    suggestion = `أرخص خيار مناسب ضمن ميزانيتك هو ${cheapest.name} بسعر ${cheapest.pricePerNight} ريال.`;
}
```

**مثال:**
```
"أرخص خيار مناسب ضمن ميزانيتك هو فندق النخيل بسعر 280 ريال."
```

### ب) منطقة غالية:
```typescript
if (params.area && averagePrice > 800) {
    suggestion = `الأسعار في ${params.area} مرتفعة… أفضل خيار قريب منها هو ${cheapest.name}.`;
}
```

**مثال:**
```
"الأسعار في التحلية مرتفعة… أفضل خيار قريب منها هو فندق الوادي."
```

### ج) تاريخ مزدحم:
```typescript
// يمكن إضافة منطق للكشف عن الازدحام
if (isPeakSeason) {
    suggestion = "الأسعار مرتفعة جداً في هذا التاريخ… لو غيّرنا يوم واحد ينخفض السعر 30٪.";
}
```

---

## 5. حساب القيمة (Value Score) ⭐

### الصيغة:
```typescript
ValueScore = (rating * stars) / pricePerNight
```

### أمثلة:

**فندق A:**
- Rating: 4.5
- Stars: 5
- Price: 450 SAR
- **Value Score: (4.5 × 5) / 450 = 0.050**

**فندق B:**
- Rating: 4.2
- Stars: 4
- Price: 280 SAR
- **Value Score: (4.2 × 4) / 280 = 0.060** ← أفضل قيمة!

### الترتيب:
```typescript
const response = await searchBestValueHotels(
    'الرياض',
    '2025-12-01',
    '2025-12-05'
);
```

**النتيجة:**
الفنادق مرتبة من الأعلى للأقل في Value Score → "أفضل قيمة مقابل المال"

---

## 6. بدائل المنطقة (Area Alternatives) 🗺️

### منطق البحث:
```
1. البحث في المنطقة المطلوبة → لا نتائج
2. البحث في radius 3km → وجد نتائج
3. البحث في radius 5km → وجد نتائج
4. البحث في radius 10km → وجد نتائج
5. اقتراح أقرب 3 مناطق
```

### صيغة الرد:
```
"ما لقيت فنادق في العليا، لكن قربها:
  - التحلية (من 380 ريال / 2.5 كم)
  - السليمانية (من 430 ريال / 4.1 كم)
  - طريق الملك فهد (من 410 ريال / 3.8 كم)"
```

### التنفيذ:
```typescript
interface AreaAlternative {
    areaName: string;
    minPrice: number;
    distanceKm: number;
}

const alternatives: AreaAlternative[] = [
    { areaName: 'التحلية', minPrice: 380, distanceKm: 2.5 },
    { areaName: 'السليمانية', minPrice: 430, distanceKm: 4.1 },
    { areaName: 'طريق الملك فهد', minPrice: 410, distanceKm: 3.8 }
];
```

---

## 7. التنسيق الموحد للنتائج 📋

### البنية الكاملة:
```typescript
interface HotelResult {
    id: string;                    // معرّف فريد
    name: string;                  // اسم الفندق
    image: string;                 // رابط الصورة
    pricePerNight: number;         // سعر الليلة
    totalPrice: number;            // السعر الإجمالي
    stars: number;                 // عدد النجوم (1-5)
    rating: number;                // التقييم (0-5)
    distanceKm: number;            // المسافة بالكيلومترات
    areaName: string;              // اسم المنطقة
    amenities: string[];           // المرافق
    cancellationPolicy: string;    // سياسة الإلغاء
    availableRoom: string;         // الغرفة المتاحة
    coordinates: {
        lat: number;
        lng: number;
    };
}
```

### مثال كامل:
```json
{
  "id": "hotel_123",
  "name": "فندق الفيصلية",
  "image": "https://example.com/faisaliah.jpg",
  "pricePerNight": 850,
  "totalPrice": 3400,
  "stars": 5,
  "rating": 4.8,
  "distanceKm": 1.2,
  "areaName": "العليا",
  "amenities": [
    "مسبح",
    "إفطار مجاني",
    "موقف سيارات",
    "واي فاي",
    "غرف عائلية",
    "مركز لياقة"
  ],
  "cancellationPolicy": "إلغاء مجاني قبل 48 ساعة",
  "availableRoom": "جناح ملكي مع إطلالة",
  "coordinates": {
    "lat": 24.6877,
    "lng": 46.6857
  }
}
```

---

## أمثلة الاستخدام الكاملة

### مثال 1: بحث بسيط بأقل سعر
```typescript
const response = await searchLowestPriceHotels(
    'الرياض',
    '2025-12-01',
    '2025-12-05'
);

// النتيجة: أرخص 3 فنادق في الرياض
// مع تحذير إذا السعر منخفض جداً
```

### مثال 2: بحث متقدم بفلاتر متعددة
```typescript
const response = await searchHotels({
    city: 'جدة',
    area: 'الكورنيش',
    minStars: 4,
    maxPrice: 700,
    amenities: ['pool', 'beach', 'wifi'],
    sortBy: 'value',
    checkIn: '2025-12-10',
    checkOut: '2025-12-15'
});

// النتيجة: فنادق 4 نجوم+ في الكورنيش
// أقل من 700 ريال، مع مسبح وشاطئ
// مرتبة حسب أفضل قيمة
```

### مثال 3: بحث جغرافي بنصف قطر
```typescript
const response = await searchHotelsByLocation(
    'الرياض',
    '2025-12-01',
    '2025-12-05',
    { lat: 24.7136, lng: 46.6753 }, // موقع بوليفارد
    3 // 3 كم
);

// النتيجة: فنادق على بعد 3 كم من بوليفارد
// مرتبة حسب المسافة (الأقرب أولاً)
```

### مثال 4: بحث داخل منطقة محددة
```typescript
const response = await searchHotels({
    city: 'الرياض',
    boundingBox: {
        topLeft: { lat: 24.750, lng: 46.650 },
        bottomRight: { lat: 24.680, lng: 46.720 }
    },
    minStars: 5,
    sortBy: 'rating',
    checkIn: '2025-12-01',
    checkOut: '2025-12-05'
});

// النتيجة: فنادق 5 نجوم فقط
// ضمن المنطقة الجغرافية المحددة
// مرتبة حسب التقييم (الأعلى أولاً)
```

---

## الدوال الرئيسية

### 1. `searchHotels(params)` - البحث الشامل
```typescript
const response = await searchHotels({
    city: string,
    checkIn: string,
    checkOut: string,
    guests?: number,
    minPrice?: number,
    maxPrice?: number,
    minStars?: number,
    minRating?: number,
    area?: string,
    radius?: number,
    coordinates?: { lat, lng },
    boundingBox?: { topLeft, bottomRight },
    amenities?: string[],
    sortBy?: 'price' | 'rating' | 'distance' | 'value'
});
```

### 2. `searchLowestPriceHotels()` - أرخص 3 فنادق
```typescript
const response = await searchLowestPriceHotels(city, checkIn, checkOut);
```

### 3. `searchBestValueHotels()` - أفضل قيمة
```typescript
const response = await searchBestValueHotels(city, checkIn, checkOut);
```

### 4. `searchHotelsByLocation()` - بحث جغرافي
```typescript
const response = await searchHotelsByLocation(city, checkIn, checkOut, coordinates, radius);
```

---

**نظام بحث فنادق احترافي ومتقدم! 🏨✅🎯**
