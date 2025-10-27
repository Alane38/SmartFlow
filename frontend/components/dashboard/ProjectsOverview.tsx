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
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Projets en cours</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Voir tout</button>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Progression</p>
                  <div className="mt-1">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-900 font-medium">{project.progress}%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500">Budget</p>
                  <p className="font-medium text-gray-900">€{project.budget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Dépensé</p>
                  <p className="font-medium text-gray-900">€{project.spent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Échéance</p>
                  <p className="font-medium text-gray-900">{project.deadline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}