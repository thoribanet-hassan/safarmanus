import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../config/languages';

export const LanguageSelector = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const dropdownStyle: React.CSSProperties = {
        position: 'absolute',
        top: '100%',
        right: '0',
        marginTop: '8px',
        width: '200px',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        zIndex: 9999,
        maxHeight: '300px',
        overflowY: 'auto',
        display: 'block'
    };

    const buttonStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        borderRadius: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'white',
        cursor: 'pointer',
        minWidth: '120px',
        transition: 'all 0.2s ease'
    };

    const itemStyle = (isSelected: boolean): React.CSSProperties => ({
        width: '100%',
        textAlign: 'right',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: isSelected ? '#eff6ff' : 'transparent',
        color: isSelected ? '#2563eb' : '#374151',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        borderRight: isSelected ? '2px solid #2563eb' : 'none',
        transition: 'all 0.2s ease'
    });

    return (
        <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button
                style={buttonStyle}
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }}
            >
                <span style={{ fontSize: '18px' }}>{language.flag}</span>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>{language.name}</span>
                <ChevronDown 
                    size={16} 
                    style={{ 
                        marginLeft: 'auto',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                    }} 
                />
            </button>

            {isOpen && (
                <div style={dropdownStyle}>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            style={itemStyle(language.code === lang.code)}
                            onClick={() => {
                                setLanguage(lang.code);
                                setIsOpen(false);
                            }}
                            onMouseEnter={(e) => {
                                if (language.code !== lang.code) {
                                    e.currentTarget.style.backgroundColor = '#f9fafb';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (language.code !== lang.code) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }
                            }}
                        >
                            <span style={{ fontSize: '18px' }}>{lang.flag}</span>
                            <span style={{ flex: '1', textAlign: 'right' }}>{lang.name}</span>
                            {language.code === lang.code && (
                                <span style={{ color: '#2563eb', fontSize: '14px' }}>✓</span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};