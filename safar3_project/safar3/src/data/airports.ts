/**
 * مكتبة المطارات - Airport Library
 * قاعدة بيانات شاملة للمطارات السعودية والعالمية
 */

export interface AirportData {
    code: string;           // IATA Code
    nameAr: string[];       // الأسماء العربية
    nameEn: string[];       // الأسماء الإنجليزية
    city: string;           // المدينة
    country: string;        // الدولة
}

export const AIRPORTS: AirportData[] = [
    // ═══════════════════════════════════════════════════════════
    // مطارات المملكة العربية السعودية
    // ═══════════════════════════════════════════════════════════
    {
        code: 'RUH',
        nameAr: ['الرياض', 'رياض', 'مطار الملك خالد الدولي', 'مطار الرياض', 'الملك خالد'],
        nameEn: ['riyadh', 'king khalid', 'king khalid international', 'ruh'],
        city: 'الرياض',
        country: 'السعودية'
    },
    {
        code: 'JED',
        nameAr: ['جدة', 'جده', 'مطار الملك عبدالعزيز الدولي', 'مطار جدة', 'الملك عبدالعزيز'],
        nameEn: ['jeddah', 'jed', 'king abdulaziz', 'king abdulaziz international'],
        city: 'جدة',
        country: 'السعودية'
    },
    {
        code: 'DMM',
        nameAr: ['الدمام', 'دمام', 'مطار الملك فهد الدولي', 'مطار الدمام', 'الملك فهد'],
        nameEn: ['dammam', 'dmm', 'king fahd', 'king fahd international'],
        city: 'الدمام',
        country: 'السعودية'
    },
    {
        code: 'MED',
        nameAr: ['المدينة', 'المدينة المنورة', 'مطار الأمير محمد بن عبدالعزيز', 'مطار المدينة'],
        nameEn: ['madinah', 'medina', 'med', 'prince mohammad bin abdulaziz'],
        city: 'المدينة المنورة',
        country: 'السعودية'
    },
    {
        code: 'AHB',
        nameAr: ['أبها', 'ابها', 'مطار أبها الدولي', 'مطار أبها'],
        nameEn: ['abha', 'ahb'],
        city: 'أبها',
        country: 'السعودية'
    },
    {
        code: 'TIF',
        nameAr: ['الطائف', 'طائف', 'مطار الطائف الدولي', 'مطار الطائف'],
        nameEn: ['taif', 'tif'],
        city: 'الطائف',
        country: 'السعودية'
    },
    {
        code: 'TUU',
        nameAr: ['تبوك', 'مطار تبوك', 'مطار الأمير سلطان بن عبدالعزيز'],
        nameEn: ['tabuk', 'tuu'],
        city: 'تبوك',
        country: 'السعودية'
    },
    {
        code: 'ELQ',
        nameAr: ['القصيم', 'بريدة', 'مطار الأمير نايف بن عبدالعزيز', 'مطار القصيم'],
        nameEn: ['qassim', 'gassim', 'buraydah', 'elq'],
        city: 'بريدة',
        country: 'السعودية'
    },
    {
        code: 'AJF',
        nameAr: ['الجوف', 'سكاكا', 'مطار الجوف'],
        nameEn: ['jouf', 'al jouf', 'sakaka', 'ajf'],
        city: 'الجوف',
        country: 'السعودية'
    },
    {
        code: 'GIZ',
        nameAr: ['جيزان', 'جازان', 'مطار جيزان', 'مطار الملك عبدالله بن عبدالعزيز'],
        nameEn: ['jizan', 'jazan', 'gizan', 'giz'],
        city: 'جيزان',
        country: 'السعودية'
    },
    {
        code: 'YNB',
        nameAr: ['ينبع', 'مطار ينبع', 'مطار الأمير عبدالمحسن بن عبدالعزيز'],
        nameEn: ['yanbu', 'yenbo', 'ynb'],
        city: 'ينبع',
        country: 'السعودية'
    },

    // ═══════════════════════════════════════════════════════════
    // مطارات دول الخليج
    // ═══════════════════════════════════════════════════════════
    {
        code: 'DXB',
        nameAr: ['دبي', 'مطار دبي الدولي'],
        nameEn: ['dubai', 'dxb', 'dubai international'],
        city: 'دبي',
        country: 'الإمارات'
    },
    {
        code: 'AUH',
        nameAr: ['أبوظبي', 'ابوظبي', 'مطار أبوظبي الدولي'],
        nameEn: ['abu dhabi', 'abudhabi', 'auh'],
        city: 'أبوظبي',
        country: 'الإمارات'
    },
    {
        code: 'DOH',
        nameAr: ['الدوحة', 'قطر', 'مطار حمد الدولي'],
        nameEn: ['doha', 'qatar', 'hamad international', 'doh'],
        city: 'الدوحة',
        country: 'قطر'
    },
    {
        code: 'KWI',
        nameAr: ['الكويت', 'كويت', 'مطار الكويت الدولي'],
        nameEn: ['kuwait', 'kwi', 'kuwait international'],
        city: 'الكويت',
        country: 'الكويت'
    },
    {
        code: 'BAH',
        nameAr: ['البحرين', 'بحرين', 'مطار البحرين الدولي'],
        nameEn: ['bahrain', 'bah', 'bahrain international'],
        city: 'المنامة',
        country: 'البحرين'
    },
    {
        code: 'MCT',
        nameAr: ['مسقط', 'عمان', 'مطار مسقط الدولي'],
        nameEn: ['muscat', 'mct', 'muscat international'],
        city: 'مسقط',
        country: 'عمان'
    },

    // ═══════════════════════════════════════════════════════════
    // مطارات الشرق الأوسط
    // ═══════════════════════════════════════════════════════════
    {
        code: 'CAI',
        nameAr: ['القاهرة', 'قاهرة', 'مطار القاهرة الدولي'],
        nameEn: ['cairo', 'cai', 'cairo international'],
        city: 'القاهرة',
        country: 'مصر'
    },
    {
        code: 'AMM',
        nameAr: ['عمان', 'الأردن', 'مطار الملكة علياء الدولي'],
        nameEn: ['amman', 'jordan', 'queen alia', 'amm'],
        city: 'عمان',
        country: 'الأردن'
    },
    {
        code: 'BEY',
        nameAr: ['بيروت', 'لبنان', 'مطار رفيق الحريري الدولي'],
        nameEn: ['beirut', 'lebanon', 'bey', 'rafic hariri'],
        city: 'بيروت',
        country: 'لبنان'
    },
    {
        code: 'IST',
        nameAr: ['اسطنبول', 'استانبول', 'تركيا', 'مطار اسطنبول'],
        nameEn: ['istanbul', 'ist', 'istanbul airport'],
        city: 'إسطنبول',
        country: 'تركيا'
    },

    // ═══════════════════════════════════════════════════════════
    // مطارات أوروبا
    // ═══════════════════════════════════════════════════════════
    {
        code: 'LHR',
        nameAr: ['لندن', 'مطار هيثرو'],
        nameEn: ['london', 'heathrow', 'lhr'],
        city: 'لندن',
        country: 'بريطانيا'
    },
    {
        code: 'CDG',
        nameAr: ['باريس', 'مطار شارل ديغول'],
        nameEn: ['paris', 'charles de gaulle', 'cdg'],
        city: 'باريس',
        country: 'فرنسا'
    },
    {
        code: 'FRA',
        nameAr: ['فرانكفورت', 'المانيا'],
        nameEn: ['frankfurt', 'fra', 'germany'],
        city: 'فرانكفورت',
        country: 'ألمانيا'
    },

    // ═══════════════════════════════════════════════════════════
    // مطارات آسيا
    // ═══════════════════════════════════════════════════════════
    {
        code: 'BKK',
        nameAr: ['بانكوك', 'تايلاند'],
        nameEn: ['bangkok', 'thailand', 'bkk'],
        city: 'بانكوك',
        country: 'تايلاند'
    },
    {
        code: 'KUL',
        nameAr: ['كوالالمبور', 'ماليزيا'],
        nameEn: ['kuala lumpur', 'malaysia', 'kul'],
        city: 'كوالالمبور',
        country: 'ماليزيا'
    },
    {
        code: 'SIN',
        nameAr: ['سنغافورة'],
        nameEn: ['singapore', 'sin'],
        city: 'سنغافورة',
        country: 'سنغافورة'
    },

    // ═══════════════════════════════════════════════════════════
    // مطارات أمريكا
    // ═══════════════════════════════════════════════════════════
    {
        code: 'JFK',
        nameAr: ['نيويورك', 'مطار جون كينيدي'],
        nameEn: ['new york', 'jfk', 'john f kennedy'],
        city: 'نيويورك',
        country: 'أمريكا'
    },
    {
        code: 'LAX',
        nameAr: ['لوس انجلوس', 'لوس أنجلوس'],
        nameEn: ['los angeles', 'lax'],
        city: 'لوس انجلوس',
        country: 'أمريكا'
    },
];

/**
 * البحث عن كود IATA من اسم المدينة أو المطار
 */
export const findAirportCode = (query: string): string | null => {
    const normalizedQuery = query.toLowerCase().trim();

    // إذا كان الإدخال هو كود IATA مباشرة (3 أحرف)
    if (/^[A-Z]{3}$/i.test(normalizedQuery)) {
        return normalizedQuery.toUpperCase();
    }

    // البحث في قاعدة البيانات
    for (const airport of AIRPORTS) {
        // البحث في الأسماء العربية
        for (const name of airport.nameAr) {
            if (normalizedQuery.includes(name.toLowerCase()) || name.toLowerCase().includes(normalizedQuery)) {
                return airport.code;
            }
        }

        // البحث في الأسماء الإنجليزية
        for (const name of airport.nameEn) {
            if (normalizedQuery.includes(name.toLowerCase()) || name.toLowerCase().includes(normalizedQuery)) {
                return airport.code;
            }
        }
    }

    return null;
};

/**
 * الحصول على معلومات المطار من الكود
 */
export const getAirportInfo = (code: string): AirportData | null => {
    return AIRPORTS.find(airport => airport.code === code.toUpperCase()) || null;
};

/**
 * الحصول على اسم المطار بالعربية
 */
export const getAirportNameAr = (code: string): string => {
    const airport = getAirportInfo(code);
    return airport ? airport.city : code;
};

/**
 * الحصول على اسم المطار بالإنجليزية
 */
export const getAirportNameEn = (code: string): string => {
    const airport = getAirportInfo(code);
    return airport ? airport.city : code;
};
