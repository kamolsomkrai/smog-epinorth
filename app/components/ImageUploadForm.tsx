"use client"
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import {
  FaUser,
  FaSchool,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCamera,
  FaLocationArrow,
  FaCloudUploadAlt,
} from 'react-icons/fa';

const ImageUploadForm = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // ฟิลด์ใหม่
  const [gender, setGender] = useState<number>(0);
  const [grade, setGrade] = useState<string>('');
  const [classroom, setClassroom] = useState<string>('');
  const [age, setAge] = useState<number | string>('');
  const [hasAccident, setHasAccident] = useState<string>('');
  const [accidentType, setAccidentType] = useState<string>('');
  const [accidentLocation, setAccidentLocation] = useState<string>('');
  const [accidentDate, setAccidentDate] = useState<string>('');
  const [hospitalTreatment, setHospitalTreatment] = useState<string>('');
  const [riskArea, setRiskArea] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
      const urls = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setPreviews(urls);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      setFiles(e.dataTransfer.files);
      const urls = Array.from(e.dataTransfer.files).map(file => URL.createObjectURL(file));
      setPreviews(urls);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: Number(position.coords.latitude.toFixed(8)),
            lng: Number(position.coords.longitude.toFixed(8)),
          });
        },
        (err) => {
          setError('Unable to retrieve your location');
          console.log(err)
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // ตรวจสอบว่าเป็นตัวเลขหรือไม่
    if (/^\d*$/.test(inputValue)) {
      setAge(inputValue);
    }
  };

  // ส่วนของการ submit ยังคงเดิม
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!files || !location) {
      setError('Please select files and allow location access.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    formData.append('latitude', location.lat.toString());
    formData.append('longitude', location.lng.toString());

    // เพิ่มฟิลด์ใหม่
    formData.append('gender', gender.toString());
    formData.append('grade', grade);
    formData.append('classroom', classroom);
    formData.append('age', age.toString());
    formData.append('hasAccident', hasAccident);
    formData.append('accidentType', accidentType);
    formData.append('accidentLocation', accidentLocation);
    formData.append('accidentDate', accidentDate);
    formData.append('hospitalTreatment', hospitalTreatment);
    formData.append('riskArea', riskArea);

    try {
      // ใช้ URL แบบสัมพัทธ์แทนการระบุ URL เต็ม
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful:', response.data);

      // ดึง URL ของรูปภาพที่อัพโหลด
      const uploadedUrls = Array.from(files).map(
        (file) => `/uploads/${file.name}`
      );
      setImageUrls(uploadedUrls);
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Upload failed. Please try again.');
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md"
      >
        <div className='mb-8'>
          <h1 className='flex items-center text-center justify-center text-2xl'>เก็บข้อมูลพิกัดจุดเสี่ยงอุบัติเหตุภายใน</h1>
          <h1 className='flex items-center text-center justify-center text-2xl'>โรงเรียนปริ้นส์รอยแยลวิทยาลัย</h1>
        </div>
        {/* Gender Field */}
        <div className="mb-4">
          <label htmlFor="gender" className="text-gray-700 font-medium mb-2 flex items-center">
            <FaUser className="mr-2" /> เพศ:
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(Number(e.target.value))}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">เลือกเพศ</option>
            <option value={1}>ชาย</option>
            <option value={2}>หญิง</option>
            <option value={3}>LGBTQ+</option>
          </select>
        </div>

        {/* Grade Field */}
        <div className="mb-4">
          <label htmlFor="grade" className="text-gray-700 font-medium mb-2 flex items-center">
            <FaSchool className="mr-2" /> ระดับชั้นเรียน:
          </label>
          <select
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">เลือกระดับชั้น</option>
            <option value="ป.4">ป.4</option>
            <option value="ป.5">ป.5</option>
            <option value="ป.6">ป.6</option>
            <option value="ม.1">ม.1</option>
            <option value="ม.2">ม.2</option>
            <option value="ม.3">ม.3</option>
            <option value="ม.4">ม.4</option>
            <option value="ม.5">ม.5</option>
            <option value="ม.6">ม.6</option>
          </select>
        </div>

        {/* Classroom Field */}
        <div className="mb-4">
          <label htmlFor="grade" className="text-gray-700 font-medium mb-2 flex items-center">
            <FaChalkboardTeacher className="mr-2" /> ห้องเรียน:
          </label>
          <select
            id="classroom"
            value={classroom}
            onChange={(e) => setClassroom(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">เลือกห้องเรียน</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>

        {/* Age Field */}
        <div className="mb-4">
          <label htmlFor="age" className="text-gray-700 font-medium mb-2 flex items-center">
            <FaUser className="mr-2" /> อายุ:
          </label>
          <input
            type="text"
            id="age"
            value={age}
            onChange={handleAgeChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Has Accident */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            คุณเคยเกิดอุบัติเหตุในโรงเรียนหรือไม่:
          </label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="hasAccident"
                value="yes"
                checked={hasAccident === 'yes'}
                onChange={() => setHasAccident('yes')}
                className="form-radio text-blue-600"
              />
              <span className="ml-2">ใช่</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="hasAccident"
                value="no"
                checked={hasAccident === 'no'}
                onChange={() => setHasAccident('no')}
                className="form-radio text-blue-600"
              />
              <span className="ml-2">ไม่</span>
            </label>
          </div>
        </div>

        {hasAccident === 'yes' && (
          <>
            {/* Accident Type */}
            <div className="mb-4">
              <label htmlFor="accidentType" className="block text-gray-700 font-medium mb-2">
                คุณเกิดอุบัติเหตุภายในโรงเรียนอย่างไร:
              </label>
              <input
                type="text"
                id="accidentType"
                value={accidentType}
                onChange={(e) => setAccidentType(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Accident Location */}
            <div className="mb-4">
              <label htmlFor="accidentLocation" className="block text-gray-700 font-medium mb-2">
                เกิดอุบัติเหตุในโรงเรียนบริเวณไหน:
              </label>
              <textarea
                id="accidentLocation"
                value={accidentLocation}
                onChange={(e) => setAccidentLocation(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded h-24"
              />
            </div>

            {/* Accident Date */}
            <div className="mb-4">
              <label htmlFor="accidentDate" className="text-gray-700 font-medium mb-2 flex items-center">
                <FaCalendarAlt className="mr-2" /> วันที่เกิดอุบัติเหตุ:
              </label>
              <input
                type="date"
                id="accidentDate"
                value={accidentDate}
                onChange={(e) => setAccidentDate(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Hospital Treatment */}
            <div className="mb-4">
              <label htmlFor="hospitalTreatment" className="block text-gray-700 font-medium mb-2">
                หลังเกิดอุบัติเหตุได้ไปรับการรักษาที่โรงพยาบาลหรือไม่:
              </label>
              <select
                id="hospitalTreatment"
                value={hospitalTreatment}
                onChange={(e) => setHospitalTreatment(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">เลือก</option>
                <option value="yes">ใช่</option>
                <option value="no">ไม่</option>
              </select>
            </div>
            {/* ส่วน Drag & Drop สำหรับอัปโหลดไฟล์ */}

            <div className="mb-4">
              <label className="text-gray-700 font-medium mb-2 flex items-center">
                <FaCamera className="mr-2" /> ภาพสถานที่เกิดอุบัติเหตุ:
              </label>
              <div className="flex">
                <label
                  htmlFor="images"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`relative border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
                    } p-6 text-center cursor-pointer hover:bg-gray-100 transition-colors duration-200 rounded-lg`}
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <FaCloudUploadAlt className="text-4xl text-gray-400" />
                    <p className="text-gray-600">ลากและวางไฟล์ที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
                    <p className="text-sm text-gray-500">รองรับไฟล์รูปภาพ (JPEG, PNG)</p>
                  </div>
                  <div className='hidden'><input
                    type="file"
                    id="images"
                    name="images"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  /></div>

                </label>
              </div>

              {previews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                  {previews.map((src, index) => (
                    <div key={index} className="relative w-full h-48 rounded-lg overflow-hidden shadow-sm">
                      <Image
                        src={src}
                        alt={`Preview ${index}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {hasAccident === 'no' && (
          <div className="mb-4">
            <label htmlFor="riskArea" className="block text-gray-700 font-medium mb-2">
              บริเวณไหนในโรงเรียนที่เป็นจุดเสี่ยง/จุดอันตราย:
            </label>
            <textarea
              id="riskArea"
              value={riskArea}
              onChange={(e) => setRiskArea(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded h-24"
            />
          </div>
        )}

        {/* Location Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={getCurrentLocation}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <FaLocationArrow className="mr-2" /> Get Current Location
          </button>
          {location && (
            <p className="mt-2 text-gray-700 flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              Location: {location.lat}, {location.lng}
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!location}
          className={`w-full text-white py-2 rounded ${location
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-gray-400 cursor-not-allowed'
            }`}
        >
          Submit
        </button>

        {/* แสดงภาพที่อัพโหลดแล้ว */}
        {imageUrls.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Uploaded Images:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="border p-2 rounded">
                  <div className="relative w-full h-48 mb-2">
                    <Image
                      src={url}
                      alt={`Uploaded ${index}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                      unoptimized
                    />
                  </div>
                  <p className="text-sm break-all text-gray-600">{url}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ImageUploadForm;