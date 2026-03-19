import { useEffect } from 'react';
import { trackVisitor } from '../utils/visitorTracking';

export const useVisitorTracking = () => {
  useEffect(() => {
    trackVisitor();
  }, []);
};
