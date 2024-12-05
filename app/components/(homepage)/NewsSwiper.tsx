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

const newsData: News[] = [
  {
    id: 1,
    title: 'ข่าวสารที่ 1',
    image: '/images/news1.jpg',
    description: 'รายละเอียดของข่าวสารที่ 1',
  },
  {
    id: 2,
    title: 'ข่าวสารที่ 2',
    image: '/images/news2.jpg',
    description: 'รายละเอียดของข่าวสารที่ 2',
  },
  {
    id: 3,
    title: 'ข่าวสารที่ 3',
    image: '/images/news3.jpg',
    description: 'รายละเอียดของข่าวสารที่ 3',
  },
  // เพิ่มข่าวสารเพิ่มเติมตามต้องการ
];

const NewsSwiper: React.FC = () => {
  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
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
                <Typography variant="h5">{news.title}</Typography>
                <Typography variant="body1">{news.description}</Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default NewsSwiper;
