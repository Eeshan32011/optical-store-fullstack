function EyeTestStatus({ available }) {
  return (
    <span className={`status-pill ${available === true ? "status-yes" : "status-no"}`}>
      <span className="status-dot" aria-hidden="true" />
      {available === true ? "Available" : "Not offered"}
    </span>
  );
}

function StoreActions({ onEdit, onDelete, deleting }) {
  return (
    <div className="row-actions">
      <button className="text-button" onClick={onEdit} aria-label="Edit store" disabled={deleting}>
        Edit
      </button>
      <button
        className="text-button text-button-danger"
        onClick={onDelete}
        aria-label="Delete store"
        disabled={deleting}
      >
        {deleting ? "Deleting…" : "Delete"}
      </button>
    </div>
  );
}

function StoreEmptyState({ searching, onAddStore }) {
  return (
    <div className="empty-state">
      <span className="empty-icon" aria-hidden="true">
        ◇
      </span>
      <h3>{searching ? "No matching stores" : "No stores yet"}</h3>
      <p>
        {searching
          ? "Try another store name or city."
          : "Add your first location to start managing your optical stores."}
      </p>
      {!searching && (
        <button className="button button-primary" onClick={onAddStore}>
          <span aria-hidden="true">+</span> Add your first store
        </button>
      )}
    </div>
  );
}

export default function StoreTable({
  stores,
  searching,
  loading,
  unavailable,
  deletingId,
  onAddStore,
  onEditStore,
  onDeleteStore,
}) {
  if (loading) {
    return (
      <div className="loading-state" role="status">
        <span className="spinner" />
        <span>Loading your stores…</span>
      </div>
    );
  }

  if (unavailable) {
    return (
      <div className="loading-state unavailable-state">
        Store list is unavailable until the backend responds.
      </div>
    );
  }

  if (stores.length === 0) {
    return <StoreEmptyState searching={searching} onAddStore={onAddStore} />;
  }

  return (
    <>
      <div className="table-scroll">
        <table className="store-table">
          <thead>
            <tr>
              <th scope="col">Store</th>
              <th scope="col">City</th>
              <th scope="col">Frames</th>
              <th scope="col">Eye tests</th>
              <th scope="col" className="actions-heading">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id}>
                <td>
                  <span className="store-name">{store.storeName}</span>
                  <span className="store-id">ID {store.id}</span>
                </td>
                <td>{store.city}</td>
                <td className="frame-count">{Number(store.frameCount || 0).toLocaleString()}</td>
                <td>
                  <EyeTestStatus available={store.offersEyeTest} />
                </td>
                <td>
                  <StoreActions
                    onEdit={() => onEditStore(store)}
                    onDelete={() => onDeleteStore(store)}
                    deleting={store.id === deletingId}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
