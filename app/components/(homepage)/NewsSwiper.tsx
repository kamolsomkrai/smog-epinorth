// app/components/NewsSwiper.tsx
"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { Box, Typography } from '@mui/material';

interface News {
  id: number;
  title: string;
  image: string;
  description: string;
}

const NewsSwiper: React.FC<{ newsData: News[] }> = ({ newsData }) => {
  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 5000 }}
        loop
        style={{ height: '400px' }}
      >
        {newsData.map((news) => (
          <SwiperSlide key={news.id}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                backgroundImage: `url(${news.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: '#fff',
                  padding: 2,
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  {news.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {news.description}
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default NewsSwiper;
