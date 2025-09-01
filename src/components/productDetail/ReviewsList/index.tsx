'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Stack,
    Avatar,
    Rating,
    Chip,
    Pagination,
    Divider,
    useTheme,
    Skeleton,
} from '@mui/material';
import { Star, Person } from '@mui/icons-material';
import { getProductReviews, Review } from '@/client/reviews';

interface ReviewsListProps {
    productName: string;
    productId: string;
}

export default function ReviewsList({ productName, productId }: ReviewsListProps) {
    const theme = useTheme();
    const [page, setPage] = useState(1);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 3,
        total: 0,
        pages: 0,
    });
    const [statistics, setStatistics] = useState({
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: {} as { [key: number]: number },
    });

    // Cargar reviews del producto
    useEffect(() => {
        const loadReviews = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await getProductReviews(productId, page, pagination.limit);

                setReviews(response.data.reviews);
                setPagination(response.data.pagination);
                setStatistics(response.data.statistics);
                console.log("response", response.data);
            } catch (error) {
                console.error('Error loading reviews:', error);
                setError(error instanceof Error ? error.message : 'Error al cargar las reseñas');
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            loadReviews();
        }
    }, [productId, page, pagination.limit]);

    // Reset page when product changes
    useEffect(() => {
        setPage(1);
    }, [productId]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getInitials = (email: string) => {
        const name = email.split('@')[0];
        return name
            .split('.')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    if (loading) {
        return (
            <Box sx={{ py: 6, px: 4 }}>
                <Paper sx={{ p: 4 }}>
                    <Stack spacing={3}>
                        <Skeleton variant="text" width="60%" height={40} />
                        <Skeleton variant="rectangular" height={100} />
                        <Skeleton variant="rectangular" height={100} />
                        <Skeleton variant="rectangular" height={100} />
                    </Stack>
                </Paper>
            </Box>
        );
    }

    if (statistics.totalReviews === 0) {
        return (
            <Box sx={{ py: 6, px: 4 }}>
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                        No hay reseñas aún
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Sé el primero en dejar una reseña para este producto
                    </Typography>
                </Paper>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 6, px: 4 }}>
            <Paper sx={{ p: 4 }}>
                {/* Header con estadísticas */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: theme.palette.primary.main }}>
                        Reseñas de clientes
                    </Typography>

                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
                        {/* Rating promedio */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h3" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                                {statistics.averageRating.toFixed(1)}
                            </Typography>
                            <Rating value={statistics.averageRating} precision={0.1} readOnly size="large" />
                            <Typography variant="body2" color="text.secondary">
                                Basado en {statistics.totalReviews} reseñas
                            </Typography>
                        </Box>

                        <Divider orientation="vertical" flexItem />

                        {/* Estadísticas */}
                        <Stack spacing={1} sx={{ flex: 1 }}>
                            {Object.entries(statistics.ratingDistribution)
                                .sort(([a], [b]) => parseInt(b) - parseInt(a))
                                .map(([rating, count]) => (
                                    <Box key={rating} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body2">{rating} estrellas</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {count} reseñas
                                        </Typography>
                                    </Box>
                                ))}
                        </Stack>
                    </Stack>
                </Box>

                <Divider sx={{ mb: 4 }} />

                {/* Lista de reviews */}
                <Stack spacing={3}>
                    {reviews.map((review) => (
                        <Box key={review.id}>
                            <Stack direction="row" spacing={2} alignItems="flex-start">
                                {/* Avatar */}
                                <Avatar
                                    sx={{
                                        bgcolor: theme.palette.primary.main,
                                        width: 48,
                                        height: 48,
                                    }}
                                >
                                    {getInitials(review.customerEmail)}
                                </Avatar>

                                {/* Contenido de la review */}
                                <Box sx={{ flex: 1 }}>
                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>

                                        {review.orderNumber && (
                                            <Chip
                                                label="Compra verificada"
                                                size="small"
                                                color="success"
                                                icon={<Star sx={{ fontSize: 16 }} />}
                                            />
                                        )}
                                    </Stack>

                                    <Rating value={review.stars} readOnly size="small" sx={{ mb: 1 }} />

                                    <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.6 }}>
                                        {review.comment}
                                    </Typography>

                                    <Typography variant="caption" color="text.secondary">
                                        {formatDate(review.createdAt)}
                                    </Typography>
                                </Box>
                            </Stack>

                            {review.id !== reviews[reviews.length - 1].id && (
                                <Divider sx={{ mt: 3 }} />
                            )}
                        </Box>
                    ))}
                </Stack>

                {/* Paginación */}
                {pagination.pages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={pagination.pages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                            showFirstButton
                            showLastButton
                        />
                    </Box>
                )}
            </Paper>
        </Box>
    );
}
