"use server";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getRolesList() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw new Error("Authentication token not found");
    }

    const res = await fetch(`${BASE_URL}/Account/getRolesListForAdmin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Language: "1",
        Platform: "1",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      // More detailed error info
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        `Failed to fetch roles: ${res.status} - ${errorData.message || "Unknown error"}`
      );
    }

    const data = await res.json();
    console.log("Roles List (Action):", data.data);
    return data.data;
  } catch (error) {
    console.error("Failed to fetch roles:", {
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }
}