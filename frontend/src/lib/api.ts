const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

type ApiRequestBody = BodyInit | Record<string, unknown> | unknown[] | null;
type ApiErrorInfo = {
  message?: string;
  [key: string]: unknown;
};
type ApiErrorPayload = {
  error?: ApiErrorInfo;
};

interface ApiOptions extends Omit<RequestInit, "body"> {
  body?: ApiRequestBody;
}

export class ApiError extends Error {
  status: number;
  info?: ApiErrorInfo;

  constructor(message: string, status: number, info?: ApiErrorInfo) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.info = info;
  }
}

/**
 * Helper untuk melakukan HTTP request ke Express Backend
 */
async function request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const { body, ...requestOptions } = options;
  
  // Set default headers
  const headers = new Headers(options.headers);
  if (!(body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // Ambil JWT token dari localStorage jika ada
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const config: RequestInit = {
    ...requestOptions,
    headers,
  };

  if (body && !(body instanceof FormData)) {
    config.body = JSON.stringify(body);
  } else if (body instanceof FormData) {
    config.body = body;
  }

  try {
    const response = await fetch(url, config);
    const data = (await response.json().catch(() => ({}))) as ApiErrorPayload;

    if (!response.ok) {
      if (response.status === 429) {
        throw new ApiError(
          "Terlalu banyak permintaan. Silakan tunggu beberapa menit sebelum mencoba lagi.",
          429,
          data?.error
        );
      }

      const errorMessage = data?.error?.message || `Request failed with status ${response.status}`;
      throw new ApiError(errorMessage, response.status, data?.error);
    }

    return data as T;
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : "Terjadi kesalahan koneksi ke server.",
      500
    );
  }
}

export const api = {
  get: <T>(endpoint: string, options?: ApiOptions) => 
    request<T>(endpoint, { ...options, method: "GET" }),
  
  post: <T>(endpoint: string, body: ApiRequestBody, options?: ApiOptions) => 
    request<T>(endpoint, { ...options, method: "POST", body }),
  
  put: <T>(endpoint: string, body: ApiRequestBody, options?: ApiOptions) => 
    request<T>(endpoint, { ...options, method: "PUT", body }),
  
  delete: <T>(endpoint: string, options?: ApiOptions) => 
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
