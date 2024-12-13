// app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import axios from 'axios';
import NewsSwiper from './NewsSwiper';
import ReportCard from './ReportCard';
import ReportModal from './ReportModal';

interface News {
  id: number;
  title: string;
  image_url: string;
  description: string;
}

interface Report {
  id: number;
  name: string;
  link: string;
  date: string;
  type: 'pdf' | 'image';
  file_url: string;
}

const HomePage: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news');
        setNews(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchReports = async () => {
      try {
        const response = await axios.get('/api/reports');
        setReports(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
    fetchReports();
  }, []);

  const handleCardClick = (report: Report) => {
    setSelectedReport(report);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedReport(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        ข่าวสารล่าสุด
      </Typography>

      <NewsSwiper />

      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 6 }}>
        รายงานต่าง ๆ
      </Typography>
      <Grid container spacing={4}>
        {reports.map((report) => (
          <Grid item xs={12} sm={6} md={4} key={report.id}>
            <ReportCard report={report} onClick={handleCardClick} />
          </Grid>
        ))}
      </Grid>

      <ReportModal
        open={modalOpen}
        handleClose={handleCloseModal}
        report={selectedReport}
      />
    </Container>
  );
};

export default HomePage;
