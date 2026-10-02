import { useState, useEffect } from 'react';
import FormCard from './components/FormCard';
import EntriesList from './components/EntriesList';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('personal_diary_entries');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('personal_diary_entries', JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = (e) => {
    e.preventDefault();

    if (!title.trim() || !text.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: title,
      text: text,
      date: new Date().toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    };

    setEntries([newEntry, ...entries]);
    setTitle('');
    setText('');
  };

  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="app-container">
      <div className="main-content">
        
        <header className="header">
          <h1 className="header-title">📖 Mein Tagebuch</h1>
          <p className="header-subtitle">
            Halte deine täglichen Gedanken und Erinnerungen fest.
          </p>
        </header>

        <FormCard
          title={title}
          setTitle={setTitle}
          text={text}
          setText={setText}
          onAddEntry={handleAddEntry}
        />

        <EntriesList entries={entries} onDelete={handleDelete} />

      </div>
    </div>
  );
}

export default App;