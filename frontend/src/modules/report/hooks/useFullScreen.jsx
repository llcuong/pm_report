import {useState, useEffect} from "react";

export const useFullscreen = () => {
    const [isFull, setIsFull] = useState(false);

    useEffect(() => {
        if (isFull) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isFull]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape' && isFull) setIsFull(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isFull]);

    return [isFull, setIsFull];
};