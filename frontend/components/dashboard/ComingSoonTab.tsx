'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Construction, Mail } from 'lucide-react';

interface ComingSoonTabProps {
  title: string;
}

export default function ComingSoonTab({ title }: ComingSoonTabProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <Construction className="h-12 w-12 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">Section en développement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            La section <span className="font-semibold">{title}</span> sera bientôt disponible.
          </p>
          <p className="text-sm text-muted-foreground">
            Nous travaillons actuellement pour vous offrir la meilleure expérience possible.
          </p>
          <div className="flex flex-col gap-2 pt-4">
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Être notifié
            </Button>
            <p className="text-xs text-muted-foreground">
              Recevez une notification dès que cette section sera disponible.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}