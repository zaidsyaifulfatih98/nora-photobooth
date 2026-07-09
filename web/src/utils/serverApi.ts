export async function fetchPublic<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      next: { revalidate: 30 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data as T;
  } catch {
    return null;
  }
}
