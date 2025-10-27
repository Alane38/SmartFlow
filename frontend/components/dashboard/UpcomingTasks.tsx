'use client';

interface Task {
  id: number;
  title: string;
  type: string;
  priority: string;
  dueDate: string;
}

interface UpcomingTasksProps {
  tasks: Task[];
}

export default function UpcomingTasks({ tasks }: UpcomingTasksProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Tâches à venir</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <div key={task.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{task.title}</p>
                <div className="flex items-center mt-1 space-x-2">
                  <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                    task.priority === 'high' 
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.priority === 'high' ? 'Urgent' : 'Normal'}
                  </span>
                  <span className="text-xs text-gray-500">{task.dueDate}</span>
                </div>
              </div>
              <input type="checkbox" className="mt-1 rounded border-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}