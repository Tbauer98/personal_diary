export default function FormCard({ title, setTitle, text, setText, onAddEntry }) {
  return (
    <div className="card">
      <h2 className="card-title">✍️ Neuer Eintrag</h2>
      <form onSubmit={onAddEntry} className="diary-form">
        <input
          type="text"
          placeholder="Titel für heute..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
        <textarea
          placeholder="Was ist heute passiert? Schreiben Sie Ihre Gedanken auf..."
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-textarea"
        />
        <button type="submit" className="btn-submit">
          Eintrag Speichern
        </button>
      </form>
    </div>
  );
}