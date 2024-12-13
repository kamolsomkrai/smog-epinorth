// app/components/ReportModal.tsx
"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Box, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Image from 'next/image';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Report {
  id: number;
  name: string;
  link: string;
  date: string;
  type: 'pdf' | 'image';
  file: string;
}

interface ReportModalProps {
  open: boolean;
  handleClose: () => void;
  report: Report | null;
}

const ReportModal: React.FC<ReportModalProps> = ({ open, handleClose, report }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => (numPages && prev < numPages ? prev + 1 : prev));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {report?.name}
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
        {report && report.type === 'pdf' ? (
          <Box>
            <Document file={report.file} onLoadSuccess={onDocumentLoadSuccess} loading="กำลังโหลดเอกสาร...">
              <Page pageNumber={pageNumber} width={700} />
            </Document>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
              <Button variant="contained" onClick={goToPrevPage} disabled={pageNumber <= 1}>
                หน้าก่อนหน้า
              </Button>
              <Typography variant="body1" sx={{ mx: 2 }}>
                หน้า {pageNumber} จาก {numPages}
              </Typography>
              <Button variant="contained" onClick={goToNextPage} disabled={pageNumber >= (numPages || 1)}>
                หน้าถัดไป
              </Button>
            </Box>
          </Box>
        ) : report && report.type === 'image' ? (
          <Box sx={{ position: 'relative', width: '100%', height: '500px' }}>
            <Image src={report.file} alt={report.name} layout="fill" objectFit="contain" />
          </Box>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
