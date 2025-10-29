'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Shield,
  Plus,
  Calendar,
  Store,
  Package,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { Garantie } from '@/types';

// Données de démonstration
const mockGaranties: Garantie[] = [
  {
    id: '1',
    magasin: 'Darty',
    produit: 'Lave-linge Samsung 8kg',
    dateAchat: '2023-01-15',
    dureeGarantie: '2 ans',
    finGarantie: '2025-01-15',
    montant: 599.0,
    numeroSerie: 'SN-8847392',
    typeGarantie: 'constructeur',
    statut: 'active',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-01-15T10:00:00Z',
  },
  {
    id: '2',
    magasin: 'Boulanger',
    produit: 'MacBook Pro 14"',
    dateAchat: '2024-06-20',
    dureeGarantie: '1 an',
    finGarantie: '2025-06-20',
    montant: 2299.0,
    numeroSerie: 'C02YT2Q8JG5H',
    typeGarantie: 'constructeur',
    statut: 'active',
    createdAt: '2024-06-20T14:30:00Z',
    updatedAt: '2024-06-20T14:30:00Z',
  },
  {
    id: '3',
    magasin: 'Ikea',
    produit: 'Canapé Kivik',
    dateAchat: '2024-11-10',
    dureeGarantie: '10 ans',
    finGarantie: '2034-11-10',
    montant: 899.0,
    typeGarantie: 'magasin',
    statut: 'active',
    notes: 'Garantie structure et ressorts',
    createdAt: '2024-11-10T11:20:00Z',
    updatedAt: '2024-11-10T11:20:00Z',
  },
  {
    id: '4',
    magasin: 'Fnac',
    produit: 'iPhone 13',
    dateAchat: '2022-09-01',
    dureeGarantie: '2 ans',
    finGarantie: '2024-09-01',
    montant: 859.0,
    numeroSerie: 'DMPR2QT9Q1MN',
    typeGarantie: 'extension',
    statut: 'expiree',
    createdAt: '2022-09-01T16:00:00Z',
    updatedAt: '2024-09-01T00:00:00Z',
  },
];

export default function GarantiesPage() {
  const [garanties, setGaranties] = useState<Garantie[]>(mockGaranties);
  const [filter, setFilter] = useState<'all' | 'active' | 'expirant_bientot' | 'expiree'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatutBadge = (statut: Garantie['statut']) => {
    switch (statut) {
      case 'active':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Active
          </Badge>
        );
      case 'expirant_bientot':
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            <AlertCircle className="mr-1 h-3 w-3" />
            Expire bientôt
          </Badge>
        );
      case 'expiree':
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Expirée
          </Badge>
        );
    }
  };

  const getDaysRemaining = (finGarantie: string) => {
    const end = new Date(finGarantie);
    const now = new Date();
    const diff = Math.floor((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const filteredGaranties = garanties.filter((g) => {
    if (filter === 'all') return true;
    return g.statut === filter;
  });

  const stats = {
    total: garanties.length,
    active: garanties.filter((g) => g.statut === 'active').length,
    expirant: garanties.filter((g) => g.statut === 'expirant_bientot').length,
    expiree: garanties.filter((g) => g.statut === 'expiree').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Gestion des garanties
            </h1>
            <p className="text-muted-foreground">
              Suivez vos garanties et recevez des alertes avant expiration
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une garantie
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nouvelle garantie</DialogTitle>
                <DialogDescription>
                  Ajoutez les informations de garantie d'un produit
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="magasin">Magasin</Label>
                    <Input id="magasin" placeholder="Darty, Fnac..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="produit">Produit</Label>
                    <Input id="produit" placeholder="Nom du produit" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateAchat">Date d'achat</Label>
                    <Input id="dateAchat" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="montant">Montant</Label>
                    <Input id="montant" type="number" step="0.01" placeholder="0.00" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dureeGarantie">Durée de garantie</Label>
                    <Input id="dureeGarantie" placeholder="2 ans" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numeroSerie">Numéro de série</Label>
                    <Input id="numeroSerie" placeholder="Optionnel" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input id="notes" placeholder="Informations supplémentaires" />
                </div>

                <Button className="w-full">
                  Enregistrer la garantie
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Actives</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expirant</p>
                <p className="text-2xl font-bold">{stats.expirant}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50">
                <Calendar className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expirées</p>
                <p className="text-2xl font-bold">{stats.expiree}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            Toutes
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            onClick={() => setFilter('active')}
          >
            Actives
          </Button>
          <Button
            variant={filter === 'expirant_bientot' ? 'default' : 'outline'}
            onClick={() => setFilter('expirant_bientot')}
          >
            Expirant bientôt
          </Button>
          <Button
            variant={filter === 'expiree' ? 'default' : 'outline'}
            onClick={() => setFilter('expiree')}
          >
            Expirées
          </Button>
        </div>

        {/* Garanties List */}
        <div className="grid gap-4">
          {filteredGaranties.map((garantie) => {
            const daysRemaining = getDaysRemaining(garantie.finGarantie);

            return (
              <Card key={garantie.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                      <Package className="h-6 w-6 text-primary" />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">
                            {garantie.produit}
                          </h3>
                          {getStatutBadge(garantie.statut)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Store className="h-4 w-4" />
                            {garantie.magasin}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Acheté le{' '}
                            {new Date(garantie.dateAchat).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Durée</p>
                          <p className="font-medium">{garantie.dureeGarantie}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Expire le</p>
                          <p className="font-medium">
                            {new Date(garantie.finGarantie).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            {daysRemaining > 0 ? 'Jours restants' : 'Expirée depuis'}
                          </p>
                          <p className={`font-medium ${
                            daysRemaining < 30 && daysRemaining > 0
                              ? 'text-orange-600'
                              : daysRemaining <= 0
                              ? 'text-gray-600'
                              : ''
                          }`}>
                            {daysRemaining > 0
                              ? `${daysRemaining} jours`
                              : `${Math.abs(daysRemaining)} jours`}
                          </p>
                        </div>
                      </div>

                      {garantie.numeroSerie && (
                        <p className="text-xs text-muted-foreground">
                          N° série: {garantie.numeroSerie}
                        </p>
                      )}

                      {garantie.notes && (
                        <p className="text-sm text-muted-foreground">
                          {garantie.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      {garantie.montant.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
