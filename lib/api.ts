import { API_BASE_URL } from '@/constants/api';
import { type Student } from '@/components/StudentCard';

// Error that remembers the HTTP status (401, 404, ...) so screens can react to it.
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    }
}

// Reusable GET request for protected endpoints: adds the Bearer token and checks response.ok.
export async function apiGet<T>(path: string, token: string | null): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) {
    throw new ApiError('Your session is no longer valid. Please sign in again.', 401);
  }

  const data = await response.json();
  if (!response.ok) {
    throw new ApiError(data.message || 'Request failed. Please try again.', response.status);
  }

  return data as T;
}

// GET /students returns an array of { id, name, email, course }.
// These names match the Student type, so no field mapping is needed.
export async function getStudents(token: string | null): Promise<Student[]> {
  return apiGet<Student[]>('/students', token);
}
