export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex-center flex-col" style={{ minHeight: '40vh', gap: 16, padding: 40 }}>
      <span style={{ fontSize: 48, opacity: 0.5 }}>⚠️</span>
      <h3 style={{ fontSize: '1.3rem', fontWeight: 600 }}>Something went wrong</h3>
      <p className="text-secondary" style={{ textAlign: 'center' }}>
        {message || 'An unexpected error occurred. Please try again.'}
      </p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
