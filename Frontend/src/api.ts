/**
 * API service for document management.
 * Adjust the BASE_URL to your backend's URL.
 */

import type { SearchFilters } from "./Context/DocsContext";

// --- Backend Configuration ---
export const BASE_URL = "http://localhost:8000";
// -----------------------------

export interface DocInfo {
  id: string;
  name: string;
  title?: string;
  author?: string;
  category?: string;
  created_at?: number;
  file_type?: string;
  language?: string;
  size?: number;
}

export interface DocResponse {
  doc: string; // The doc content, URL, or base64 representation
}

/**
 * GET /docs/all
 * Fetches all docs.
 */
export const getAllDocs = async (limit: number): Promise<DocInfo[]> => {
  const url = new URL(`${BASE_URL}/docs/all`);
  if (limit) url.searchParams.append("limit", limit.toString());

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching all docs: ${response.statusText}`);
  }

  return response.json();
};

/**
 * POST /docs
 * Uploads a doc.
 */
export const uploadDoc = async (doc: File): Promise<void> => {
  const formData = new FormData();
  formData.append("doc", doc);

  const response = await fetch(`${BASE_URL}/docs`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Error uploading doc: ${response.statusText}`);
  }
};

/**
 * GET /docs/filtered
 * Filters docs with a query and limit.
 */
export const getFilteredDocs = async (payload: SearchFilters): Promise<DocInfo[]> => {
  const url = new URL(`${BASE_URL}/docs/filtered`);

  url.searchParams.append("query", payload.query ?? "");
  if (payload.limit) url.searchParams.append("limit", payload.limit.toString());
  if (payload.language) url.searchParams.append("language", payload.language);
  if (payload.type) url.searchParams.append("type", payload.type);
  if (payload.date) url.searchParams.append("date", payload.date.toString());

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error filtering docs: ${response.statusText}`);
  }

  return response.json();
};

/**
 * GET /docs/{id}
 * Fetches the content of a specific doc.
 */
export const getDocById = async (id: string, fileNameFallback?: string): Promise<File> => {
  const response = await fetch(`${BASE_URL}/docs/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error fetching doc content: ${response.statusText}`);
  }

  const blob = await response.blob();

  // Try to extract filename from Content-Disposition header
  const contentDisposition = response.headers.get("Content-Disposition");
  let fileName = fileNameFallback || "document";
  if (contentDisposition) {
    const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
    if (fileNameMatch && fileNameMatch.length > 1) {
      fileName = fileNameMatch[1];
    }
  }

  // Ensure we use the blob's type or a fallback
  const type = blob.type || "application/octet-stream";

  return new File([blob], fileName, { type });
};
export const getDocInfo = async (id: string): Promise<DocInfo> => {
  const response = await fetch(`${BASE_URL}/docs/${id}/info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching document info: ${response.statusText}`);
  }

  return response.json();
};

export const deleteDoc = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/docs/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Error deleting doc: ${response.statusText}`);
  }
};
