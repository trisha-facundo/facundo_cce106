export type UserRole = 'student' | 'admin';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  studentId: string;
  program: string;
  yearLevel: number;
  gpa: number;
}

interface StoredUser extends StudentProfile {
  password: string;
}

interface TokenPayload {
  sub: string;
  role: UserRole;
  exp: number;
}

const USERS: StoredUser[] = [
  {
    id: 'u1',
    name: 'Trisha Facundo',
    email: 'student@cce.edu',
    password: 'student123',
    role: 'student',
    studentId: '2023-00123',
    program: 'BS Computer Engineering',
    yearLevel: 3,
    gpa: 1.5,
  },
  {
    id: 'u2',
    name: 'Prof. Dela Cruz',
    email: 'admin@cce.edu',
    password: 'admin123',
    role: 'admin',
    studentId: 'FAC-0007',
    program: 'CCE Faculty',
    yearLevel: 0,
    gpa: 0,
  },
];

const TOKEN_TTL_MS = 2 * 60 * 1000;

export class AuthError extends Error {
  status: 401 | 403;

  constructor(message: string, status: 401 | 403) {
    super(message);
    this.name = 'AuthError';
    this.status = status;
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toProfile(user: StoredUser): StudentProfile {
  const { password: _password, ...profile } = user;
  return profile;
}

function encodeToken(payload: TokenPayload): string {
  return `mock.${encodeURIComponent(JSON.stringify(payload))}`;
}

function decodeToken(token: string): TokenPayload | null {
  if (!token.startsWith('mock.')) return null;
  try {
    return JSON.parse(decodeURIComponent(token.slice('mock.'.length))) as TokenPayload;
  } catch {
    return null;
  }
}

export async function login(email: string, password: string): Promise<{ token: string; user: StudentProfile }> {
  await delay(700);

  const match = USERS.find((user) => user.email.toLowerCase() === email.trim().toLowerCase());
  if (!match || match.password !== password) {
    throw new AuthError('Incorrect email or password.', 401);
  }

  const token = encodeToken({ sub: match.id, role: match.role, exp: Date.now() + TOKEN_TTL_MS });
  return { token, user: toProfile(match) };
}

export async function fetchProtectedProfile(token: string): Promise<StudentProfile> {
  await delay(500);

  const payload = decodeToken(token);
  if (!payload) {
    throw new AuthError('Invalid session token.', 401);
  }
  if (payload.exp < Date.now()) {
    throw new AuthError('Session expired. Please log in again.', 401);
  }

  const user = USERS.find((candidate) => candidate.id === payload.sub);
  if (!user) {
    throw new AuthError('This account no longer exists.', 403);
  }

  return toProfile(user);
}

export function forceExpireToken(token: string): string {
  const payload = decodeToken(token);
  if (!payload) return token;
  return encodeToken({ ...payload, exp: Date.now() - 1000 });
}
