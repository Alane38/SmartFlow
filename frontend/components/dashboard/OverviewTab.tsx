'use client';

import StatsCards from './StatsCards';
import QuickActions from './QuickActions';
import RecentInvoices from './RecentInvoices';
import UpcomingTasks from './UpcomingTasks';
import ProjectsOverview from './ProjectsOverview';

interface OverviewTabProps {
  stats: {
    revenue: number;
    unpaid: number;
    clients: number;
    profitMargin: number;
  };
  recentInvoices: Array<{
    id: string;
    client: string;
    amount: number;
    status: string;
    date: string;
    project: string;
  }>;
  upcomingTasks: Array<{
    id: number;
    title: string;
    type: string;
    priority: string;
    dueDate: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    client: string;
    status: string;
    progress: number;
    budget: number;
    spent: number;
    deadline: string;
  }>;
}

export default function OverviewTab({ stats, recentInvoices, upcomingTasks, projects }: OverviewTabProps) {
  return (
    <div className="space-y-8">
      <StatsCards stats={stats} />
      <QuickActions />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <RecentInvoices invoices={recentInvoices} />
        <UpcomingTasks tasks={upcomingTasks} />
      </div>

      <ProjectsOverview projects={projects} />
    </div>
  );
}