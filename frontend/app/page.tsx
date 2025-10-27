'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import OverviewTab from '@/components/dashboard/OverviewTab';
import QuotesTab from '@/components/dashboard/QuotesTab';
import InvoicesTab from '@/components/dashboard/InvoicesTab';
import ComingSoonTab from '@/components/dashboard/ComingSoonTab';
import { stats, recentInvoices, recentQuotes, projects, upcomingTasks, menuItems } from '@/lib/data';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeTabLabel = menuItems.find(item => item.id === activeTab)?.label || 'Tableau de bord';

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab
            stats={stats}
            recentInvoices={recentInvoices}
            upcomingTasks={upcomingTasks}
            projects={projects}
          />
        );
      case 'quotes':
        return <QuotesTab quotes={recentQuotes} />;
      case 'invoices':
        return <InvoicesTab invoices={recentInvoices} />;
      case 'clients':
        return <ComingSoonTab title="Clients" />;
      case 'projects':
        return <ComingSoonTab title="Projets" />;
      case 'payments':
        return <ComingSoonTab title="Paiements" />;
      case 'expenses':
        return <ComingSoonTab title="Dépenses" />;
      case 'reports':
        return <ComingSoonTab title="Rapports" />;
      case 'settings':
        return <ComingSoonTab title="Paramètres" />;
      default:
        return <ComingSoonTab title={activeTabLabel} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="flex-1 overflow-auto">
        <Header 
          activeTabLabel={activeTabLabel} 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <main className="p-3 sm:p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
