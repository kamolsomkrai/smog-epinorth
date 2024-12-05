// app/components/ReportModal.tsx
"use client";

import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Image from 'next/image';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface ReportModalProps {
  open: boolean;
  handleClose: () => void;
  report: {
    id: number;
    name: string;
    link: string;
    date: string;
    type: 'pdf' | 'image';
    file: string;
  } | null;
}

const ReportModal: React.FC<ReportModalProps> = ({ open, handleClose, report }) => {
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
          <Document file={report.file}>
            <Page pageNumber={1} />
            {/* สามารถเพิ่มการควบคุมเพื่อเลื่อนหน้าของ PDF ได้ */}
          </Document>
        ) : report && report.type === 'image' ? (
          <Box sx={{ position: 'relative', width: '100%', height: '500px' }}>
            <Image
              src={report.file}
              alt={report.name}
              layout="fill"
              objectFit="contain"
            />
          </Box>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
