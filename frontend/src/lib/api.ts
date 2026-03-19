// Client: empty = same origin (proxy). Server: always use backend URL (Node fetch needs absolute URL).
function getApiBase(): string {
  if (typeof window === "undefined") {
    return process.env.BACKEND_URL || "http://localhost:5196";
  }
  return process.env.NEXT_PUBLIC_API_URL?.trim() || "";
}

// Retry fetch when backend returns HTML (Render cold start "spinning up" page)
async function fetchApi<T>(url: string, maxRetries = 3): Promise<{ status: number; data: T }> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const res = await fetch(url);
    const text = await res.text();
    const isJson = res.headers.get("content-type")?.includes("application/json") ?? text.trim().startsWith("{");
    if (isJson) {
      const json = JSON.parse(text) as T;
      return { status: res.status, data: json };
    }
    // HTML = cold start page, retry after delay
    if (attempt < maxRetries) {
      const delay = attempt * 2000; // 2s, 4s, 6s
      await new Promise((r) => setTimeout(r, delay));
    } else {
      throw new Error("Backend is starting up. Please refresh in a moment.");
    }
  }
  throw new Error("Backend unavailable");
}

export interface ApiResponse<T> {
  data: T;
  meta?: { total: number };
  errors: string[] | null;
}

export interface Term {
  id: number;
  swedishWord: string;
  thaiWord: string;
  definitionTh: string;
  categoryId: number;
  categoryNameSv?: string;
  categoryNameTh?: string;
  contextExample?: string;
  sourceId: number;
  sourceName?: string;
  createdAt: string;
}

export interface Category {
  id: number;
  nameTh: string;
  nameSv: string;
  parentId: number | null;
  sortOrder: number;
  children: Category[];
}

export interface Source {
  id: number;
  name: string;
  url: string;
  description?: string;
}

export async function searchTerms(q: string, categoryId?: number): Promise<Term[]> {
  const params = new URLSearchParams({ q });
  if (categoryId != null) params.set("category_id", String(categoryId));
  const { data: json } = await fetchApi<ApiResponse<Term[]>>(`${getApiBase()}/api/terms?${params}`);
  if (json.errors) throw new Error(json.errors.join(", "));
  return json.data ?? [];
}

export async function getTerm(id: number): Promise<Term | null> {
  const { status, data: json } = await fetchApi<ApiResponse<Term>>(`${getApiBase()}/api/terms/${id}`);
  if (status === 404) return null;
  if (json.errors) throw new Error(json.errors.join(", "));
  return json.data ?? null;
}

export async function getCategories(): Promise<Category[]> {
  const { data: json } = await fetchApi<ApiResponse<Category[]>>(`${getApiBase()}/api/categories`);
  if (json.errors) throw new Error(json.errors.join(", "));
  return json.data ?? [];
}

export async function getCategoryTerms(categoryId: number): Promise<Term[]> {
  const { data: json } = await fetchApi<ApiResponse<Term[]>>(`${getApiBase()}/api/categories/${categoryId}/terms`);
  if (json.errors) throw new Error(json.errors.join(", "));
  return json.data ?? [];
}

export async function getSources(): Promise<Source[]> {
  const { data: json } = await fetchApi<ApiResponse<Source[]>>(`${getApiBase()}/api/sources`);
  if (json.errors) throw new Error(json.errors.join(", "));
  return json.data ?? [];
}

export async function getRandomTerms(limit = 3): Promise<Term[]> {
  const { data: json } = await fetchApi<ApiResponse<Term[]>>(`${getApiBase()}/api/terms/random?limit=${limit}`);
  if (json.errors) throw new Error(json.errors.join(", "));
  return json.data ?? [];
}
