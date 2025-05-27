import EmptyProducts from "@/components/home/emptyProducts";
import ProductCard from "@/components/shared/productCard";
import { Product } from "@/interfaces/products";
import { Box, Pagination, Stack, Typography } from "@mui/material";
interface Props {
  data: Product[];
  title: string;
}

export default function ProductGrid({ data, title }: Props) {
  return (
    <Box id="grid-container" sx={{ position: "relative", minHeight: "60vh" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h2">{title}</Typography>
      </Stack>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 6,
          marginTop: 4,
        }}
      >
        {data.map((product: Product) => (
          <ProductCard data={product} key={product._id} />
        ))}
      </Box>
      {data.length === 0 && <EmptyProducts />}
    </Box>
  );
}
