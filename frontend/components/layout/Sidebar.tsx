'use client';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'overview', label: 'Tableau de bord', icon: '📊' },
  { id: 'quotes', label: 'Devis', icon: '📋' },
  { id: 'invoices', label: 'Factures', icon: '🧾' },
  { id: 'deposits', label: 'Acomptes', icon: '💰' },
  { id: 'clients', label: 'Clients', icon: '👥' },
  { id: 'projects', label: 'Projets', icon: '📁' },
  { id: 'payments', label: 'Paiements', icon: '💳' },
  { id: 'expenses', label: 'Dépenses', icon: '💸' },
  { id: 'reports', label: 'Rapports', icon: '📈' },
  { id: 'settings', label: 'Paramètres', icon: '⚙️' },
];

export default function Sidebar({ isOpen, onToggle, activeTab, onTabChange }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        ${isOpen ? 'w-64' : 'w-20'} 
        bg-white shadow-lg transition-all duration-300 ease-in-out
        fixed lg:relative h-full z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`font-bold text-xl text-gray-900 ${!isOpen && 'hidden'} ${isOpen ? 'block' : 'hidden lg:block'}`}>
            SmartFlow
          </h1>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        <nav className="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onTabChange(item.id);
                    // Close sidebar on mobile after selection
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                  className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl mr-3 flex-shrink-0">{item.icon}</span>
                  {isOpen && (
                    <span className="font-medium text-sm lg:text-base">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {isOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t hidden lg:block">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm font-medium text-gray-900">Version Pro</p>
              <p className="text-xs text-gray-600 mt-1">Accès complet à toutes les fonctionnalités</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}