import React, { useState, useEffect } from 'react';
import { Task, List } from './types';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ListForm from './components/ListForm';
import { Search, Bell } from 'lucide-react';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lists, setLists] = useState<List[]>([{ id: 'default', name: 'Default' }]);
  const [activeList, setActiveList] = useState<string>('default');
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority'>('dueDate');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const checkDueTasks = () => {
      const now = new Date();
      const dueTasks = tasks.filter(
        (task) => !task.completed && new Date(task.dueDate) <= now
      );
      if (dueTasks.length > 0) {
        alert(`You have ${dueTasks.length} task(s) due!`);
      }
    };

    const intervalId = setInterval(checkDueTasks, 60000); // Check every minute
    return () => clearInterval(intervalId);
  }, [tasks]);

  const addTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = { ...newTask, id: Date.now().toString() };
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setEditingTask(null);
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addList = (listName: string) => {
    const newList: List = { id: Date.now().toString(), name: listName };
    setLists([...lists, newList]);
  };

  const filteredTasks = tasks
    .filter((task) => task.listId === activeList)
    .filter((task) => showCompleted || !task.completed)
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
    });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">TODO App</h1>
        
        <div className="mb-6">
          <ListForm onSubmit={addList} />
        </div>

        <div className="flex mb-6 space-x-4">
          {lists.map((list) => (
            <button
              key={list.id}
              onClick={() => setActiveList(list.id)}
              className={`px-4 py-2 rounded ${
                activeList === list.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {list.name}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className="w-full p-2 pl-10 border rounded"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'dueDate' | 'priority')}
              className="p-2 border rounded"
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
            </select>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={() => setShowCompleted(!showCompleted)}
              />
              <span>Show Completed</span>
            </label>
          </div>
          
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={toggleTaskComplete}
            onEditTask={setEditingTask}
            onDeleteTask={deleteTask}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            {editingTask ? 'Edit Task' : 'Add New Task'}
          </h2>
          <TaskForm
            onSubmit={editingTask ? updateTask : addTask}
            lists={lists}
            initialTask={editingTask || undefined}
          />
        </div>

        <div className="flex justify-end">
          <button className="flex items-center space-x-1 text-blue-500">
            <Bell />
            <span>Reminders Active</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;