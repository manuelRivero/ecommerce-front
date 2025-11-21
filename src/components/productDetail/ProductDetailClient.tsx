'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Detail from "@/components/productDetail/detail";
import Gallery from "@/components/productDetail/gallery";
import RandomCategoryProducts from "@/components/productDetail/randomCategoryProducts";
import RelatedProducts from "@/components/productDetail/relatedProducts";
import ReviewModal from "@/components/shared/ReviewModal";
import SuccessModal from "@/components/shared/SuccessModal";
import ErrorModal from "@/components/shared/ErrorModal";
import ReviewInvitation from "@/components/productDetail/ReviewInvitation";
import ReviewsList from "@/components/productDetail/ReviewsList";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Category, Inventory } from "@mui/icons-material";
import { submitRating } from "@/client/reviews";
import { ProductReviewsResponse } from "@/client/reviews";

interface ProductDetailClientProps {
  detail: any;
  categoryDetail: any;
  related: any;
  random: any;
  images: string[];
  token?: string;
  tenant: string;
  reviews: ProductReviewsResponse['data'];
}

export default function ProductDetailClient({
  detail,
  categoryDetail,
  related,
  random,
  images,
  token,
  tenant,
  reviews,
}: ProductDetailClientProps) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [lastRatingData, setLastRatingData] = useState<{ rating: number; comment: string } | null>(null);

  useEffect(() => {
    if (token) {
      setShowReviewModal(true);
    }
  }, [token]);

  const handleReviewSubmit = async (rating: number, comment: string) => {
    if (!token) {
      setErrorMessage('Token de autorización no válido');
      setShowErrorModal(true);
      return;
    }

    setLoading(true);
    setLastRatingData({ rating, comment });
    
    try {
      const data = await submitRating({
        token,
        stars: rating,
        comment,
      });

        setShowReviewModal(false);
        setShowSuccessModal(true);
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Hubo un error al enviar tu calificación. Por favor, intenta de nuevo.');
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastRatingData) {
      setShowErrorModal(false);
      setShowReviewModal(true);
      // El modal de review se abrirá automáticamente y el usuario podrá intentar de nuevo
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage('');
  };

  return (
    <>
      <Container sx={{ marginTop: 4, marginBottom: 4 }}>
        <Breadcrumb 
          items={[
            { 
              label: categoryDetail?.name || 'Categoría', 
              href: `/productos?categories=${detail.category}`,
              icon: <Category sx={{ fontSize: 16 }} />
            },
            { 
              label: detail.name, 
              icon: <Inventory sx={{ fontSize: 16 }} />
            }
          ]} 
        />
        <Paper>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box sx={{ padding: 4 }}>
                <Gallery images={images} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ padding: 4 }}>
                <Detail data={detail} reviews={reviews} />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Reviews List Section */}
        <ReviewsList productName={detail.name} productId={detail._id} reviews={reviews} />

        {/* Review Invitation Section */}
        <ReviewInvitation productName={detail.name} productId={detail._id} tenant={tenant} />

        <Paper>
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ padding: 4 }}>
                <RelatedProducts products={related.products[0].data} category={related.category} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ padding: 4 }}>
                <RandomCategoryProducts products={random.products[0].data} category={random.category} />
              </Box>
            </Grid>
          </Grid>
        </Paper>
        <Box sx={{ padding: 4 }}>
          <Typography variant="h3" sx={{ marginBottom: 4, textAlign: "center" }}>
            Sigue explorando nuestra tienda
          </Typography>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <Button component={Link} variant="contained" href={`/productos`}>
              Ver más productos
            </Button>
          </Stack>
        </Box>
      </Container>

      {/* Review Modal */}
      <ReviewModal
        open={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        productName={detail.name}
        onSubmit={handleReviewSubmit}
        loading={loading}
      />

      {/* Success Modal */}
      <SuccessModal
        open={showSuccessModal}
        onClose={handleCloseSuccessModal}
      />

      {/* Error Modal */}
      <ErrorModal
        open={showErrorModal}
        onClose={handleCloseErrorModal}
        onRetry={handleRetry}
        message={errorMessage}
      />
    </>
  );
}
