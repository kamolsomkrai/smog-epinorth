import React from 'react';
// import Image from 'next/image';
import PM25Table from '../components/(homepage)/Pm25Table';

const Page = () => {
  return (
    <div>
      <div className='flex justify-center mb-4'><h1 className='text-2xl'>อำเภอที่มีผลกระทบต่อสุขภาพจากฝุ่นPM₂.₅ เกิน 75.1 µg/m³</h1></div>
      <PM25Table />
    </div>
  );
};

export default Page;
