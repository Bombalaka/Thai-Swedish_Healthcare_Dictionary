// Client: empty = same origin (proxy). Server: always use backend URL (Node fetch needs absolute URL).
function getApiBase(): string {
  if (typeof window === "undefined") {
    return process.env.BACKEND_URL || "http://localhost:5196";
  }
  return process.env.NEXT_PUBLIC_API_URL?.trim() || "";
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
  const res = await fetch(`${getApiBase()}/api/terms?${params}`);
  const json: ApiResponse<Term[]> = await res.json();
  if (json.errors) throw new Error(json.errors.join(", "));
  return json.data ?? [];
}

export async function getTerm(id: number): Promise<Term | null> {
  const res = await fetch(`${getApiBase()}/api/terms/${id}`);
  if (res.status === 404) return null;
  const json: ApiResponse<Term> = await res.json();
  if (json.errors) throw new Error(json.errors.join(", "));
  return json.data ?? null;
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${getApiBase()}/api/categories`);
  const json: ApiResponse<Category[]> = await res.json();
  if (json.errors) throw new Error(json.errors.join(", "));
  return json.data ?? [];
}

export async function getCategoryTerms(categoryId: number): Promise<Term[]> {
  const res = await fetch(`${getApiBase()}/api/categories/${categoryId}/terms`);
  const json: ApiResponse<Term[]> = await res.json();
  if (json.errors) throw new Error(json.errors.join(", "));
  return json.data ?? [];
}

export async function getSources(): Promise<Source[]> {
  const res = await fetch(`${getApiBase()}/api/sources`);
  const json: ApiResponse<Source[]> = await res.json();
  if (json.errors) throw new Error(json.errors.join(", "));
  return json.data ?? [];
}

export async function getRandomTerms(limit = 3): Promise<Term[]> {
  const res = await fetch(`${getApiBase()}/api/terms/random?limit=${limit}`);
  const json: ApiResponse<Term[]> = await res.json();
  if (json.errors) throw new Error(json.errors.join(", "));
  return json.data ?? [];
}
