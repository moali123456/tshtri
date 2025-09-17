"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function deleteAd(id) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw new Error("Authentication token not found");
    }

    const res = await fetch(`${BASE_URL}/Advertisement/deleteAdvertisement`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Language: "1",
        Platform: "1",
      },
      body: JSON.stringify({ id: parseInt(id, 10) }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);
      throw new Error(errorData?.message || "Failed to delete ad");
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to delete admin:", error);
    throw error;
  }
}
