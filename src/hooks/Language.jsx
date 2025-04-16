// hooks/useLanguageDirection.js
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguageDirection = () => {
    const { i18n } = useTranslation();

    const userData = useMemo(() => {
        try {
            return JSON.parse(localStorage.getItem("currentUser"));
        } catch {
            return null;
        }
    }, []);

    // استرجاع اللغة والاتجاه من localStorage
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        const savedDirection = localStorage.getItem('direction');

        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }

        if (savedDirection) {
            document.body.dir = savedDirection;
        }
    }, [i18n]);

    const isRTL = i18n.language === 'ar';

    const toggleLanguage = () => {
        const newLang = i18n.language === 'ar' ? 'en' : 'ar';
        const newDirection = newLang === 'ar' ? 'rtl' : 'ltr';

        i18n.changeLanguage(newLang);
        document.body.dir = newDirection;
        localStorage.setItem('language', newLang);
        localStorage.setItem('direction', newDirection);
    };

    return {
        userData,
        isRTL,
        toggleLanguage
    };
};
