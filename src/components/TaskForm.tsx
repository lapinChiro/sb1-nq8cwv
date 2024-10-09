import React, { useState } from 'react';
import { Task } from '../types';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id'>) => void;
  lists: { id: string; name: string }[];
  initialTask?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, lists, initialTask }) => {
  const [task, setTask] = useState<Omit<Task, 'id'>>({
    title: initialTask?.title || '',
    description: initialTask?.description || '',
    dueDate: initialTask?.dueDate || new Date(),
    priority: initialTask?.priority || 'medium',
    completed: initialTask?.completed || false,
    listId: initialTask?.listId || lists[0]?.id,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task);
    if (!initialTask) {
      setTask({
        title: '',
        description: '',
        dueDate: new Date(),
        priority: 'medium',
        completed: false,
        listId: lists[0]?.id,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        placeholder="Task title"
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        placeholder="Task description (optional)"
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        value={task.dueDate.toISOString().split('T')[0]}
        onChange={(e) => setTask({ ...task, dueDate: new Date(e.target.value) })}
        required
        className="w-full p-2 border rounded"
      />
      <select
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value as Task['priority'] })}
        className="w-full p-2 border rounded"
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <select
        value={task.listId}
        onChange={(e) => setTask({ ...task, listId: e.target.value })}
        className="w-full p-2 border rounded"
      >
        {lists.map((list) => (
          <option key={list.id} value={list.id}>
            {list.name}
          </option>
        ))}
      </select>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        {initialTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;