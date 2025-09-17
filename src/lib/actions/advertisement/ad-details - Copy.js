// "use server";

// import { cookies } from "next/headers";

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// export async function getAdvertisementById(advertisementId) {
//   try {
//     const cookieStore = cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       throw new Error("Authentication token not found");
//     }

//     const url = new URL(`${BASE_URL}/Advertisement/getAdDetails`);
//     url.searchParams.set("id", advertisementId); // Assuming id is passed as a query param

//     const res = await fetch(url.toString(), {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Language: "1",
//         Platform: "1",
//       },
//       cache: "no-store", // Ensure fresh data
//     });

//     if (!res.ok) {
//       const errorData = await res.json();
//       console.error(errorData);
//       throw new Error(errorData?.message || "Failed to fetch advertisement details");
//     }

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching advertisement details:", error);
//     throw error;
//   }
// }
// lib/actions/advertisement/ad-details.js

// "use server";

// import { cookies } from "next/headers";

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// export async function getAdvertisementById(advertisementId) {
//   try {
//     const cookieStore = cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       throw new Error("Authentication token not found");
//     }

//     const url = new URL(`${BASE_URL}/Advertisement/getAdDetails`);
//     url.searchParams.set("id", advertisementId);

//     const res = await fetch(url.toString(), {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Language: "1",
//         Platform: "1",
//       },
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       const errorData = await res.json();
//       console.error("API Error:", errorData);
//       throw new Error(errorData?.message || "Failed to fetch ad details");
//     }

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching advertisement details:", error.message);
//     throw error;
//   }
// }

// "use server";

// import { cookies } from "next/headers";

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// export async function getAdvertisementDetails(id) {
//   try {
//     const cookieStore = cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       throw new Error("Authentication token not found");
//     }

//     const response = await fetch(
//       `${BASE_URL}/Advertisement/getAdDetails?id=${id}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Language: "1", // Adjust based on your language logic
//           Platform: "1", // Adjust based on your platform logic
//         },
//         cache: "no-store", // Disable caching for fresh data
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return { success: true, data };
//   } catch (error) {
//     console.error("Error fetching advertisement details:", error);
//     return { success: false, error: error.message };
//   }
// }

// "use server";

// import { cookies } from "next/headers";

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// export async function getAdvertisementDetails(id) {
//   try {
//     const cookieStore = cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       return { success: false, error: "Authentication token not found" };
//     }

//     const response = await fetch(
//       `${BASE_URL}/Advertisement/getAdDetails?id=${id}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           Language: "1",
//           Platform: "1",
//         },
//         cache: "no-store",
//       }
//     );

//     if (!response.ok) {
//       return {
//         success: false,
//         error: `HTTP error! status: ${response.status}`,
//       };
//     }

//     const data = await response.json();
//     return { success: true, data };
//   } catch (error) {
//     console.error("Error fetching advertisement details:", error);
//     return {
//       success: false,
//       error: error.message || "Unknown error occurred",
//     };
//   }
// }



// lib/actions/advertisement/ad-details.js
"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

export async function updateAdvertisementDetails(id, updates) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, error: "Authentication token not found" };
    }

    const response = await fetch(
      `${BASE_URL}/Advertisement/updateAd`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Language: "1",
          Platform: "1",
        },
        body: JSON.stringify({
          id,
          ...updates
        }),
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
