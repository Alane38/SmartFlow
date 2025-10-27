'use client';

interface Invoice {
  id: string;
  client: string;
  amount: number;
  status: string;
  date: string;
  dueDate: string;
  project: string;
}

interface InvoicesTabProps {
  invoices: Invoice[];
}

export default function InvoicesTab({ invoices }: InvoicesTabProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Gestion des Factures</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 order-2 sm:order-1">
            Exporter
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 order-1 sm:order-2">
            Nouvelle Facture
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-xs sm:text-sm text-gray-600">Total facturé</p>
          <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">€124,500</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-xs sm:text-sm text-gray-600">Payées</p>
          <p className="text-lg sm:text-2xl font-bold text-green-600 mt-1">€115,600</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-xs sm:text-sm text-gray-600">En attente</p>
          <p className="text-lg sm:text-2xl font-bold text-yellow-600 mt-1">€8,900</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-xs sm:text-sm text-gray-600">En retard</p>
          <p className="text-lg sm:text-2xl font-bold text-red-600 mt-1">€8,900</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Liste des factures</h3>
        
        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Facture</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Projet</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Émission</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Échéance</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-900">{invoice.id}</td>
                  <td className="px-4 sm:px-6 py-4 text-gray-900">{invoice.client}</td>
                  <td className="px-4 sm:px-6 py-4 text-gray-600">{invoice.project}</td>
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-900">€{invoice.amount.toLocaleString()}</td>
                  <td className="px-4 sm:px-6 py-4 text-gray-600">{invoice.date}</td>
                  <td className="px-4 sm:px-6 py-4 text-gray-600">{invoice.dueDate}</td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      invoice.status === 'payée' 
                        ? 'bg-green-100 text-green-800'
                        : invoice.status === 'en retard'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Voir</button>
                      <button className="text-gray-600 hover:text-gray-900">PDF</button>
                      {invoice.status !== 'payée' && (
                        <button className="text-green-600 hover:text-green-900">Paiement</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden divide-y divide-gray-200">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-900">{invoice.id}</p>
                  <p className="text-sm text-gray-500">{invoice.date}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  invoice.status === 'payée' 
                    ? 'bg-green-100 text-green-800'
                    : invoice.status === 'en retard'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {invoice.status}
                </span>
              </div>
              <div className="mb-2">
                <p className="font-medium text-gray-900">{invoice.client}</p>
                <p className="text-sm text-gray-500">{invoice.project}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium text-gray-900">€{invoice.amount.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Échéance {invoice.dueDate}</p>
              </div>
              <div className="flex space-x-3">
                <button className="text-blue-600 hover:text-blue-900 text-sm">Voir</button>
                <button className="text-gray-600 hover:text-gray-900 text-sm">PDF</button>
                {invoice.status !== 'payée' && (
                  <button className="text-green-600 hover:text-green-900 text-sm">Paiement</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}