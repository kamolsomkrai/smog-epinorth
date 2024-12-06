// app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Dialog, DialogTitle, DialogContent, IconButton, Box, CardActions } from '@mui/material';
import Image from 'next/image';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import CloseIcon from '@mui/icons-material/Close';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import { useRouter } from 'next/navigation';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface News {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface Report {
  id: number;
  name: string;
  link: string;
  date: string;
  type: 'pdf' | 'image';
  file_url: string;
  created_at: string;
  updated_at: string;
}

const HomePage: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  // const router = useRouter();

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
    setPageNumber(1);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber(prev => (prev > 1 ? prev - 1 : prev));
  };

  const goToNextPage = () => {
    setPageNumber(prev => (prev < numPages ? prev + 1 : prev));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* ข่าวสาร */}
      <Typography variant="h4" align="center" gutterBottom>
        ข่าวสารล่าสุด
      </Typography>
      <Grid container spacing={4}>
        {news.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ maxWidth: 345, margin: 'auto', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: 3, '&:hover': { transform: 'scale(1.05)', boxShadow: 6 } }}>
              <CardMedia>
                <Image
                  src={item.image_url}
                  alt={item.title}
                  width={345}
                  height={200}
                  style={{ objectFit: 'cover' }}
                  placeholder="blur"
                  blurDataURL="/images/placeholder.png" // เพิ่ม placeholder image
                />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* รายงาน */}
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 6 }}>
        รายงานต่าง ๆ
      </Typography>
      <Grid container spacing={4}>
        {reports.map((report) => (
          <Grid item xs={12} sm={6} md={4} key={report.id}>
            <Card
              sx={{
                maxWidth: 345,
                margin: 'auto',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: 3,
                '&:hover': { transform: 'scale(1.05)', boxShadow: 6 }
              }}
              onClick={() => handleCardClick(report)}
            >
              {report.type === 'image' && (
                <CardMedia>
                  <Image
                    src={report.file_url}
                    alt={report.name}
                    width={345}
                    height={200}
                    style={{ objectFit: 'cover' }}
                  />
                </CardMedia>
              )}
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {report.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  วันที่: {new Date(report.date).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleCardClick(report)}>ดูรายละเอียด</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal สำหรับแสดงรายงาน */}
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedReport?.name}
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedReport && selectedReport.type === 'pdf' ? (
            <Box>
              <Document
                file={selectedReport.file_url}
                onLoadSuccess={onDocumentLoadSuccess}
                loading="กำลังโหลดเอกสาร..."
              >
                <Page pageNumber={pageNumber} width={700} />
              </Document>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                <Button variant="contained" onClick={goToPrevPage} disabled={pageNumber <= 1}>
                  Previous
                </Button>
                <Typography variant="body1" sx={{ mx: 2 }}>
                  Page {pageNumber} of {numPages}
                </Typography>
                <Button variant="contained" onClick={goToNextPage} disabled={pageNumber >= numPages}>
                  Next
                </Button>
              </Box>
            </Box>
          ) : selectedReport && selectedReport.type === 'image' ? (
            <Image
              src={selectedReport.file_url}
              alt={selectedReport.name}
              width={800}
              height={600}
              layout="responsive"
              objectFit="contain"
              placeholder="blur"
              blurDataURL="/images/placeholder.png" // เพิ่ม placeholder image
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default HomePage;
