# نظام الترجمة (i18n) في تطبيق Safar

## نظرة عامة
يستخدم تطبيق Safar نظام `i18next` و `react-i18next` لإدارة الترجمات ودعم تعدد اللغات.

## الملفات الأساسية

### 1. `src/i18n.ts`
ملف تهيئة `i18next` الرئيسي الذي يحتوي على:
- تحميل ملفات الترجمة
- إعداد اللغة الافتراضية
- إعداد اللغة الاحتياطية (fallback)
- حفظ واستعادة اللغة المختارة من `localStorage`

### 2. `src/contexts/LanguageContext.tsx`
سياق React الذي يوفر:
- دالة `t()` للترجمة
- دالة `setLanguage()` لتغيير اللغة
- كائن `language` الحالي
- خاصية `dir` لاتجاه الكتابة (RTL/LTR)

### 3. `src/config/languages.ts`
قائمة اللغات المدعومة مع:
- رمز اللغة (code)
- اسم اللغة (name)
- علم الدولة (flag)
- اتجاه الكتابة (dir)

### 4. `src/translations/*.json`
ملفات JSON تحتوي على الترجمات لكل لغة:
- `ar.json` - العربية
- `en.json` - الإنجليزية

## كيفية استخدام الترجمة في المكونات

```typescript
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('welcome_desc')}</p>
    </div>
  );
}
```

## كيفية إضافة لغة جديدة

### الخطوة 1: إضافة اللغة إلى القائمة
في ملف `src/config/languages.ts`، أضف اللغة كالتالي:

```typescript
export const languages: Language[] = [
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' }, // لغة جديدة
];
```

### الخطوة 2: إنشاء ملف الترجمة
أنشئ ملف `src/translations/fr.json` (مثلاً للفرنسية):

```json
{
  "brand": "Safar",
  "slogan": "Votre assistant de voyage intelligent",
  "nav_chat": "Discussion",
  ...
}
```

**ملاحظة هامة**: يجب أن يحتوي ملف الترجمة الجديد على **نفس المفاتيح** الموجودة في `ar.json` و `en.json`.

### الخطوة 3: تحميل الترجمة في i18n
في ملف `src/i18n.ts`، أضف الاستيراد والتحميل:

```typescript
import fr from './translations/fr.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
  fr: { translation: fr }, // أضف هنا
};
```

### الخطوة 4: اختبار اللغة
1. احفظ التغييرات
2. أعد تشغيل الخادم (`npm run dev`)
3. افتح التطبيق وغيّر اللغة من القائمة المنسدلة

## قواعد مهمة

### 1. **لا تستخدم نصوص صريحة**
❌ **خطأ**:
```typescript
<h1>مرحباً بك في سفر</h1>
```

✅ **صحيح**:
```typescript
<h1>{t('welcome')}</h1>
```

### 2. **استخدم مفاتيح واضحة**
المفاتيح يجب أن تكون:
- بالإنجليزية
- وصفية
- باستخدام snake_case
- قصيرة قدر الإمكان

❌ **خطأ**: `text_for_the_welcome_message_on_homepage`
✅ **صحيح**: `welcome`

### 3. **استخدم المفاتيح بشكل متسق**
إذا كان لديك نفس النص في أكثر من مكان، استخدم نفس المفتاح.

### 4. **تجنب الترجمة الحرفية**
كل لغة لها سياقها الخاص. الترجمة يجب أن تكون طبيعية وليست حرفية.

## حفظ اللغة المختارة
اللغة المختارة محفوظة تلقائيًا في `localStorage` تحت المفتاح `safar_lang`. عند إعادة فتح التطبيق، سيتم استعادتها تلقائيًا.

## اتجاه الكتابة (RTL/LTR)
- **العربية والأردية**: `dir: 'rtl'` (من اليمين إلى اليسار)
- **باقي اللغات**: `dir: 'ltr'` (من اليسار إلى اليمين)

يتم تطبيق اتجاه الكتابة تلقائيًا على عنصر `<html>` عند تغيير اللغة.

## استكشاف الأخطاء

### المشكلة: النص يظهر كمفتاح (مثلاً: `welcome` بدلاً من "مرحباً")
**الحل**: تأكد من أن المفتاح موجود في ملف الترجمة (`ar.json` أو `en.json`).

### المشكلة: اللغة لا تتغير
**الحل**: 
1. تأكد من أن `LanguageProvider` يحيط بالتطبيق في `main.tsx`
2. تأكد من استدعاء `i18n.changeLanguage()` في `setLanguage`
3. امسح `localStorage` وأعد تحميل الصفحة

### المشكلة: اتجاه الكتابة لا يتغير
**الحل**: تأكد من تحديث `document.documentElement.dir` في `useEffect` داخل `LanguageContext`.

## مثال كامل
```typescript
import { useLanguage } from '../contexts/LanguageContext';

export const MyPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="my-page">
      <h1>{t('page_title')}</h1>
      <p>{t('page_description')}</p>
      <button>{t('submit_btn')}</button>
    </div>
  );
};
```

ملفات الترجمة:

**ar.json**:
```json
{
  "page_title": "عنوان الصفحة",
  "page_description": "وصف الصفحة",
  "submit_btn": "إرسال"
}
```

**en.json**:
```json
{
  "page_title": "Page Title",
  "page_description": "Page Description",
  "submit_btn": "Submit"
}
```

## الخلاصة
- استخدم `t('key')` لكل نص في التطبيق
- أضف الترجمات في ملفات JSON
- استخدم `useLanguage()` للوصول إلى دالة الترجمة
- احفظ المفاتيح بشكل وصفي وواضح
