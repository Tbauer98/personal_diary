import { useState, useEffect } from 'react';

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
      date: new Date().toLocaleDateString('de-DE'),
    };

    setEntries([newEntry, ...entries]);
    setTitle('');
    setText('');
  };

  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '0 20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>📖 Mein Persönliches Tagebuch</h1>

      <form onSubmit={handleAddEntry} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Titel für heute..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <textarea
          placeholder="Was ist heute passiert?"
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          style={{ padding: '12px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}
        >
          Eintrag Speichern
        </button>
      </form>

      <hr style={{ margin: '30px 0' }} />

      <h2>Meine Erinnerungen ({entries.length})</h2>

      {entries.length === 0 && <p style={{ color: '#888' }}>Noch keine Einträge vorhanden.</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {entries.map((entry) => (
          <div key={entry.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            <small style={{ color: '#888' }}>{entry.date}</small>
            <h3 style={{ margin: '5px 0' }}>{entry.title}</h3>
            <p style={{ whiteSpace: 'pre-wrap', color: '#333' }}>{entry.text}</p>
            <button
              onClick={() => handleDelete(entry.id)}
              style={{ backgroundColor: '#ff4d4f', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
            >
              Löschen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;