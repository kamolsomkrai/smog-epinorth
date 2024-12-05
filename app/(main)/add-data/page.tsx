// app/add-data/page.tsx
'use client';

import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, Button, Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const AddDataPage: React.FC = () => {
  // State สำหรับฟอร์มข่าวสาร
  const [newsTitle, setNewsTitle] = useState('');
  const [newsDescription, setNewsDescription] = useState('');
  const [newsFile, setNewsFile] = useState<File | null>(null);

  // State สำหรับฟอร์มรายงาน
  const [reportName, setReportName] = useState('');
  const [reportLink, setReportLink] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [reportType, setReportType] = useState<'pdf' | 'image'>('pdf');
  const [reportFile, setReportFile] = useState<File | null>(null);

  // Handlers สำหรับ Drag & Drop ของข่าวสาร
  const { getRootProps: getNewsRootProps, getInputProps: getNewsInputProps, isDragActive: isNewsDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif'],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setNewsFile(acceptedFiles[0]);
        console.log('Selected news file:', acceptedFiles[0]);
      }
    },
  });

  // Handlers สำหรับ Drag & Drop ของรายงาน
  const { getRootProps: getReportRootProps, getInputProps: getReportInputProps, isDragActive: isReportDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpeg', '.png', '.jpg', '.gif'],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setReportFile(acceptedFiles[0]);
        console.log('Selected report file:', acceptedFiles[0]);
      }
    },
  });

  // ฟังก์ชันสำหรับการส่งข้อมูลข่าวสาร
  const handleSubmitNews = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newsFile) {
      alert('กรุณาอัปโหลดไฟล์ภาพข่าวสาร');
      return;
    }

    const formData = new FormData();
    formData.append('title', newsTitle);
    formData.append('description', newsDescription);
    formData.append('image', newsFile);

    console.log('Submitting news data:', { title: newsTitle, description: newsDescription, image: newsFile.name });

    try {
      const response = await axios.post('/api/news', formData); // ลบ headers ออก
      alert('ข่าวสารถูกเพิ่มเรียบร้อยแล้ว');
      // รีเซ็ตฟอร์ม
      setNewsTitle('');
      setNewsDescription('');
      setNewsFile(null);
    } catch (error: any) {
      console.error('Error submitting news:', error);
      if (error.response) {
        alert(`เกิดข้อผิดพลาด: ${error.response.data.message || 'ไม่สามารถเพิ่มข่าวสารได้'}`);
      } else {
        alert('เกิดข้อผิดพลาดในการเพิ่มข่าวสาร');
      }
    }
  };

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reportFile) {
      alert('กรุณาอัปโหลดไฟล์รายงาน');
      return;
    }

    const formData = new FormData();
    formData.append('name', reportName);
    formData.append('link', reportLink);
    formData.append('date', reportDate);
    formData.append('type', reportType);
    formData.append('file', reportFile);

    console.log('Submitting report data:', { name: reportName, link: reportLink, date: reportDate, type: reportType, file: reportFile.name });

    try {
      const response = await axios.post('/api/reports', formData); // ลบ headers ออก
      alert('รายงานถูกเพิ่มเรียบร้อยแล้ว');
      // รีเซ็ตฟอร์ม
      setReportName('');
      setReportLink('');
      setReportDate('');
      setReportType('pdf');
      setReportFile(null);
    } catch (error: any) {
      console.error('Error submitting report:', error);
      if (error.response) {
        alert(`เกิดข้อผิดพลาด: ${error.response.data.message || 'ไม่สามารถเพิ่มรายงานได้'}`);
      } else {
        alert('เกิดข้อผิดพลาดในการเพิ่มรายงาน');
      }
    }
  };


  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        เพิ่มข้อมูลข่าวสารและรายงาน
      </Typography>

      <Grid container spacing={4}>
        {/* ฟอร์มเพิ่มข่าวสาร */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            เพิ่มข่าวสาร
          </Typography>
          <Box component="form" onSubmit={handleSubmitNews} sx={{ mt: 2 }}>
            <TextField
              label="หัวข้อข่าวสาร"
              variant="outlined"
              fullWidth
              required
              value={newsTitle}
              onChange={(e) => setNewsTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="รายละเอียดข่าวสาร"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={4}
              value={newsDescription}
              onChange={(e) => setNewsDescription(e.target.value)}
              sx={{ mb: 2 }}
            />

            <div
              {...getNewsRootProps()}
              style={{
                border: '2px dashed #ccc',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: isNewsDragActive ? '#f0f0f0' : '#fafafa',
                marginBottom: '16px',
              }}
            >
              <input {...getNewsInputProps()} />
              {isNewsDragActive ? (
                <p>ลากและวางไฟล์ที่นี่...</p>
              ) : (
                <p>ลากและวางไฟล์ภาพ หรือคลิกเพื่อเลือกไฟล์</p>
              )}
            </div>
            {newsFile && (
              <Typography variant="body1" gutterBottom>
                ไฟล์ที่เลือก: {newsFile.name}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary">
              เพิ่มข่าวสาร
            </Button>
          </Box>
        </Grid>

        {/* ฟอร์มเพิ่มรายงาน */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            เพิ่มรายงาน
          </Typography>
          <Box component="form" onSubmit={handleSubmitReport} sx={{ mt: 2 }}>
            <TextField
              label="ชื่อรายงาน"
              variant="outlined"
              fullWidth
              required
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="ลิงก์เอกสาร (ถ้ามี)"
              variant="outlined"
              fullWidth
              value={reportLink}
              onChange={(e) => setReportLink(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="วันที่"
              type="date"
              variant="outlined"
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth required sx={{ mb: 2 }}>
              <InputLabel id="report-type-label">ประเภทรายงาน</InputLabel>
              <Select
                labelId="report-type-label"
                id="report-type"
                value={reportType}
                label="ประเภทรายงาน"
                onChange={(e) => setReportType(e.target.value as 'pdf' | 'image')}
              >
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="image">ภาพ</MenuItem>
              </Select>
            </FormControl>

            <div
              {...getReportRootProps()}
              style={{
                border: '2px dashed #ccc',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: isReportDragActive ? '#f0f0f0' : '#fafafa',
                marginBottom: '16px',
              }}
            >
              <input {...getReportInputProps()} />
              {isReportDragActive ? (
                <p>ลากและวางไฟล์ที่นี่...</p>
              ) : (
                <p>ลากและวางไฟล์ PDF หรือภาพ, หรือคลิกเพื่อเลือกไฟล์</p>
              )}
            </div>
            {reportFile && (
              <Typography variant="body1" gutterBottom>
                ไฟล์ที่เลือก: {reportFile.name}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary">
              เพิ่มรายงาน
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddDataPage;
