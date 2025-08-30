import { AxiosResponse } from "axios";
import { axiosInstance } from "..";

export interface BlogPost {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: {
    url: string;
    alt: string;
    _id: string;
  };
  images: any[];
  tenant: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
  keywords: string[];
}

export interface BlogsResponse {
  blogs: BlogPost[];
  totalPages: number;
  currentPage: number;
  totalBlogs: number;
}

export const getPublicBlogs = async (
  subdomain: string,
  page: number = 0,
  limit: number = 10
): Promise<{ data: BlogsResponse }> => {
  try {
    return await axiosInstance.get(`/blogs/public?page=${page}&limit=${limit}`, {
      params: {
        tenant: subdomain,
      },
    });     

    
  } catch (error) {
    console.error('Error fetching public blogs:', error);
    throw error;
  }
};

export const getBlogBySlug = async (
  subdomain: string,
  slug: string
): Promise<{ data: BlogPost }> => {
  try {
    return await axiosInstance.get(`/blogs/public/${slug}`, {
      params: {
        tenant: subdomain,
      },
    });

    
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    throw error;
  }
};

export const getBlogsByCategory = async (
  subdomain: string,
  category: string,
  page: number = 0,
  limit: number = 10
): Promise<{ data: BlogsResponse }> => {
  try {
    return await axiosInstance.get(`/blogs/public/category/${category}?page=${page}&limit=${limit}`, {
      params: {
        tenant: subdomain,
      },
    }); 

    
  } catch (error) {
    console.error('Error fetching blogs by category:', error);
    throw error;
  }
};
