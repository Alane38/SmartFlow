'use client';

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
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Projets en cours</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Voir tout</button>
      </div>
      <div className="p-4 sm:p-6">
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-2 sm:space-y-0">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-gray-900 truncate">{project.name}</h4>
                  <p className="text-sm text-gray-500">{project.client}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  project.status === 'terminé' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Progression</p>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-900 font-medium">{project.progress}%</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Budget</p>
                    <p className="font-medium text-gray-900">€{project.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Dépensé</p>
                    <p className="font-medium text-gray-900">€{project.spent.toLocaleString()}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-2">
                    <p className="text-gray-500">Échéance</p>
                    <p className="font-medium text-gray-900">{project.deadline}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}