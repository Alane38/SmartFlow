'use client';

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
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Devis</h2>
        <div className="flex space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
            Exporter
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Nouveau Devis
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-700">5</p>
            <p className="text-sm text-yellow-600">En attente</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-700">12</p>
            <p className="text-sm text-green-600">Acceptés</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-700">3</p>
            <p className="text-sm text-red-600">Refusés</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-700">€28,500</p>
            <p className="text-sm text-blue-600">Valeur totale</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Numéro</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Projet</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Validité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{quote.id}</td>
                  <td className="px-6 py-4 text-gray-900">{quote.client}</td>
                  <td className="px-6 py-4 text-gray-600">{quote.project}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">€{quote.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">{quote.date}</td>
                  <td className="px-6 py-4 text-gray-600">{quote.validUntil}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      quote.status === 'accepté' 
                        ? 'bg-green-100 text-green-800'
                        : quote.status === 'refusé'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Voir</button>
                      <button className="text-gray-600 hover:text-gray-900">PDF</button>
                      {quote.status === 'accepté' && (
                        <button className="text-green-600 hover:text-green-900">Facturer</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}