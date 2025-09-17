"use server";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getContacts(pageNumber = 1, pageSize = 5) {
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
    };

    const res = await fetch(`${BASE_URL}/Contact/listContacts`, {
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
      throw new Error(`Failed to fetch contacts: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    return {
      success: true,
      data: data?.data || {},
      items: data?.data?.data?.items || [],
      totalPages: data?.data?.data?.totalPages || 1,
    };
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return {
      success: false,
      data: {},
      items: [],
      totalPages: 1,
      error: error.message,
    };
  }
}

// contact details
export async function getContactDetails(contactId) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw new Error("Authentication token not found");
    }

    // Create URL with query parameter
    const url = new URL(`${BASE_URL}/Contact/ContactDetails`);
    url.searchParams.append('ContactId', contactId);

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Language: "1",
        Platform: "1",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch contact details: ${res.status}`);
    }

    const data = await res.json();
    return {
      success: true,
      data: data?.data || {},
    };
  } catch (error) {
    console.error("Failed to fetch contact details:", error);
    return {
      success: false,
      data: {},
      error: error.message,
    };
  }
}
