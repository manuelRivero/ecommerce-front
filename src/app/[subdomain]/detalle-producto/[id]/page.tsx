import {
  getProductDetail,
  getRandomCategoryProducts,
  getRelatedProducts,
} from "@/client/products";
import { getCategoryDetail } from "@/client/categories";
import ProductDetailClient from "@/components/productDetail/ProductDetailClient";
import { cleanHtmlForMetadata } from "@/utils/products";
import React from "react";

export async function generateMetadata({ params }: any) {
  try {
    const { id } = await params;
    const { data } = await getProductDetail(id);
    console.log("generateMetadata data", data);
    const metadataBase = new URL(
      data.product.images[0].url.split("com")[0] + "com"
    );
    console.log("metadataBase", metadataBase);
    // Limpiar HTML de la descripción para metadatos
    const cleanDescription = cleanHtmlForMetadata(data.product.description, 160);
    
    return {
      metadataBase: metadataBase.origin,
      title: data.product.name,
      description: cleanDescription,
      keywords: data.product.keywords,
      openGraph: {
        title: data.product.name,
        description: cleanDescription,
        type: "article",
        images: [
          {
            url: data.product.images[0].url,
            width: 1200,
            height: 630,
            alt: data.product.name,
          },
        ],
      },
    };
  } catch (error: any) {
    console.error("Error generating metadata:", error);
    return null;
  }
}

const getData = async (id: string, tenant: string) => {
  try {
    const { data } = await getProductDetail(id);
    console.log("data", data);
    const [relatedProductsData, randomCategoryProducts, categoryDetailData] = await Promise.all([
      getRelatedProducts(tenant, data.product.category, 0, id),
      getRandomCategoryProducts(tenant, data.product.category),
      data.product.category 
        ? getCategoryDetail(tenant, data.product.category)
        : Promise.resolve({ data: { category: null } }),
    ]);
    return {
      detail: data.product,
      categoryDetail: categoryDetailData.data.category,
      related: {
        products: relatedProductsData.data.relatedProducts,
        category: relatedProductsData.data.category
      },
      random: {
        products: randomCategoryProducts.data.randomCategoryProducts,
        category: randomCategoryProducts.data.category,
      },
    };
  } catch (error) {
    throw error;
  }
};

export default async function ProductDetail({ params, searchParams }: any) {
  const { id, subdomain } = await params;
  const { detail, categoryDetail, related, random } = await getData(id, subdomain);
  const images = detail.images.map((image: any) => image.url);
  const resolvedSearchParams = await searchParams;
  const token = resolvedSearchParams?.token;
  console.log("random", random);
  return (
    <ProductDetailClient
      detail={detail}
      categoryDetail={categoryDetail}
      related={related}
      random={random}
      images={images}
      token={token}
      tenant={subdomain}
    />
  );
}
