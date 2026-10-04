import { API_BASE_URL } from '@/constants/api';
import { type Student } from '@/components/StudentCard';
import { type User } from '@/context/AuthContext';

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

  // If the server answers with something that is not JSON (for example an old API
  // without this route), show a clear message instead of a JSON parse error.
  let data;
  try {
    data = await response.json();
  } catch {
    throw new ApiError('The server sent an unexpected response. Restart the API (npm run api).', 0);
  }

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

// GET /students/{id} returns one student, or a 404 ApiError if the id does not exist.
export async function getStudent(id: string, token: string | null): Promise<Student> {
  return apiGet<Student>(`/students/${encodeURIComponent(id)}`, token);
}

// GET /profile returns { id, name, email, role } for the signed-in user.
export async function getProfile(token: string | null): Promise<User> {
  return apiGet<User>('/profile', token);
}
