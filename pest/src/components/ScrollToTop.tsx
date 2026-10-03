import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
    const { pathname, key, hash } = useLocation();

    useEffect(() => {
        if (hash) return;
        window.scrollTo(0, 0);
    }, [pathname, key, hash]);

    return null;
};