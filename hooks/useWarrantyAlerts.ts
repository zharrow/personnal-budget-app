'use client';

import { useEffect } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { Garantie } from '@/types';

export function useWarrantyAlerts(garanties: Garantie[]) {
  const { addNotification } = useNotifications();

  useEffect(() => {
    const checkWarranties = () => {
      const now = new Date();

      garanties.forEach((garantie) => {
        const endDate = new Date(garantie.finGarantie);
        const daysRemaining = Math.floor(
          (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );

        // Alerte 30 jours avant
        if (daysRemaining === 30) {
          addNotification({
            type: 'garantie_expiration',
            titre: 'Garantie expire dans 30 jours',
            message: `La garantie de "${garantie.produit}" expire le ${endDate.toLocaleDateString('fr-FR')}`,
            relatedId: garantie.id,
          });
        }

        // Alerte 7 jours avant
        if (daysRemaining === 7) {
          addNotification({
            type: 'garantie_expiration',
            titre: 'Garantie expire bientôt !',
            message: `La garantie de "${garantie.produit}" expire dans 7 jours`,
            relatedId: garantie.id,
          });
        }

        // Alerte le jour même
        if (daysRemaining === 0) {
          addNotification({
            type: 'garantie_expiration',
            titre: 'Garantie expire aujourd\'hui',
            message: `La garantie de "${garantie.produit}" expire aujourd'hui`,
            relatedId: garantie.id,
          });
        }
      });
    };

    // Vérifier immédiatement au chargement
    checkWarranties();

    // Vérifier toutes les heures
    const interval = setInterval(checkWarranties, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [garanties, addNotification]);
}

// Hook pour simuler des alertes de démonstration
export function useWarrantyAlertsDemo(garanties: Garantie[]) {
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Ajouter quelques notifications de démonstration au chargement
    const timeout = setTimeout(() => {
      if (garanties.length > 0) {
        // Simuler une alerte pour la première garantie
        const garantie = garanties[0];
        addNotification({
          type: 'garantie_expiration',
          titre: 'Garantie expire dans 45 jours',
          message: `La garantie de "${garantie.produit}" (${garantie.magasin}) expire bientôt. Pensez à vérifier les conditions.`,
          relatedId: garantie.id,
        });
      }

      // Ajouter une notification d'objectif atteint
      setTimeout(() => {
        addNotification({
          type: 'objectif_atteint',
          titre: 'Objectif d\'épargne atteint !',
          message: 'Félicitations ! Vous avez atteint votre objectif d\'épargne de 500€',
        });
      }, 2000);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [garanties, addNotification]);
}
