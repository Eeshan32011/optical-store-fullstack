export default function Header({ onAddStore }) {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Optical Store Manager home">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <path
              d="M3.5 16c3.1-5.3 7.3-8 12.5-8s9.4 2.7 12.5 8c-3.1 5.3-7.3 8-12.5 8S6.6 21.3 3.5 16Z"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        </span>
        <span className="brand-copy">
          <strong>Optical Store Manager</strong>
          <span>Manage your optical stores in one place</span>
        </span>
      </a>
      <button className="button button-primary header-add" onClick={onAddStore}>
        <span aria-hidden="true">+</span> Add Store
      </button>
    </header>
  );
}
