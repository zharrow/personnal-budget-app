'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Upload, Check, Edit } from 'lucide-react';

interface ScannedData {
  magasin: string;
  date: string;
  categorie: string;
  total: number;
  devise: string;
  articles: { nom: string; prix: number }[];
}

export default function ScanPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setScannedData(null);
    }
  };

  const handleScan = async () => {
    if (!selectedFile) return;

    setIsScanning(true);

    // Simulation de l'OCR (à remplacer par une vraie API OCR)
    setTimeout(() => {
      setScannedData({
        magasin: 'Carrefour',
        date: new Date().toISOString().split('T')[0],
        categorie: 'Alimentaire',
        total: 47.85,
        devise: 'EUR',
        articles: [
          { nom: 'Pain complet', prix: 2.45 },
          { nom: 'Lait bio 1L', prix: 1.89 },
          { nom: 'Yaourts x8', prix: 3.20 },
          { nom: 'Pâtes 500g', prix: 1.15 },
          { nom: 'Tomates 1kg', prix: 3.80 },
        ],
      });
      setIsScanning(false);
    }, 2000);
  };

  const handleSave = () => {
    if (!scannedData) return;

    // TODO: Sauvegarder dans la base de données
    console.log('Saving transaction:', scannedData);
    alert('Transaction sauvegardée !');

    // Reset
    setSelectedFile(null);
    setPreviewUrl(null);
    setScannedData(null);
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Scanner un ticket de caisse
          </h1>
          <p className="text-muted-foreground">
            Téléchargez ou prenez en photo votre ticket pour l'analyser
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upload Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              1. Importer le ticket
            </h2>

            {!previewUrl ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Glissez-déposez votre ticket ici ou cliquez pour
                    sélectionner
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label htmlFor="file-upload">
                    <Button asChild variant="outline">
                      <span className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        Choisir un fichier
                      </span>
                    </Button>
                  </Label>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Ou
                    </span>
                  </div>
                </div>

                <Button className="w-full" variant="outline" disabled>
                  <Camera className="mr-2 h-4 w-4" />
                  Prendre une photo
                  <span className="ml-2 text-xs text-muted-foreground">
                    (Bientôt)
                  </span>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden border border-border">
                  <img
                    src={previewUrl}
                    alt="Aperçu du ticket"
                    className="w-full h-auto max-h-96 object-contain bg-muted"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleScan}
                    disabled={isScanning}
                    className="flex-1"
                  >
                    {isScanning ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Analyse en cours...
                      </>
                    ) : (
                      <>
                        <Camera className="mr-2 h-4 w-4" />
                        Analyser le ticket
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                      setScannedData(null);
                    }}
                    variant="outline"
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Results Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                2. Vérifier les données
              </h2>
              {scannedData && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  {isEditing ? 'Terminer' : 'Modifier'}
                </Button>
              )}
            </div>

            {!scannedData ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  Les données extraites apparaîtront ici après l'analyse
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label>Magasin</Label>
                    <Input
                      value={scannedData.magasin}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setScannedData({
                          ...scannedData,
                          magasin: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={scannedData.date}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setScannedData({
                            ...scannedData,
                            date: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Catégorie</Label>
                      <Input
                        value={scannedData.categorie}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setScannedData({
                            ...scannedData,
                            categorie: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Total</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        step="0.01"
                        value={scannedData.total}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setScannedData({
                            ...scannedData,
                            total: parseFloat(e.target.value),
                          })
                        }
                        className="flex-1"
                      />
                      <Input
                        value={scannedData.devise}
                        disabled={!isEditing}
                        className="w-20"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Articles ({scannedData.articles.length})</Label>
                    <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                      {scannedData.articles.map((article, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm p-2 rounded bg-muted"
                        >
                          <span>{article.nom}</span>
                          <span className="font-medium">
                            {article.prix.toFixed(2)} €
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button onClick={handleSave} className="w-full" size="lg">
                  <Check className="mr-2 h-4 w-4" />
                  Enregistrer la transaction
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
