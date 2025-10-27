'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, DollarSign, TrendingUp } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  client: string;
  status: string;
  progress: number;
  budget: number;
  spent: number;
  deadline: string;
}

interface ProjectsOverviewProps {
  projects: Project[];
}

export default function ProjectsOverview({ projects }: ProjectsOverviewProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'terminé':
        return 'default';
      case 'en cours':
        return 'secondary';
      case 'en retard':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Projets en cours</CardTitle>
        <Button variant="outline" size="sm">
          Voir tout
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-base mb-1">{project.name}</h4>
                  <p className="text-sm text-muted-foreground">{project.client}</p>
                </div>
                <Badge variant={getStatusVariant(project.status)}>
                  {project.status}
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progression</span>
                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Budget</p>
                      <p className="text-sm font-medium">€{project.budget.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Dépensé</p>
                      <p className="text-sm font-medium">€{project.spent.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 md:col-span-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Échéance</p>
                      <p className="text-sm font-medium">{project.deadline}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}