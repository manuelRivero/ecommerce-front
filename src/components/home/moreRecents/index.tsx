"use client";
import ProductCard from "@/components/shared/productCard";
import { Product } from "@/interfaces/products";
import {
  alpha,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import ProductGrid from "@/components/shared/ProductGrid";

interface Props {
  data: Product[];
  totalPages: number;
}
export default function MoreRecents({ data }: Props) {
  // const slideRefs = useRef<(HTMLElement | null)[]>([]);
  // const slideButtonRef = useRef<HTMLDivElement | null>(null);
  // const currentTargetRef = useRef<HTMLElement | null>(null);
  const isMobile = useMediaQuery("(max-width:1200px)");
  // const productChunks = chunkArray(data, 6);
  // const [offsets, setOffsets] = useState({ startY: 100, endY: 500 });
  // const [activeSlide, setActiveSlide] = useState<number>(0);

  // // Obtener el progreso del scroll relativo al container
  // const { scrollYProgress } = useScroll({
  //   target: currentTargetRef,
  //   offset: ["start start", "end end"],
  // });

  // // Mapear scrollYProgress de 0 a 1 en valores de top (startY a endY)
  // const arrowTop = useTransform(
  //   scrollYProgress,
  //   [0, 1],
  //   [offsets.startY, offsets.endY]
  // );

  // // Animar suavemente la posición top de las flechas
  // const animatedTop = useSpring(arrowTop, {
  //   stiffness: 120,
  //   damping: 80,
  // });

  // useEffect(() => {
  //   const currentSlideRef =
  //     slideRefs.current[activeSlide] || slideButtonRef.current;
  //   if (currentSlideRef) {
  //     const slideHeight = currentSlideRef.offsetHeight;
  //     const startY =
  //       slideHeight > 500
  //         ? slideHeight / 4 + 50
  //         : slideHeight - slideHeight / 2 + 50;
  //     const endY = slideHeight - slideHeight / 4 + 50;
  //     setOffsets({ startY, endY });
  //     console.log("startY", startY);
  //     const container = document.getElementById("hot-sales-container");
  //     container?.scrollIntoView({
  //       block: "start",
  //       behavior: "smooth",
  //     });
  //   } else {
  //   }
  // }, [activeSlide]);
  // useEffect(() => {
  //   currentTargetRef.current =
  //     slideRefs.current[activeSlide] || slideButtonRef.current;
  // }, [activeSlide]);
  return data.length === 0 ? null : (
    <Box
      id="more-recents-container"
      sx={{ position: "relative", minHeight: "60vh" }}
    >
      {}
      {isMobile && (
        <>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Typography variant="h2">Mas recientes</Typography>
          </Stack>
          <Box sx={{ paddingX: { md: 10 } }}>
            <Swiper
              modules={[Navigation, Pagination]}
              pagination={true}
              navigation={{
                prevEl: ".prev-more-recents",
                nextEl: ".next-more-recents",
              }}
              spaceBetween={25}
              slidesPerView={1}
              style={{ position: "relative", zIndex: 0 }}
              breakpoints={{
                600: {
                  slidesPerView: 2,
                },
              }}
            >
              {data.map((product: Product) => (
                <SwiperSlide
                  key={product._id}
                  style={{ position: "relative", zIndex: 0 }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <ProductCard data={product} />
                  </Box>
                </SwiperSlide>
              ))}
              <SwiperSlide style={{ height: "auto" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    component={Link}
                    href={"/descuentos"}
                  >
                    Ver todos los productos
                  </Button>
                </Box>
              </SwiperSlide>
            </Swiper>
          </Box>
        </>
      )}
      {!isMobile && (
        <>
          <ProductGrid title="Más recientes" data={data} />
        </>
        // <>
        //   <Box sx={{ paddingX: { md: 10 } }}>
        //     <Swiper
        //       modules={[Navigation, Pagination]}
        //       pagination={true}
        //       navigation={{
        //         prevEl: ".prev-hot-sales",
        //         nextEl: ".next-hot-sales",
        //       }}
        //       spaceBetween={25}
        //       slidesPerView={1}
        //       style={{ position: "relative", zIndex: 0 }}
        //       autoHeight={true}
        //       onSlideChange={(swiper: any) => {
        //         setActiveSlide(swiper.activeIndex);
        //       }}
        //       onSwiper={(swiper: any) => {
        //         setActiveSlide(swiper.activeIndex);
        //       }}
        //     >
        //       {productChunks.map((chunk, index) => (
        //         <SwiperSlide key={index}>
        //           <Box
        //             ref={(el: HTMLElement) => (slideRefs.current[index] = el)}
        //             sx={{
        //               display: "flex",
        //               gap: 4,
        //               flexWrap: "wrap",
        //               justifyContent: "flex-start",
        //               marginTop: 4,
        //             }}
        //           >
        //             {chunk.map((product) => (
        //               <ProductCard data={product} key={product._id} />
        //             ))}
        //           </Box>
        //         </SwiperSlide>
        //       ))}
        //       <SwiperSlide style={{ height: 400 }}>
        //         <Paper
        //           ref={slideButtonRef}
        //           sx={{
        //             display: "flex",
        //             flexDirection: "column",
        //             justifyContent: "center",
        //             alignItems: "center",
        //             height: "100%",
        //             padding: 4,
        //           }}
        //         >
        //           <>
        //             <Typography variant="h2" sx={{ marginBottom: 2 }}>
        //               ¡No dejes pasar estas ofertas!
        //             </Typography>
        //             <Typography variant="body1" sx={{ marginBottom: 2 }}>
        //               Descubre todos los productos con descuento y aprovecha
        //               precios únicos
        //             </Typography>
        //             <Button
        //               variant="contained"
        //               component={Link}
        //               href={"/mas-vendidos"}
        //             >
        //               Ver todos los descuentos
        //             </Button>
        //           </>
        //         </Paper>
        //       </SwiperSlide>
        //     </Swiper>
        //   </Box>

        //   {data.length > 1 && !isMobile && (
        //     <>
        //       <motion.div
        //         style={{
        //           top: animatedTop,
        //           position: "absolute",
        //           left: 10,
        //           transform: "translateY(-50%)",
        //           zIndex: 10,
        //         }}
        //       >
        //         <IconButton
        //           className="prev-hot-sales"
        //           sx={{ fontSize: "60px" }}
        //         >
        //           <ChevronLeft fontSize="inherit" />
        //         </IconButton>
        //       </motion.div>

        //       <motion.div
        //         style={{
        //           top: animatedTop,
        //           position: "absolute",
        //           right: 10,
        //           transform: "translateY(-50%)",
        //           zIndex: 10,
        //         }}
        //       >
        //         <IconButton
        //           className="next-hot-sales"
        //           sx={{ fontSize: "60px" }}
        //         >
        //           <ChevronRight fontSize="inherit" />
        //         </IconButton>
        //       </motion.div>
        //     </>
        //   )}
        // </>
      )}
      <Paper
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 4,
          marginTop: 4,
          backgroundImage: `linear-gradient(300deg, ${alpha(
            theme.palette.primary.main,
            0.2
          )} 60%, transparent 40%)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        })}
      >
        <>
          <Typography variant="h2" sx={{ marginBottom: 2 }}>
            Mas recientes
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Descubre los productos mas recientes
          </Typography>
          <Button variant="contained" component={Link} href={"/productos"}>
            Ver todos los productos
          </Button>
        </>
      </Paper>
    </Box>
  );
}
