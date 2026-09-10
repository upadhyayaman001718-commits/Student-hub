import { Resource } from "@/shared/data/resources";

export type { Resource };

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN_KEY = "student_hub_token";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    token: string;
  };
}

export interface UpdateResourceInput {
  title?: string;
  subject?: string;
  semester?: number;
  program?: string;
  course?: string;
  resourceType?: string;
}

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

const getAuthHeaders = (): Record<string, string> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (response.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem("student_hub_user");
      window.dispatchEvent(new Event("auth:unauthorized"));
    }
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Session expired or unauthorized. Please log in again.");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Request failed with status ${response.status}`);
  }

  return response.json();
};

export const getResources = async () => {
    const response = await fetch(`${API_URL}/resources`);
    return handleResponse<{ success: boolean; data: Resource[] }>(response);
};

export const getResourceById = async (id: string | number) => {
    const response = await fetch(`${API_URL}/resources/${id}`);
    return handleResponse<{ success: boolean; data: Resource }>(response);
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    return handleResponse<LoginResponse>(response);
};

export const uploadResource = async (formData: FormData) => {
    const headers = getAuthHeaders();
    const response = await fetch(`${API_URL}/resources/upload`, {
        method: "POST",
        headers,
        body: formData,
    });

    return handleResponse<{ success: boolean; message: string; data: Resource }>(response);
};

export const updateResource = async (id: string | number, data: UpdateResourceInput) => {
    const headers = {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
    };
    const response = await fetch(`${API_URL}/resources/${id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(data),
    });

    return handleResponse<{ success: boolean; message: string; data: Resource }>(response);
};

export const deleteResource = async (id: string | number) => {
    const headers = getAuthHeaders();
    const response = await fetch(`${API_URL}/resources/${id}`, {
        method: "DELETE",
        headers,
    });

    return handleResponse<{ success: boolean; message: string; data: Resource }>(response);
};
