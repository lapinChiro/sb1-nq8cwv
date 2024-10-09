import React, { useState } from 'react';

interface ListFormProps {
  onSubmit: (listName: string) => void;
}

const ListForm: React.FC<ListFormProps> = ({ onSubmit }) => {
  const [listName, setListName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (listName.trim()) {
      onSubmit(listName.trim());
      setListName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="New list name"
        className="flex-grow p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Add List
      </button>
    </form>
  );
};

export default ListForm;