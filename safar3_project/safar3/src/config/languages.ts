export interface Language {
    code: string;
    name: string;
    flag: string;
    dir: 'rtl' | 'ltr';
}

export const languages: Language[] = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
    { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
    { code: 'ja', name: '日本語', flag: '🇯🇵', dir: 'ltr' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
    { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
    { code: 'pt', name: 'Português', flag: '🇧🇷', dir: 'ltr' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
    { code: 'zh', name: '中文', flag: '🇨🇳', dir: 'ltr' },
    { code: 'ko', name: '한국어', flag: '🇰🇷', dir: 'ltr' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰', dir: 'rtl' },
    { code: 'fa', name: 'فارسی', flag: '🇮🇷', dir: 'rtl' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩', dir: 'ltr' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr' },
    { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾', dir: 'ltr' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭', dir: 'ltr' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪', dir: 'ltr' },
    { code: 'no', name: 'Norsk', flag: '🇳🇴', dir: 'ltr' },
    { code: 'da', name: 'Dansk', flag: '🇩🇰', dir: 'ltr' },
    { code: 'fi', name: 'Suomi', flag: '🇫🇮', dir: 'ltr' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱', dir: 'ltr' },
    { code: 'cs', name: 'Čeština', flag: '🇨🇿', dir: 'ltr' },
    { code: 'hu', name: 'Magyar', flag: '🇭🇺', dir: 'ltr' },
    { code: 'ro', name: 'Română', flag: '🇷🇴', dir: 'ltr' },
    { code: 'bg', name: 'Български', flag: '🇧🇬', dir: 'ltr' },
    { code: 'hr', name: 'Hrvatski', flag: '🇭🇷', dir: 'ltr' },
    { code: 'sr', name: 'Српски', flag: '🇷🇸', dir: 'ltr' },
    { code: 'sk', name: 'Slovenčina', flag: '🇸🇰', dir: 'ltr' },
    { code: 'sl', name: 'Slovenščina', flag: '🇸🇮', dir: 'ltr' },
    { code: 'et', name: 'Eesti', flag: '🇪🇪', dir: 'ltr' },
    { code: 'lv', name: 'Latviešu', flag: '🇱🇻', dir: 'ltr' },
    { code: 'lt', name: 'Lietuvių', flag: '🇱🇹', dir: 'ltr' },
    { code: 'el', name: 'Ελληνικά', flag: '🇬🇷', dir: 'ltr' },
    { code: 'he', name: 'עברית', flag: '🇮🇱', dir: 'rtl' },
    { code: 'sw', name: 'Kiswahili', flag: '🇰🇪', dir: 'ltr' },
    { code: 'am', name: 'አማርኛ', flag: '🇪🇹', dir: 'ltr' },
];

export const defaultLanguage = languages[0]; // Arabic
