// app/supplies/page.tsx
"use client";

import React from "react";
import Supplies from "../components/Supplies";

const SuppliesPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Supplies</h1>
      <Supplies />
    </div>
  );
};

export default SuppliesPage;
