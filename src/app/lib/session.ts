export type AdminSession = {
  id: string;
  email: string;
  mobile: string;
  name: string;
  role: string;
  status: number;
};

const storageKey = "solix-admin";

export function saveAdmin(admin: AdminSession) {
  sessionStorage.setItem(storageKey, JSON.stringify(admin));
}

export function readAdmin(): AdminSession | null {
  const raw = sessionStorage.getItem(storageKey);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminSession;
  } catch {
    return null;
  }
}

export function clearAdmin() {
  sessionStorage.removeItem(storageKey);
}
