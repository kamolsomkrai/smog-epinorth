"use client";

import React, { memo } from "react";
import { SupplySummary } from "../../types/types";

interface DataTableComponentProps {
  supplies: SupplySummary[];
  provinces: string[];
  calculateTotal: (supply: SupplySummary) => number;
}

const DataTableComponent: React.FC<DataTableComponentProps> = ({ supplies, provinces, calculateTotal }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">
                เวชภัณฑ์
              </th>
              {provinces.map((province) => (
                <th
                  key={province}
                  className="py-3 px-6 text-right font-medium uppercase tracking-wider"
                >
                  {province}
                </th>
              ))}
              <th className="py-3 px-6 text-right font-medium uppercase tracking-wider">
                เขต 1
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {supplies.map((supply, index) => {
              const total = calculateTotal(supply);
              return (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-4 px-6 text-gray-800 font-medium">
                    {supply.supplyname}
                  </td>
                  {provinces.map((province) => (
                    <td
                      key={province}
                      className="py-4 px-6 text-gray-800 text-right"
                    >
                      {new Intl.NumberFormat().format(
                        typeof supply[province] === "number"
                          ? supply[province]
                          : parseFloat(supply[province] as string) || 0
                      )}
                    </td>
                  ))}
                  <td className="py-4 px-6 text-gray-800 text-right font-semibold">
                    {new Intl.NumberFormat().format(total)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(DataTableComponent);
