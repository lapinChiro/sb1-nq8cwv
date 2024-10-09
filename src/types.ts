export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  listId: string;
}

export interface List {
  id: string;
  name: string;
}