'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Receipt, 
  UserPlus, 
  CreditCard,
  FolderPlus,
  TrendingUp
} from 'lucide-react';

const quickActions = [
  {
    title: 'Nouveau devis',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Nouvelle facture',
    icon: Receipt,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    title: 'Nouveau client',
    icon: UserPlus,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    title: 'Saisir paiement',
    icon: CreditCard,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    title: 'Nouveau projet',
    icon: FolderPlus,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
  {
    title: 'Nouvelle dépense',
    icon: TrendingUp,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
];

export default function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Actions rapides</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto flex-col p-4 space-y-2 hover:bg-muted"
              >
                <div className={`p-2 rounded-lg ${action.bgColor}`}>
                  <Icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <span className="text-xs font-medium text-center">
                  {action.title}
                </span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}