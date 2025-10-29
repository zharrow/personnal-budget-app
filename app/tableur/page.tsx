'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Download,
  Filter,
  Search,
  ArrowUpDown,
  FileSpreadsheet,
} from 'lucide-react';
import { Transaction, Categorie } from '@/types';

// Données de démonstration
const mockTransactions: Transaction[] = [
  {
    id: '1',
    magasin: 'Carrefour',
    date: '2024-10-28',
    categorie: 'Alimentaire',
    articles: [
      { nom: 'Pain', prix: 1.5 },
      { nom: 'Lait', prix: 1.2 },
    ],
    total: 47.85,
    devise: 'EUR',
    createdAt: '2024-10-28T14:30:00Z',
    updatedAt: '2024-10-28T14:30:00Z',
  },
  {
    id: '2',
    magasin: 'Total Energies',
    date: '2024-10-27',
    categorie: 'Transport',
    articles: [{ nom: 'Essence SP95', prix: 65.4 }],
    total: 65.4,
    devise: 'EUR',
    createdAt: '2024-10-27T08:15:00Z',
    updatedAt: '2024-10-27T08:15:00Z',
  },
  {
    id: '3',
    magasin: 'Fnac',
    date: '2024-10-25',
    categorie: 'Électronique',
    articles: [
      { nom: 'Casque Bluetooth', prix: 89.99 },
      { nom: 'Câble USB-C', prix: 12.99 },
    ],
    total: 102.98,
    devise: 'EUR',
    createdAt: '2024-10-25T16:45:00Z',
    updatedAt: '2024-10-25T16:45:00Z',
  },
  {
    id: '4',
    magasin: 'Pharmacie',
    date: '2024-10-24',
    categorie: 'Santé',
    articles: [
      { nom: 'Doliprane', prix: 2.5 },
      { nom: 'Vitamine C', prix: 8.9 },
    ],
    total: 11.4,
    devise: 'EUR',
    createdAt: '2024-10-24T11:20:00Z',
    updatedAt: '2024-10-24T11:20:00Z',
  },
  {
    id: '5',
    magasin: 'Netflix',
    date: '2024-10-20',
    categorie: 'Loisirs',
    articles: [{ nom: 'Abonnement mensuel', prix: 13.49 }],
    total: 13.49,
    devise: 'EUR',
    createdAt: '2024-10-20T00:01:00Z',
    updatedAt: '2024-10-20T00:01:00Z',
  },
  {
    id: '6',
    magasin: 'Zara',
    date: '2024-10-18',
    categorie: 'Vêtements',
    articles: [
      { nom: 'T-shirt', prix: 19.95 },
      { nom: 'Jean', prix: 39.95 },
    ],
    total: 59.9,
    devise: 'EUR',
    createdAt: '2024-10-18T15:30:00Z',
    updatedAt: '2024-10-18T15:30:00Z',
  },
  {
    id: '7',
    magasin: 'Monoprix',
    date: '2024-10-15',
    categorie: 'Alimentaire',
    articles: [
      { nom: 'Fruits', prix: 8.5 },
      { nom: 'Légumes', prix: 6.3 },
      { nom: 'Viande', prix: 15.8 },
    ],
    total: 52.3,
    devise: 'EUR',
    createdAt: '2024-10-15T12:00:00Z',
    updatedAt: '2024-10-15T12:00:00Z',
  },
];

export default function TableurPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState<Categorie | 'Toutes'>('Toutes');
  const [sortBy, setSortBy] = useState<'date' | 'montant' | 'magasin'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const getCategorieColor = (categorie: string) => {
    const colors: Record<string, string> = {
      Alimentaire: 'bg-green-100 text-green-800 border-green-200',
      Transport: 'bg-blue-100 text-blue-800 border-blue-200',
      Logement: 'bg-purple-100 text-purple-800 border-purple-200',
      Loisirs: 'bg-pink-100 text-pink-800 border-pink-200',
      Santé: 'bg-red-100 text-red-800 border-red-200',
      Vêtements: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Électronique: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      Autre: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[categorie] || colors.Autre;
  };

  // Filtrage et tri
  const filteredAndSortedTransactions = transactions
    .filter((t) => {
      const matchesSearch =
        t.magasin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.articles.some((a) =>
          a.nom.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategorie =
        selectedCategorie === 'Toutes' || t.categorie === selectedCategorie;
      return matchesSearch && matchesCategorie;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'montant') {
        comparison = a.total - b.total;
      } else if (sortBy === 'magasin') {
        comparison = a.magasin.localeCompare(b.magasin);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const totalGeneral = filteredAndSortedTransactions.reduce(
    (sum, t) => sum + t.total,
    0
  );

  const handleSort = (column: 'date' | 'montant' | 'magasin') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const handleExport = () => {
    // TODO: Implémenter l'export CSV/Excel
    alert('Export à venir...');
  };

  const categories: (Categorie | 'Toutes')[] = [
    'Toutes',
    'Alimentaire',
    'Transport',
    'Logement',
    'Loisirs',
    'Santé',
    'Vêtements',
    'Électronique',
    'Autre',
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Tableur des transactions
            </h1>
            <p className="text-muted-foreground">
              Visualisez et analysez toutes vos dépenses
            </p>
          </div>

          <Button onClick={handleExport} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total des dépenses</p>
              <p className="text-3xl font-bold">
                {totalGeneral.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </p>
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Nombre de transactions</p>
              <p className="text-3xl font-bold">
                {filteredAndSortedTransactions.length}
              </p>
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Dépense moyenne</p>
              <p className="text-3xl font-bold">
                {(totalGeneral / filteredAndSortedTransactions.length || 0).toLocaleString(
                  'fr-FR',
                  {
                    style: 'currency',
                    currency: 'EUR',
                  }
                )}
              </p>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher un magasin ou un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategorie === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategorie(cat)}
                  className="whitespace-nowrap"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort('date')}
                      className="flex items-center gap-2 text-sm font-medium hover:text-primary"
                    >
                      Date
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort('magasin')}
                      className="flex items-center gap-2 text-sm font-medium hover:text-primary"
                    >
                      Magasin
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <span className="text-sm font-medium">Catégorie</span>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <span className="text-sm font-medium">Articles</span>
                  </th>
                  <th className="px-6 py-3 text-right">
                    <button
                      onClick={() => handleSort('montant')}
                      className="ml-auto flex items-center gap-2 text-sm font-medium hover:text-primary"
                    >
                      Montant
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm">
                      {new Date(transaction.date).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 shrink-0">
                          <FileSpreadsheet className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">{transaction.magasin}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={getCategorieColor(transaction.categorie)}
                      >
                        {transaction.categorie}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-muted-foreground">
                        {transaction.articles.length} article
                        {transaction.articles.length > 1 ? 's' : ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-base font-semibold">
                        {transaction.total.toLocaleString('fr-FR', {
                          style: 'currency',
                          currency: 'EUR',
                        })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border bg-muted/30">
                  <td colSpan={4} className="px-6 py-4 text-right font-semibold">
                    Total:
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-lg font-bold">
                      {totalGeneral.toLocaleString('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
