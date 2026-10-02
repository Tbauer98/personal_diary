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
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '40px 20px', fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        
        {/* Cabeçalho */}
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.2rem', color: '#1f2937', margin: '0 0 8px 0', fontWeight: '700' }}>
            📖 Mein Tagebuch
          </h1>
          <p style={{ color: '#6b7280', margin: 0, fontSize: '0.95rem' }}>
            Halte deine täglichen Gedanken und Erinnerungen fest.
          </p>
        </header>

        {/* Card do Formulário */}
        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#374151', marginTop: 0, marginBottom: '16px', fontWeight: '600' }}>
            ✍️ Neuer Eintrag
          </h2>

          <form onSubmit={handleAddEntry} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input
              type="text"
              placeholder="Titel für heute..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ padding: '12px 14px', fontSize: '15px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s' }}
            />
            <textarea
              placeholder="Was ist heute passiert? Schreiben Sie Ihre Gedanken auf..."
              rows="4"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ padding: '12px 14px', fontSize: '15px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', resize: 'vertical' }}
            />
            <button
              type="submit"
              style={{ padding: '12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' }}
            >
              Eintrag Speichern
            </button>
          </form>
        </div>

        {/* Lista de Memórias */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.3rem', color: '#1f2937', margin: 0, fontWeight: '600' }}>
              📚 Meine Erinnerungen
            </h2>
            <span style={{ backgroundColor: '#e5e7eb', color: '#374151', padding: '2px 10px', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600' }}>
              {entries.length}
            </span>
          </div>

          {entries.length === 0 && (
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', textAlign: 'center', color: '#9ca3af', border: '1px dashed #d1d5db' }}>
              <p style={{ margin: 0, fontSize: '1rem' }}>Noch keine Einträge vorhanden.</p>
              <small style={{ display: 'block', marginTop: '6px' }}>Schreibe oben deinen ersten Tagebucheintrag!</small>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {entries.map((entry) => (
              <div key={entry.id} style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', border: '1px solid #f3f4f6', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#111827', fontWeight: '600' }}>{entry.title}</h3>
                  <small style={{ color: '#6b7280', backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem' }}>{entry.date}</small>
                </div>
                <p style={{ whiteSpace: 'pre-wrap', color: '#4b5563', margin: '0 0 16px 0', fontSize: '0.95rem', lineHeight: '1.5' }}>{entry.text}</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' }}
                  >
                    🗑️ Löschen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;