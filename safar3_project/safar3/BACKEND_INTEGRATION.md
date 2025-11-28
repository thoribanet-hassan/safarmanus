# 🔌 دليل تكامل Backend API

## نظرة عامة

تم إعادة بناء واجهة سفر للعمل بالكامل مع Backend API، بدون أي اعتماد على بيانات مح لية.

---

## القواعد الأساسية

### 1. استدعاء Endpoints مطابق تماماً ✅

كل زر/وظيفة تستدعي endpoint يطابق اسم الخدمة:

```typescript
/flights/search  → searchFlights()
/alerts/create   → createAlert()
/alerts/list     → getAlerts()
/chat            → sendChatMessage()
```

### 2. لا اعتماد على بيانات داخلية ⛔

```typescript
// ❌ خطأ
const mockFlights = [...]
const localData = {...}

// ✅ صحيح
const response = await backendAPI(endpoint)
```

### 3. الأخطاء في Console فقط 📋

```typescript
// جميع الأخطاء تُسجل في console
console.error(`❌ [Backend Error] ${endpoint}:`, error);

// المستخدم يرى رسالة مهذبة فقط
setError('حدث خطأ في الاتصال بالخادم');
```

### 4. رسالة "لا توجد نتائج" محددة 💬

```typescript
export const NO_RESULTS_MESSAGE = 'ما لقينا رحلات تناسب بحثك… تبي بدائل؟';
```

---

## الملفات المحدثة

### 1. `src/services/backendAPI.ts` - جديد

**المعالج المركزي لجميع طلبات Backend:**

```typescript
// الدوال الرئisية:
- searchFlights()      // POST /flights/search
- createAlert()        // POST /alerts/create
- getAlerts()          // GET /alerts/list
- cancelAlert()        // POST /alerts/cancel
- sendChatMessage()    // POST /chat
```

**الميزات:**
- ✅ معالجة أخطاء مركزية
- ✅ تسجيل واضح في console
- ✅ إرجاع `null` عند الأخطاء
- ✅ رسائل محددة للمستخدم

---

### 2. `src/pages/FlightsPage.tsx` - محدث

**التغييرات:**
```typescript
// قبل❌
import { searchFlights } from '../services/flightService';
const flights = await searchFlights(params);

// بعد ✅
import { searchFlights as backendSearchFlights } from '../services/backendAPI';
const response = await backendSearchFlights({
    from: origin,
    to: destination,
    date: departureDate
});
```

**معالجة النتائج:**
```typescript
if (response === null) {
    setError('حدث خطأ في الاتصال بالخادم');
    return;
}

if (response.flights.length === 0) {
    setError(NO_RESULTS_MESSAGE);
    return;
}

setResults(response.flights);
```

---

### 3. `src/components/ChatInterface.tsx` - محدث

**التغييرات:**
```typescript
// قبل ❌
import { processSafarRequest } from '../services/safarBrain';
const response = await processSafarRequest(message);

// بعد ✅
import { sendChatMessage } from '../services/backendAPI';
const response = await sendChatMessage({
    message: currentInput,
    conversationId: conversationId
});
```

**Conversation Tracking:**
```typescript
// حفظ conversation ID للمحادثات المستمرة
if (response.conversationId) {
    setConversationId(response.conversationId);
}
```

---

## Backend API Structure

### Request/Response Formats

#### 1. Flight Search

**Request:**
```json
POST /api/flights/search
{
  "from": "RUH",
  "to": "JED",
  "date": "2025-11-30",
  "return": "2025-12-05"  // optional
}
```

**Response:**
```json
{
  "success": true,
  "flights": [
    {
      "id": "flight_123",
      "airline": "السعودية",
      "flightNumber": "SV1234",
      "from": "RUH",
      "to": "JED",
      "departureTime": "2025-11-30T10:00:00Z",
      "arrivalTime": "2025-11-30T11:30:00Z",
      "duration": "1h 30m",
      "price": 450,
      "currency": "SAR"
    }
  ],
  "count": 12
}
```

#### 2. Create Price Alert

**Request:**
```json
POST /api/alerts/create
{
  "from": "RUH",
  "to": "DXB",
  "targetPrice": 1000,
  "date": "2025-12-01"
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم إنشاء التنبيه بنجاح",
  "alert": {
    "id": "alert_456",
    "from": "RUH",
    "to": "DXB",
    "targetPrice": 1000,
    "currentPrice": 1200,
    "date": "2025-12-01",
    "status": "active",
    "createdAt": "2025-11-25T09:00:00Z"
  }
}
```

#### 3. Chat Message

**Request:**
```json
POST /api/chat
{
  "message": "ابحث عن رحلات من الرياض إلى جدة",
  "conversationId": "conv_789"  // optional
}
```

**Response:**
```json
{
  "success": true,
  "response": "✅ وجدت 12 رحلة...",
  "conversationId": "conv_789"
}
```

---

## معالجة الأخطاء

### في Backend Service:

```typescript
const handleError = (endpoint: string, error: unknown): void => {
    console.error(`❌ [Backend Error] ${endpoint}:`, error);
    if (error instanceof Error) {
        console.error('Error details:', error.message);
    }
};
```

**مثال في console:**
```
❌ [Backend Error] /flights/search: TypeError: fetch failed
Error details: Network request failed
```

### في Components:

```typescript
if (response === null) {
    // Backend غير متاح
    setError('حدث خطأ في الاتصال بالخادم');
    return;
}

if (response.flights.length === 0) {
    // لا نتائج
    setError(NO_RESULTS_MESSAGE);
    return;
}
```

---

## تكوين Backend URL

### في `.env`:
```bash
VITE_BACKEND_URL=http://localhost:3000/api
```

### في الإنتاج:
```bash
VITE_BACKEND_URL=https://api.safar.sa/v1
```

### الافتراضي:
```typescript
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';
```

---

## اختبار الاتصال

### Health Check:

```typescript
import { checkBackendConnection } from '../services/backendAPI';

const isConnected = await checkBackendConnection();
if (!isConnected) {
    console.warn('⚠️ Backend is not reachable');
}
```

---

## أمثلة الاستخدام

### 1. FlightsPage - البحث

```typescript
const handleSearch = async () => {
    const response = await backendSearchFlights({
        from: 'RUH',
        to: 'JED',
        date: '2025-11-30'
    });

    // response === null → خطأ في الاتصال
    // response.flights.length === 0 → لا نتائج
    // response.flights → النتائج
};
```

### 2. ChatInterface - المحادثة

```typescript
const handleSend = async () => {
    const response = await sendChatMessage({
        message: userInput,
        conversationId: savedConversationId
    });

    if (response) {
        setConversationId(response.conversationId);
        displayMessage(response.response);
    }
};
```

### 3. MonitorPage - التنبيهات

```typescript
const createNewAlert = async () => {
    const response = await createAlert({
        from: 'RUH',
        to: 'DXB',
        targetPrice: 1000,
        date: '2025-12-01'
    });

    if (response?.success) {
        console.log('✅ Alert created:', response.alert);
    }
};
```

---

## التنسيق الموحد

### كروت الرحلات:

```tsx
<div className="flight-card glass-card">
    <div className="flight-header">
        <h3>{flight.price} {flight.currency}</h3>
        <span>{flight.duration}</span>
    </div>
    
    <div className="flight-segment">
        <div className="airport">
            <strong>{flight.from}</strong>
            <span>{departureTime}</span>
        </div>
        <Plane />
        <div className="airport">
            <strong>{flight.to}</strong>
            <span>{arrivalTime}</span>
        </div>
    </div>
    
    <div className="carrier-info">
        {flight.airline} {flight.flightNumber}
    </div>
</div>
```

---

## Debugging Tips

### 1. تحقق من Console أولاً:
```
console.log('🔍 Searching flights:', request);
console.log(`✅ Found ${response.count} flights`);
console.error(`❌ [Backend Error]...`);
```

### 2. تحقق من Network Tab:
- Request payload
- Response status
- Response body

### 3. تحقق من Environment Variables:
```typescript
console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL);
```

---

## الملفات المتأثرة

- ✅ `src/services/backendAPI.ts` - جديد
- ✅ `src/pages/FlightsPage.tsx` - محدث
- ✅ `src/components/ChatInterface.tsx` - محدث
- ✅ `.env.example` - محدث

---

**التطبيق الآن يعمل بالكامل مع Backend! 🔌✅**
