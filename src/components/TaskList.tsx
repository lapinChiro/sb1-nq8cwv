import React from 'react';
import { Task } from '../types';
import { CheckCircle, Circle, Edit, Trash } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
}) => {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between p-2 border rounded"
        >
          <div className="flex items-center space-x-2">
            <button onClick={() => onToggleComplete(task.id)}>
              {task.completed ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <Circle className="text-gray-400" />
              )}
            </button>
            <span className={task.completed ? 'line-through text-gray-500' : ''}>
              {task.title}
            </span>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => onEditTask(task)}>
              <Edit className="text-blue-500" />
            </button>
            <button onClick={() => onDeleteTask(task.id)}>
              <Trash className="text-red-500" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;