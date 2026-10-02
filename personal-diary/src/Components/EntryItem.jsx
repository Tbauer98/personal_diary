export default function EntryItem({ entry, onDelete }) {
  return (
    <div className="entry-card">
      <div className="entry-header">
        <h3 className="entry-title">{entry.title}</h3>
        <small className="entry-date">{entry.date}</small>
      </div>
      <p className="entry-text">{entry.text}</p>
      <div className="entry-actions">
        <button onClick={() => onDelete(entry.id)} className="btn-delete">
          🗑️ Löschen
        </button>
      </div>
    </div>
  );
}