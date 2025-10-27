'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Download, FileText, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Quote {
  id: string;
  client: string;
  amount: number;
  status: string;
  date: string;
  validUntil: string;
  project: string;
}

interface QuotesTabProps {
  quotes: Quote[];
}

export default function QuotesTab({ quotes }: QuotesTabProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'accepté':
        return 'default';
      case 'refusé':
        return 'destructive';
      case 'en attente':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const stats = {
    pending: quotes.filter(q => q.status === 'en attente').length,
    accepted: quotes.filter(q => q.status === 'accepté').length,
    rejected: quotes.filter(q => q.status === 'refusé').length,
    totalValue: quotes.reduce((sum, q) => sum + q.amount, 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Gestion des Devis</h2>
          <p className="text-muted-foreground">Suivez et gérez tous vos devis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Exporter
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Nouveau Devis
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acceptés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refusés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valeur totale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quotes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des devis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numéro</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Projet</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Validité</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-medium">{quote.id}</TableCell>
                    <TableCell>{quote.client}</TableCell>
                    <TableCell className="text-muted-foreground">{quote.project}</TableCell>
                    <TableCell className="font-medium">€{quote.amount.toLocaleString()}</TableCell>
                    <TableCell>{quote.date}</TableCell>
                    <TableCell>{quote.validUntil}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(quote.status)}>
                        {quote.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Télécharger PDF
                          </DropdownMenuItem>
                          {quote.status === 'accepté' && (
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Facturer
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {quotes.map((quote) => (
              <div key={quote.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium">{quote.id}</p>
                    <p className="text-sm text-muted-foreground">{quote.date}</p>
                  </div>
                  <Badge variant={getStatusVariant(quote.status)}>
                    {quote.status}
                  </Badge>
                </div>
                <div className="mb-3">
                  <p className="font-medium">{quote.client}</p>
                  <p className="text-sm text-muted-foreground">{quote.project}</p>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <p className="font-medium text-lg">€{quote.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Valide jusqu'au {quote.validUntil}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  {quote.status === 'accepté' && (
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}