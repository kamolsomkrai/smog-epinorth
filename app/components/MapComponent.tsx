'use client'; // ใช้ client component เนื่องจากมีการใช้ React hooks และ Leaflet

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { renderToString } from 'react-dom/server';
import { FaMapMarkerAlt } from 'react-icons/fa';

// กำหนดสไตล์สำหรับไอคอนของหมุด
const createCustomIcon = (hospitalTreatment: 'yes' | 'no') => {
  const color = hospitalTreatment === 'yes' ? 'red' : 'blue';
  const iconString = renderToString(
    <FaMapMarkerAlt className={`w-8 h-8 text-${color}-500`} />
  );
  return L.divIcon({
    html: iconString,
    iconSize: [32, 32], // ขนาดไอคอน
    iconAnchor: [16, 32], // จุดยึดไอคอน
    popupAnchor: [0, -32], // จุดยึด Popup
    className: 'bg-transparent border-none', // ลบพื้นหลังและเส้นขอบ
  });
};

interface Location {
  lat: number;
  lng: number;
  imageUrl: string;
  hospitalTreatment: 'yes' | 'no'; // เพิ่ม field นี้
}

const MapComponent = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  // ดึงข้อมูล location และรูปภาพจาก API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/locations');
        const data = await response.json();
        console.log(data); // ตรวจสอบข้อมูลในคอนโซล
        setLocations(data);
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <MapContainer
        center={[18.796764904525585, 99.00536848288633]} // ตำแหน่งเริ่มต้น (กรุงเทพฯ)
        zoom={30}
        className="w-full h-[650px]" // ปรับความกว้างและความสูง
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lng]}
            icon={createCustomIcon(location.hospitalTreatment)} // ใช้ไอคอนแบบไดนามิก
          >
            <Popup>
              <div className="w-64"> {/* ปรับความกว้างของ container */}
                <Image
                  src={location.imageUrl}
                  alt={`Location ${index}`}
                  width={300} // ปรับความกว้างของรูปภาพ
                  height={200} // ปรับความสูงของรูปภาพ
                  className="rounded-lg"
                />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;