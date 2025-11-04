'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Parametres {
  id: string;
  nom_entreprise: string;
  forme_juridique?: string;
  siret?: string;
  email: string;
  telephone?: string;
  tjm_defaut?: number;
  tva_taux_defaut: number;
}

interface Client {
  id: string;
  nom: string;
  prenom?: string;
  entreprise?: string;
  email: string;
  telephone?: string;
  siret?: string;
}

interface Devis {
  id: string;
  numero: string;
  objet: string;
  type_tarification: string;
  statut: string;
  montant_ht: number;
  montant_ttc: number;
  date_creation: string;
  date_validite: string;
  client: Client;
  lignes: LigneDevis[];
}

interface LigneDevis {
  id: string;
  type_ligne: string;
  description: string;
  quantite: number;
  unite: string;
  prix_unitaire: number;
  total_ht: number;
}

interface Facture {
  id: string;
  numero: string;
  objet: string;
  type_facture: string;
  statut: string;
  montant_ht: number;
  montant_ttc: number;
  montant_paye: number;
  date_emission: string;
  date_echeance: string;
  client: Client;
  lignes: LigneFacture[];
  paiements: Paiement[];
}

interface LigneFacture {
  id: string;
  type_ligne: string;
  description: string;
  quantite: number;
  unite: string;
  prix_unitaire: number;
  total_ht: number;
}

interface Paiement {
  id: string;
  montant: number;
  mode_paiement: string;
  date_paiement: string;
  reference?: string;
}

export default function TestDataPage() {
  const [data, setData] = useState<{
    parametres?: Parametres[];
    clients?: Client[];
    devis?: Devis[];
    factures?: Facture[];
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const baseUrl = 'http://localhost:4000';
      
      const [parametresRes, clientsRes, devisRes, facturesRes] = await Promise.all([
        fetch(`${baseUrl}/parametres`),
        fetch(`${baseUrl}/clients`),
        fetch(`${baseUrl}/devis`),
        fetch(`${baseUrl}/factures`)
      ]);

      const [parametres, clients, devis, factures] = await Promise.all([
        parametresRes.ok ? parametresRes.json() : [],
        clientsRes.ok ? clientsRes.json() : [],
        devisRes.ok ? devisRes.json() : [],
        facturesRes.ok ? facturesRes.json() : []
      ]);

      setData({ parametres, clients, devis, factures });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Chargement des données...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">Erreur: {error}</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'BROUILLON': return 'secondary';
      case 'ENVOYE': return 'default';
      case 'ACCEPTE': return 'default';
      case 'REFUSE': return 'destructive';
      case 'EXPIRE': return 'secondary';
      case 'EN_ATTENTE': return 'secondary';
      case 'PAYEE': return 'default';
      case 'PAYEE_PARTIELLEMENT': return 'secondary';
      case 'EN_RETARD': return 'destructive';
      case 'ANNULEE': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Test des données API</h1>
        <p className="text-muted-foreground">
          Visualisation de toutes les données provenant du backend
        </p>
      </div>

      <Tabs defaultValue="parametres" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="parametres">Paramètres</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="devis">Devis</TabsTrigger>
          <TabsTrigger value="factures">Factures</TabsTrigger>
        </TabsList>

        <TabsContent value="parametres">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de l&apos;entreprise ({data.parametres?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {data.parametres?.map((param) => (
                <div key={param.id} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <strong>Nom:</strong> {param.nom_entreprise}
                    </div>
                    <div>
                      <strong>Email:</strong> {param.email}
                    </div>
                    <div>
                      <strong>SIRET:</strong> {param.siret || 'N/A'}
                    </div>
                    <div>
                      <strong>TJM défaut:</strong> {param.tjm_defaut || 'N/A'}€
                    </div>
                    <div>
                      <strong>TVA défaut:</strong> {param.tva_taux_defaut}%
                    </div>
                    <div>
                      <strong>Téléphone:</strong> {param.telephone || 'N/A'}
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients">
          <Card>
            <CardHeader>
              <CardTitle>Clients ({data.clients?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.clients?.map((client) => (
                  <div key={client.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <strong>Nom:</strong> {client.prenom} {client.nom}
                      </div>
                      <div>
                        <strong>Entreprise:</strong> {client.entreprise || 'N/A'}
                      </div>
                      <div>
                        <strong>Email:</strong> {client.email}
                      </div>
                      <div>
                        <strong>Téléphone:</strong> {client.telephone || 'N/A'}
                      </div>
                      <div>
                        <strong>SIRET:</strong> {client.siret || 'N/A'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devis">
          <Card>
            <CardHeader>
              <CardTitle>Devis ({data.devis?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {data.devis?.map((devis) => (
                  <div key={devis.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">{devis.numero} - {devis.objet}</h3>
                        <p className="text-sm text-muted-foreground">
                          Client: {devis.client.prenom} {devis.client.nom} ({devis.client.entreprise})
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusColor(devis.statut)}>
                          {devis.statut}
                        </Badge>
                        <p className="text-sm mt-1">{devis.type_tarification}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <strong>Création:</strong> {new Date(devis.date_creation).toLocaleDateString()}
                      </div>
                      <div>
                        <strong>Validité:</strong> {new Date(devis.date_validite).toLocaleDateString()}
                      </div>
                      <div>
                        <strong>Montant HT:</strong> {devis.montant_ht}€
                      </div>
                      <div>
                        <strong>Montant TTC:</strong> {devis.montant_ttc}€
                      </div>
                    </div>

                    {devis.lignes && devis.lignes.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Lignes de devis:</h4>
                        <div className="space-y-2">
                          {devis.lignes.map((ligne) => (
                            <div key={ligne.id} className="bg-gray-50 p-2 rounded">
                              <div className="flex justify-between">
                                <span>{ligne.description}</span>
                                <span>{ligne.total_ht}€</span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {ligne.quantite} {ligne.unite} × {ligne.prix_unitaire}€
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="factures">
          <Card>
            <CardHeader>
              <CardTitle>Factures ({data.factures?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {data.factures?.map((facture) => (
                  <div key={facture.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">{facture.numero} - {facture.objet}</h3>
                        <p className="text-sm text-muted-foreground">
                          Client: {facture.client.prenom} {facture.client.nom} ({facture.client.entreprise})
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusColor(facture.statut)}>
                          {facture.statut}
                        </Badge>
                        <p className="text-sm mt-1">{facture.type_facture}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <strong>Émission:</strong> {new Date(facture.date_emission).toLocaleDateString()}
                      </div>
                      <div>
                        <strong>Échéance:</strong> {new Date(facture.date_echeance).toLocaleDateString()}
                      </div>
                      <div>
                        <strong>Montant HT:</strong> {facture.montant_ht}€
                      </div>
                      <div>
                        <strong>Montant TTC:</strong> {facture.montant_ttc}€
                      </div>
                      <div>
                        <strong>Montant payé:</strong> {facture.montant_paye}€
                      </div>
                      <div>
                        <strong>Reste à payer:</strong> {facture.montant_ttc - facture.montant_paye}€
                      </div>
                    </div>

                    {facture.lignes && facture.lignes.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Lignes de facture:</h4>
                        <div className="space-y-2">
                          {facture.lignes.map((ligne) => (
                            <div key={ligne.id} className="bg-gray-50 p-2 rounded">
                              <div className="flex justify-between">
                                <span>{ligne.description}</span>
                                <span>{ligne.total_ht}€</span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {ligne.quantite} {ligne.unite} × {ligne.prix_unitaire}€
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {facture.paiements && facture.paiements.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Paiements:</h4>
                        <div className="space-y-2">
                          {facture.paiements.map((paiement) => (
                            <div key={paiement.id} className="bg-green-50 p-2 rounded">
                              <div className="flex justify-between">
                                <span>{paiement.mode_paiement}</span>
                                <span>{paiement.montant}€</span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(paiement.date_paiement).toLocaleDateString()}
                                {paiement.reference && ` - Réf: ${paiement.reference}`}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}