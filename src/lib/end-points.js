const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// USERS ADMIN URL
const BASE_ADMIN_USERS = `${BASE_URL}/Account`;
export const USERS_ADMIN_URLS = {
    getAdmins: `${BASE_ADMIN_USERS}/getAllUsersListForAdmin`,
};

