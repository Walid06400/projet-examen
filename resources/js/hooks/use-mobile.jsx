import { useState, useEffect } from 'react';

export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    // Vérification initiale
    checkScreenSize();
    
    // Ajouter un écouteur d'événement pour le redimensionnement de la fenêtre
    window.addEventListener('resize', checkScreenSize);
    
    // Nettoyage
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [breakpoint]);
  
  return isMobile;
}
