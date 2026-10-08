export function appPath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}
