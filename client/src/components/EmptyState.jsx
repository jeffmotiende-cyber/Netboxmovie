export default function EmptyState({ icon, title, message, action }) {
  return (
    <div className="flex-center flex-col" style={{ minHeight: '40vh', gap: 16, padding: 40 }}>
      {icon && <span style={{ fontSize: 48, opacity: 0.5 }}>{icon}</span>}
      <h3 style={{ fontSize: '1.3rem', fontWeight: 600 }}>{title || 'Nothing here yet'}</h3>
      {message && <p className="text-secondary" style={{ textAlign: 'center', maxWidth: 400 }}>{message}</p>}
      {action && action}
    </div>
  );
}
