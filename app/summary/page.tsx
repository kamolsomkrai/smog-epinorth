// app/summary/page.tsx
"use client";

import React from "react";
import Summary from "../components/Summary";

const SummaryPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Summary</h1>
      <Summary />
    </div>
  );
};

export default SummaryPage;
