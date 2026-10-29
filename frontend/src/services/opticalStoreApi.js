const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
const OPTICAL_PATH = "/optical";

async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${OPTICAL_PATH}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });
  } catch (error) {
    throw new Error(
      `Could not connect to the backend at ${API_BASE_URL || "the configured API URL"}. Make sure the Spring Boot server is running and CORS is configured.`,
      { cause: error },
    );
  }

  const contentType = response.headers.get("content-type") || "";
  const body = await response.text();
  let data = body;

  if (body && contentType.includes("application/json")) {
    try {
      data = JSON.parse(body);
    } catch (error) {
      throw new Error("The backend returned an invalid JSON response.", { cause: error });
    }
  }

  if (!response.ok) {
    const message =
      typeof data === "string" && data.trim()
        ? data
        : data?.message || data?.error || `The request failed with status ${response.status}.`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return data;
}

export function testBackend() {
  return request("/");
}

export async function getAllStores() {
  const stores = await request("/displayall");
  if (!Array.isArray(stores)) {
    throw new Error("The backend returned an unexpected store list.");
  }
  return stores;
}

export function getStoreById(id) {
  return request(`/display/${encodeURIComponent(id)}`);
}

export function addStore(store) {
  return request("/add", {
    method: "POST",
    body: JSON.stringify({
      storeName: store.storeName,
      city: store.city,
      frameCount: Number(store.frameCount),
      offersEyeTest: store.offersEyeTest === true,
    }),
  });
}

export function updateStore(id, store) {
  return request(`/update/${encodeURIComponent(id)}`, {
    method: "POST",
    body: JSON.stringify({
      storeName: store.storeName,
      city: store.city,
      frameCount: Number(store.frameCount),
      offersEyeTest: store.offersEyeTest === true,
    }),
  });
}

export async function deleteStore(id) {
  const message = await request(`/delete/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  const result = typeof message === "string" ? message : message?.message;

  if (typeof result === "string" && result.toLowerCase().includes("id not found")) {
    const error = new Error(result);
    error.status = 404;
    throw error;
  }

  return result;
}
