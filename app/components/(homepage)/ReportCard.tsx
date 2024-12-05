// app/components/ReportCard.tsx
"use client";

import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, CardMedia } from '@mui/material';
import Image from 'next/image';

interface Report {
  id: number;
  name: string;
  link: string;
  date: string;
  type: 'pdf' | 'image';
  file: string; // URL to PDF or image
}

interface ReportCardProps {
  report: Report;
  onClick: (report: Report) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, onClick }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 'auto',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.05)' }
      }}
    >
      {report.type === 'image' && (
        <CardMedia sx={{ position: 'relative', height: 200 }}>
          <Image
            src={report.file}
            alt={report.name}
            layout="fill"
            objectFit="cover"
            priority
          />
        </CardMedia>
      )}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {report.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          วันที่: {report.date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onClick(report)}>ดูรายละเอียด</Button>
      </CardActions>
    </Card>
  );
};

export default ReportCard;
