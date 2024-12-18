// app/types.ts
export interface SupplySummary {
  supplyname: string;
  category: string;
  [key: string]: string | number;
}

export interface SummaryData {
  provinces: string[];
  supplies: SupplySummary[];
}
