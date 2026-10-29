import { useState } from "react";

const EMPTY_STORE = {
  storeName: "",
  city: "",
  frameCount: "",
  offersEyeTest: "",
};

function initialValues(store) {
  if (!store) return EMPTY_STORE;
  return {
    storeName: store.storeName ?? "",
    city: store.city ?? "",
    frameCount: store.frameCount ?? "",
    offersEyeTest: store.offersEyeTest === true ? "true" : "false",
  };
}

export default function StoreForm({ store = null, saving, onClose, onSubmit }) {
  const [values, setValues] = useState(() => initialValues(store));
  const [validationError, setValidationError] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setValidationError("");
  }

  function submit(event) {
    event.preventDefault();
    const name = values.storeName.trim();
    const city = values.city.trim();
    const frameCount = Number(values.frameCount);

    if (!name || !city) {
      setValidationError("Enter both a store name and city.");
      return;
    }
    if (values.frameCount === "" || !Number.isInteger(frameCount) || frameCount < 0) {
      setValidationError("Frame count must be a whole number of 0 or more.");
      return;
    }
    if (values.offersEyeTest !== "true" && values.offersEyeTest !== "false") {
      setValidationError("Choose whether this store offers eye tests.");
      return;
    }

    onSubmit({
      storeName: name,
      city,
      frameCount,
      offersEyeTest: values.offersEyeTest === "true",
    });
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onClose();
      }}
    >
      <section
        className="store-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="store-form-title"
      >
        <div className="modal-heading">
          <div>
            <p className="eyebrow">{store ? "STORE DETAILS" : "NEW LOCATION"}</p>
            <h2 id="store-form-title">{store ? "Edit store" : "Add a store"}</h2>
          </div>
          <button
            className="icon-button"
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close form"
          >
            ×
          </button>
        </div>

        <form className="store-form" onSubmit={submit} noValidate>
          <label>
            Store name
            <input
              autoFocus
              name="storeName"
              value={values.storeName}
              onChange={updateField}
              placeholder="e.g. Vision Care"
              maxLength={120}
              required
            />
          </label>
          <label>
            City
            <input
              name="city"
              value={values.city}
              onChange={updateField}
              placeholder="e.g. Vijayawada"
              maxLength={100}
              required
            />
          </label>
          <label>
            Frame count
            <input
              name="frameCount"
              type="number"
              min="0"
              step="1"
              value={values.frameCount}
              onChange={updateField}
              placeholder="0"
              required
            />
          </label>
          <label>
            Offers eye test
            <select
              name="offersEyeTest"
              value={values.offersEyeTest}
              onChange={updateField}
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          {validationError && (
            <p className="form-error" role="alert">
              {validationError}
            </p>
          )}
          <div className="form-actions">
            <button className="button button-quiet" type="button" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button className="button button-primary" type="submit" disabled={saving}>
              {saving ? "Saving…" : store ? "Save changes" : "Add store"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
