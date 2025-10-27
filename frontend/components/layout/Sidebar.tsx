'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  FileText, 
  Receipt, 
  DollarSign, 
  Users, 
  FolderOpen, 
  CreditCard, 
  TrendingUp, 
  FileBarChart, 
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobile: boolean;
}

const menuItems = [
  { id: 'overview', label: 'Tableau de bord', icon: LayoutDashboard },
  { id: 'quotes', label: 'Devis', icon: FileText },
  { id: 'invoices', label: 'Factures', icon: Receipt },
  { id: 'deposits', label: 'Acomptes', icon: DollarSign },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'projects', label: 'Projets', icon: FolderOpen },
  { id: 'payments', label: 'Paiements', icon: CreditCard },
  { id: 'expenses', label: 'Dépenses', icon: TrendingUp },
  { id: 'reports', label: 'Rapports', icon: FileBarChart },
  { id: 'settings', label: 'Paramètres', icon: Settings },
];

function SidebarContent({ activeTab, onTabChange, isMobile, onMobileClose, isCollapsed }: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobile: boolean;
  onMobileClose?: () => void;
  isCollapsed?: boolean;
}) {
  const handleItemClick = (itemId: string) => {
    onTabChange(itemId);
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-6">
        <h1 className={`text-xl font-bold ${isCollapsed ? 'hidden' : 'block'}`}>SmartFlow</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={onMobileClose}
          className="hidden md:flex"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleItemClick(item.id)}
              >
                <Icon className={`${isCollapsed ? '' : 'mr-3'} h-4 w-4`} />
                {!isCollapsed && item.label}
                {!isCollapsed && item.id === 'quotes' && (
                  <Badge variant="secondary" className="ml-auto">
                    3
                  </Badge>
                )}
                {!isCollapsed && item.id === 'invoices' && (
                  <Badge variant="secondary" className="ml-auto">
                    7
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>
      
      {/* Footer */}
      <div className="border-t p-4">
        <div className={`rounded-lg bg-muted p-3 ${isCollapsed ? 'p-2' : ''}`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!isCollapsed && (
              <div>
                <p className="text-sm font-medium">Version Pro</p>
                <p className="text-xs text-muted-foreground">
                  Accès complet
                </p>
              </div>
            )}
            <Badge variant="outline" className={isCollapsed ? 'text-xs' : ''}>
              {isCollapsed ? 'P' : 'PRO'}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ isOpen, onToggle, activeTab, onTabChange, isMobile }: SidebarProps) {
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onToggle}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent
            activeTab={activeTab}
            onTabChange={onTabChange}
            isMobile={isMobile}
            onMobileClose={onToggle}
          />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className={`
      hidden md:flex h-screen ${isOpen ? 'w-64' : 'w-16'} flex-col border-r bg-background
      transition-all duration-300
    `}>
      <SidebarContent
        activeTab={activeTab}
        onTabChange={onTabChange}
        isMobile={isMobile}
        isCollapsed={!isOpen}
        onMobileClose={onToggle}
      />
    </div>
  );
}