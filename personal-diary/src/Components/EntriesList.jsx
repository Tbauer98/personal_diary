import EntryItem from './EntryItem';

export default function EntriesList({ entries, onDelete }) {
  return (
    <div>
      <div className="list-header">
        <h2 className="list-title">📚 Meine Erinnerungen</h2>
        <span className="badge">{entries.length}</span>
      </div>

      {entries.length === 0 && (
        <div className="empty-state">
          <p>Noch keine Einträge vorhanden.</p>
          <small>Schreibe oben deinen ersten Tagebucheintrag!</small>
        </div>
      )}

      <div className="entries-grid">
        {entries.map((entry) => (
          <EntryItem key={entry.id} entry={entry} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}