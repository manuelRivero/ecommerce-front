import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
});

// Export super-admin features
export * from './super-admin/features';
export * from './super-admin/plans';
export * from './super-admin/tenants';

// Export super-admin plans
export * from './super-admin/plans';
