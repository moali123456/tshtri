"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Get Add
export async function getAdvertisementDetails(id) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, error: "Authentication token not found" };
    }

    const response = await fetch(
      `${BASE_URL}/Advertisement/getAdDetails?id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Language: "1",
          Platform: "1",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching advertisement details:", error);
    return {
      success: false,
      error: error.message || "Unknown error occurred",
    };
  }
}

// Update Add
export async function updateAdvertisementDetails(id, updates) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, error: "Authentication token not found" };
    }

    // Map the form data to the API expected format
    const apiData = {
      id: parseInt(id),
      adStatus: 0, // You might need to adjust this based on your status mapping
      isPublished: updates.isPublished || false
    };

    const response = await fetch(
      `${BASE_URL}/Advertisement/updateAdvertisement`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Language: "1",
          Platform: "1",
        },
        body: JSON.stringify(apiData),
      }
    );

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error updating advertisement details:", error);
    return {
      success: false,
      error: error.message || "Unknown error occurred",
    };
  }
}

// get Add Attributes
export async function getAdAttributesDetails(id) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, error: "Authentication token not found" };
    }

    // Map the form data to the API expected format
    const apiData = {
      adId: parseInt(id),
    };

    const response = await fetch(
      `${BASE_URL}/Advertisement/getAdAttributes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Language: "1",
          Platform: "1",
        },
        body: JSON.stringify(apiData),
      }
    );

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching AdAttributes details:", error);
    return {
      success: false,
      error: error.message || "Unknown error occurred",
    };
  }
}

// Get Add Images
export async function getAdImages(id) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, error: "Authentication token not found" };
    }

    // Map the form data to the API expected format
    const apiData = {
      adId: parseInt(id),
    };

    const response = await fetch(
      `${BASE_URL}/Advertisement/getAdImages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Language: "1",
          Platform: "1",
        },
        body: JSON.stringify(apiData),
      }
    );

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching AdAttributes details:", error);
    return {
      success: false,
      error: error.message || "Unknown error occurred",
    };
  }
}