"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function addAdmin({ name, email, phoneNumber, roleId }) {
  try {
    const cookieStore = cookies(); // no need to await here
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw new Error("Authentication token not found");
    }

    const res = await fetch(`${BASE_URL}/Account/addNewAdmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Language: "1",
        Platform: "1",
      },
      body: JSON.stringify({
        name,
        email,
        phoneNumber: `+${phoneNumber.replace(/^(\+)?/, "")}`, // Ensure format starts with +
        roleId: parseInt(roleId),
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.message || "Failed to add admin");
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to add admin:", error);
    throw error;
  }
}
