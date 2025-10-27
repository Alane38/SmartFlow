'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  AlertCircle, 
  Users, 
  BarChart3 
} from 'lucide-react';

interface StatsCardsProps {
  stats: {
    revenue: number;
    unpaid: number;
    clients: number;
    profitMargin: number;
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Chiffre d'affaires
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{stats.revenue.toLocaleString()}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-green-500">+12.5%</span>
            <span>vs mois dernier</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Impayés en retard
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">€{stats.unpaid.toLocaleString()}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Badge variant="destructive" className="text-xs">
              3 factures
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Clients actifs
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.clients}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-green-500">+4</span>
            <span>ce mois</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Marge bénéficiaire
          </CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.profitMargin}%</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Badge variant="secondary" className="text-xs">
              Excellent
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}