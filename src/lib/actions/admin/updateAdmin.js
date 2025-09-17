"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function updateAdmin({
  id,
  name,
  email,
  phoneNumber,
  roleId,
  isActive,
}) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw new Error("Authentication token not found");
    }

    // Ensure phone number starts with +
    // const formattedPhone = phoneNumber.startsWith("+")
    //   ? phoneNumber
    //   : `+${phoneNumber}`;

    const res = await fetch(`${BASE_URL}/Account/updateAdmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Language: "1",
        Platform: "1",
      },
      body: JSON.stringify({
        id: parseInt(id),
        name,
        email,
        //phoneNumber: formattedPhone,
        phoneNumber,
        isActive: Boolean(isActive),
        roleId: parseInt(roleId),
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);
      throw new Error(errorData?.message || "Failed to update admin");
    }
    const data=await res.json();
    console.log("update",data)
    //return await res.json();
    return data;
  } catch (error) {
    console.error("Failed to update admin:", error);
    throw error;
  }
}
