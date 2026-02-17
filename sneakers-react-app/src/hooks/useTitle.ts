import { useEffect } from 'react';
import { APP_NAME } from '../data/constants';

export const useTitle = (title?: string) => {
    useEffect(() => {
        document.title = title ? `${title} | ${APP_NAME}` : APP_NAME;
    }, [title]);
};
