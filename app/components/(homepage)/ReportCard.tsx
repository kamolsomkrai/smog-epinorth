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
  file: string;
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
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: 3,
        '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
      }}
      onClick={() => onClick(report)}
    >
      {report.type === 'image' && (
        <CardMedia sx={{ height: 200, position: 'relative' }}>
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
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size="small">ดูรายละเอียด</Button>
      </CardActions>
    </Card>
  );
};

export default ReportCard;
