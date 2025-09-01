import { axiosInstance } from '../index';

export interface SubmitRatingRequest {
  token: string;
  stars: number;
  comment: string;
}

export interface RequestReviewTokenRequest {
  tenant: string;
  productId: string;
  customerEmail: string;
}

export interface SubmitRatingResponse {
  success: boolean;
  message?: string;
}

export interface RequestReviewTokenResponse {
  success: boolean;
  message?: string;
}

export interface Review {
  id: string;
  customerEmail: string;
  stars: number;
  comment: string;
  createdAt: string;
  orderNumber?: string;
  productName?: string;
  tenantName?: string;
}

export interface RatingDistribution {
  [key: number]: number;
}

export interface ProductReviewsResponse {
  ok: boolean;
  data: {
    reviews: Review[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
    statistics: {
      averageRating: number;
      totalReviews: number;
      ratingDistribution: RatingDistribution;
    };
  };
}

export const submitRating = async (data: SubmitRatingRequest): Promise<SubmitRatingResponse> => {
  try {
    const response = await axiosInstance.post('/order-confirmation/submit-rating', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al enviar la calificación');
  }
};

export const requestReviewToken = async (data: RequestReviewTokenRequest): Promise<RequestReviewTokenResponse> => {
  try {
    const response = await axiosInstance.post('/order-confirmation/generate-product-token', data, {
      params: {
        tenant: data.tenant,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al enviar el token de autorización');
  }
};

export const getProductReviews = async (productId: string, page: number = 1, limit: number = 3): Promise<ProductReviewsResponse> => {
  try {
    const response = await axiosInstance.get(`/order-confirmation/reviews/product/${productId}`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al obtener las reseñas del producto');
  }
};
