import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import StoreForm from "./components/StoreForm.jsx";
import StoreTable from "./components/StoreTable.jsx";
import SummaryCards from "./components/SummaryCards.jsx";
import {
  addStore,
  deleteStore,
  getAllStores,
  testBackend,
  updateStore,
} from "./services/opticalStoreApi.js";

function getErrorMessage(error, action) {
  if (error.status === 404 && action === "update") {
    return "This store no longer exists. Refresh the list and try again.";
  }
  if (error.status === 404 && action === "delete") {
    return "This store could not be found. The list has been refreshed.";
  }
  if (error.message.startsWith("Could not connect")) return error.message;
  return error.message || "Something went wrong. Please try again.";
}

export default function App() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [query, setQuery] = useState("");
  const [formStore, setFormStore] = useState(undefined);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const refreshStores = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);
    setLoadError("");

    try {
      const records = await getAllStores();
      setStores(records);
    } catch (error) {
      setLoadError(getErrorMessage(error, "load"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    async function loadDashboard() {
      try {
        await testBackend();
        const records = await getAllStores();
        if (active) {
          setStores(records);
          setLoadError("");
        }
      } catch (error) {
        if (active) {
          setLoadError(getErrorMessage(error, "load"));
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    loadDashboard();
    return () => {
      active = false;
    };
  }, []);

  const filteredStores = useMemo(() => {
    const search = query.trim().toLocaleLowerCase();
    if (!search) return stores;
    return stores.filter(
      (store) =>
        String(store.storeName ?? "").toLocaleLowerCase().includes(search) ||
        String(store.city ?? "").toLocaleLowerCase().includes(search),
    );
  }, [stores, query]);

  async function saveStore(values) {
    setSaving(true);
    setNotice(null);
    try {
      if (formStore) {
        await updateStore(formStore.id, values);
        await refreshStores();
        setNotice({ type: "success", text: "Store updated successfully." });
      } else {
        await addStore(values);
        await refreshStores();
        setNotice({ type: "success", text: "Store added successfully." });
      }
      setFormStore(undefined);
    } catch (error) {
      setNotice({
        type: "error",
        text: getErrorMessage(error, formStore ? "update" : "add"),
      });
    } finally {
      setSaving(false);
    }
  }

  async function removeStore(store) {
    const confirmed = window.confirm(
      `Delete "${store.storeName}" in ${store.city}? This action cannot be undone.`,
    );
    if (!confirmed) return;

    setDeletingId(store.id);
    setNotice(null);
    try {
      const message = await deleteStore(store.id);
      await refreshStores();
      setNotice({
        type: "success",
        text: message || `"${store.storeName}" was deleted successfully.`,
      });
    } catch (error) {
      await refreshStores();
      setNotice({
        type: "error",
        text: getErrorMessage(error, "delete"),
      });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="app-shell">
      <Header onAddStore={() => setFormStore(null)} />
      <main className="dashboard">
        <section className="page-intro">
          <div>
            <p className="eyebrow">OVERVIEW</p>
            <h1>Your stores</h1>
            <p className="page-description">
              A clear view of your locations and optical inventory.
            </p>
          </div>
          <span
            className={`live-indicator ${
              loadError ? "live-indicator-error" : loading ? "live-indicator-connecting" : ""
            }`}
          >
            <span />
            {loading ? "Connecting…" : loadError ? "Backend unavailable" : "Live data"}
          </span>
        </section>

        {notice && (
          <div className={`notice notice-${notice.type}`} role={notice.type === "error" ? "alert" : "status"}>
            <span>{notice.text}</span>
            <button
              className="notice-dismiss"
              onClick={() => setNotice(null)}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
        )}

        {loadError && (
          <div className="connection-error" role="alert">
            <span className="error-mark" aria-hidden="true">
              !
            </span>
            <div>
              <strong>Couldn’t load your stores</strong>
              <p>{loadError}</p>
            </div>
            <button
              className="button button-quiet retry-button"
              onClick={() => refreshStores(true)}
              disabled={loading}
            >
              Retry
            </button>
          </div>
        )}

        <SummaryCards stores={stores} unavailable={loading || Boolean(loadError)} />

        <section className="stores-panel" aria-labelledby="stores-heading">
          <div className="panel-heading">
            <div className="panel-title">
              <div>
                <h2 id="stores-heading">Store locations</h2>
                <p>Manage your optical store details</p>
              </div>
              {!loading && !loadError && (
                <span className="count-badge">
                  {filteredStores.length} {filteredStores.length === 1 ? "store" : "stores"}
                </span>
              )}
            </div>
            <label className="search-field">
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="8.8" cy="8.8" r="5.8" stroke="currentColor" strokeWidth="1.5" />
                <path d="m13.2 13.2 4 4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <input
                type="search"
                placeholder="Search stores or cities"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search by store name or city"
              />
            </label>
          </div>
          <StoreTable
            stores={filteredStores}
            searching={query.trim().length > 0}
            loading={loading}
            unavailable={Boolean(loadError)}
            deletingId={deletingId}
            onAddStore={() => setFormStore(null)}
            onEditStore={(store) => setFormStore(store)}
            onDeleteStore={removeStore}
          />
          {deletingId !== null && (
            <span className="sr-only" role="status">
              Deleting store {deletingId}…
            </span>
          )}
        </section>
        <footer className="page-footer">
          <span>Optical Store Manager</span>
          <span>Your store data, in one place.</span>
        </footer>
      </main>
      {formStore !== undefined && (
        <StoreForm
          store={formStore}
          saving={saving}
          onClose={() => {
            if (!saving) setFormStore(undefined);
          }}
          onSubmit={saveStore}
        />
      )}
    </div>
  );
}
