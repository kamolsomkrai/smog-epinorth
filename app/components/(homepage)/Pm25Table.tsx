// components/(homepage)/Pm25Table.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Box
} from "@mui/material";

type PM25Record = {
  province: string;
  amphur: string;
  collect_date: string;
  event_valid: number;
  pm25_max: string;
  color: string;
};

// แปลงวันที่เป็นรูปแบบ buddhist (ย่อปี 2 ตัว) เช่น 68-03-01
const formatBuddhistDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const buddhistYear = date.getFullYear() + 543;
  const year = buddhistYear.toString().slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

// กำหนด default end_date เป็นเมื่อวาน และ start_date เป็น 10 วันก่อนจาก end_date
const getDefaultDates = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate());
  const defaultEndDate = yesterday.toISOString().split("T")[0];
  const tenDaysAgo = new Date(yesterday.getTime() - 10 * 24 * 60 * 60 * 1000);
  const defaultStartDate = tenDaysAgo.toISOString().split("T")[0];
  return { defaultStartDate, defaultEndDate };
};

const { defaultStartDate, defaultEndDate } = getDefaultDates();

// รายชื่อจังหวัดสำหรับ filter
const filterProvinces = [
  "เชียงใหม่",
  "เชียงราย",
  "ลำปาง",
  "ลำพูน",
  "แพร่",
  "น่าน",
  "พะเยา",
  "แม่ฮ่องสอน"
];

const PM25Table = () => {
  const [data, setData] = useState<PM25Record[]>([]);
  const [provinceFilter, setProvinceFilter] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(defaultStartDate);
  const [endDate, setEndDate] = useState<string>(defaultEndDate);
  const [searchOn, setSearchOn] = useState<boolean>(false);
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  const [rows, setRows] = useState<
    {
      province: string;
      amphur: string;
      records: Record<string, PM25Record>;
    }[]
  >([]);
  // สำหรับ toggle แถว
  const [showAllRows, setShowAllRows] = useState<boolean>(false);
  const maxVisibleRows = 5;
  const displayRows = searchOn
    ? rows.filter((row) =>
      Object.values(row.records).some((record) => record.event_valid === 1)
    )
    : rows;
  const visibleRows = showAllRows ? displayRows : displayRows.slice(0, maxVisibleRows);

  // ดึงข้อมูลจาก API /pm25 ตาม payload filter ที่ส่งไป
  const fetchData = async () => {
    const payload = {
      province: provinceFilter,
      start_date: startDate,
      end_date: endDate,
      // search: searchOn ? 1 : 0
    };

    const res = await fetch("/api/pm25", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const result = await res.json();
      setData(result);
    } else {
      console.error("API Error");
    }
  };

  // ดึงข้อมูล API เมื่อ component mount
  useEffect(() => {
    fetchData();
  }, []);

  // จัดกลุ่มข้อมูลใหม่เมื่อมีการเปลี่ยนแปลง data หรือ provinceFilter
  useEffect(() => {
    const tempData = provinceFilter
      ? data.filter((item) => item.province === provinceFilter)
      : data;

    // สร้างชุดวันที่ไม่ซ้ำในรูปแบบ buddhist
    const datesSet = new Set<string>();
    tempData.forEach((item) => {
      datesSet.add(formatBuddhistDate(item.collect_date));
    });
    const datesArray = Array.from(datesSet).sort();
    setUniqueDates(datesArray);

    // จัดกลุ่มข้อมูลเป็น rows ตาม province และ amphur
    const groupMap: {
      [key: string]: { province: string; amphur: string; records: Record<string, PM25Record> };
    } = {};
    tempData.forEach((item) => {
      const key = `${item.province}-${item.amphur}`;
      const formattedDate = formatBuddhistDate(item.collect_date);
      if (!groupMap[key]) {
        groupMap[key] = { province: item.province, amphur: item.amphur, records: {} };
      }
      groupMap[key].records[formattedDate] = item;
    });
    setRows(Object.values(groupMap));
  }, [data, provinceFilter]);

  const provinceOptions = filterProvinces;

  return (
    <Container>
      {/* ฟอร์มตัวกรอง */}
      <Paper
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#f9f9f9"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>จังหวัด</InputLabel>
            <Select
              value={provinceFilter}
              label="Province"
              onChange={(e) => setProvinceFilter(e.target.value)}
            >
              <MenuItem value="">ทั้งหมด</MenuItem>
              {provinceOptions.map((prov) => (
                <MenuItem key={prov} value={prov}>
                  {prov}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <FormControlLabel
            control={<Switch checked={searchOn} onChange={(e) => setSearchOn(e.target.checked)} />}
            label="เกิน 75.1 >= 3 วัน"
          />
          <Button variant="contained" onClick={fetchData}>
            ค้นหา
          </Button>
        </Box>
        <p className="text-gray-400 mt-4">
          * หมายเหตุ ใน 1 อำเภอ อาจมีสถานีตรวจวัดหลายสถานีตรวจวัด {'>>'} การเลือกใช้ค่า PM2.5 เฉลี่ย 24 ชั่วโมง รายวัน ของแต่ละอำเภอ มาตรวจสอบและใช้ค่าสูงสุดของอำเภอนั้นๆ
          และเลือกข้อมูล จากระบบ AIR4THAI, NTAQHI, CCDC(DustBoy) และ GISTDA มาใช้ตามลำดับ
        </p>
      </Paper>

      {/* ตารางแสดงข้อมูล พร้อม scrollbar แนวนอน */}
      <TableContainer
        component={Paper}
        sx={{
          overflowX: "auto",
          boxShadow: 3,
          borderRadius: 2,
          mb: 2,
          backgroundColor: "#fff"
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ height: 30 }}>
              <TableCell sx={{ fontWeight: "bold", py: 0.5, px: 1 }}>จังหวัด</TableCell>
              <TableCell sx={{ fontWeight: "bold", py: 0.5, px: 1 }}>อำเภอ</TableCell>
              {uniqueDates.map((date) => (
                <TableCell key={date} align="center" sx={{ fontWeight: "bold", py: 0.5, px: 1 }}>
                  {date}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row, idx) => (
              <TableRow key={idx} sx={{ height: 30 }}>
                <TableCell sx={{ py: 0.5, px: 1 }}>{row.province}</TableCell>
                <TableCell sx={{ py: 0.5, px: 1 }}>{row.amphur}</TableCell>
                {uniqueDates.map((date) => {
                  const record = row.records[date];
                  let bgColor = record ? record.color : undefined;
                  if (searchOn && record && record.event_valid !== 1) {
                    bgColor = "#ffffff";
                  }
                  return (
                    <TableCell
                      key={date}
                      align="center"
                      sx={{ backgroundColor: bgColor, py: 0.5, px: 1 }}
                    >
                      {record ? record.pm25_max : ""}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ปุ่ม See more / See less สำหรับแถว โดยเลื่อนขึ้นมาหน่อยและลด opacity */}
      {displayRows.length > maxVisibleRows && (
        <Box textAlign="center" sx={{ mt: -2, mb: 2, opacity: 0.7 }}>
          <Button variant="outlined" onClick={() => setShowAllRows(!showAllRows)}>
            {showAllRows ? "See less rows" : "See more rows"}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default PM25Table;
