import React, { createContext, useContext, useState, useEffect } from 'react';
import { languages, defaultLanguage, Language } from '../config/languages';
import { translations } from '../locales/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (code: string) => void;
    t: (key: string) => string;
    dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize from localStorage ("safar_lang") or default, NO navigator.language
    const [language, setLanguageState] = useState<Language>(() => {
        const savedLangCode = localStorage.getItem('safar_lang');
        if (savedLangCode) {
            const foundLang = languages.find(l => l.code === savedLangCode);
            if (foundLang) return foundLang;
        }
        return defaultLanguage;
    });

    const setLanguage = (code: string) => {
        const selected = languages.find(l => l.code === code);
        if (selected) {
            setLanguageState(selected);
            localStorage.setItem('safar_lang', code);
            document.documentElement.dir = selected.dir;
            document.documentElement.lang = selected.code;
        }
    };

    const t = (key: string): string => {
        const langCode = language.code as keyof typeof translations;
        const translation = translations[langCode];
        
        if (translation && key in translation) {
            return (translation as any)[key];
        }
        
        // Fallback to English
        if (translations.en && key in translations.en) {
            return (translations.en as any)[key];
        }
        
        // Fallback to Arabic
        if (translations.ar && key in translations.ar) {
            return (translations.ar as any)[key];
        }
        
        // Return a user-friendly message instead of the key
        console.warn(`Translation missing for key: ${key} in language: ${langCode}`);
        return `[${key}]`;
    };

    useEffect(() => {
        // Apply direction and lang attribute on mount and change
        document.documentElement.dir = language.dir;
        document.documentElement.lang = language.code;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, dir: language.dir }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};