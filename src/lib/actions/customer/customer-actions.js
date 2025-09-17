"use server";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getCustomers(pageNumber = 1, pageSize = 5, filters = {}) {
  try {
    // Fix: Await cookies() first, then call .get()
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw new Error("Authentication token not found");
    }

    // Prepare the request body with pagination and filters
    const requestBody = {
      pageNumber,
      pageSize,
      // Add filter fields if they exist
      ...(filters.name && { name: filters.name }),
      ...(filters.email && { email: filters.email }),
      ...(filters.phoneNumber && { phone: filters.phoneNumber }),
      ...(filters.role && { roleId: filters.role }),
      ...(filters.active !== undefined && {
        active: filters.active === "true",
      }),
    };

    const res = await fetch(`${BASE_URL}/Customers/getAllCustomersListForAdmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Language: "1",
        Platform: "1",
      },
      body: JSON.stringify(requestBody),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch admins: ${res.status}`);
    }

    console.log(requestBody);
    const data = await res.json();
    console.log(data);
    return {
      success: true,
      data: data?.data || {},
      items: data?.data?.items || [],
      totalPages: data?.data?.totalPages || 1,
    };
  } catch (error) {
    console.error("Failed to fetch admins:", error);
    return {
      success: false,
      data: {},
      items: [],
      totalPages: 1,
      error: error.message,
    };
  }
}
