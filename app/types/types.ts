// app/types.ts
export interface SupplySummary {
  supplyname: string;
  category: string;
  // ฟิลด์ dynamic สำหรับเก็บข้อมูลของจังหวัดแต่ละจังหวัด
  [key: string]: string | number;
}

export interface SummaryData {
  provinces: string[];
  supplies: SupplySummary[];
}
