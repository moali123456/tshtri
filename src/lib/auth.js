import { cookies } from "next/headers";

export async function isLoggedIn() {
  const cookieStore = await cookies(); // Await cookies()
  const token = cookieStore.get("token")?.value;
  return !!token;
}