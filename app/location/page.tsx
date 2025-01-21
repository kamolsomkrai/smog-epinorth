import React from 'react'
import MapComponent from '../components/MapComponent';

const LocationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100">
      {/* Hero Section */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-extrabold text-center text-gray-800">
            แผนที่แสดงตำแหน่งที่เกิดอุบัติเหตุ
          </h1>
          <p className="mt-4 text-center text-gray-600">
            ช่วยให้คุณมองเห็นและวิเคราะห์ตำแหน่งที่เกิดอุบัติเหตุภายในโรงเรียน
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* <section className="bg-white rounded-lg shadow-md p-6"> */}
        {/* <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            แผนที่แสดงตำแหน่งที่เกิดอุบัติเหตุ
          </h2> */}
        <div className="w-full">
          <MapComponent />
        </div>
        {/* </section> */}

        {/* ส่วนเพิ่มเติม (ตัวอย่าง) */}
        {/* <section className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">ข้อมูลอุบัติเหตุ</h3>
              <p className="text-gray-600">
                ข้อมูลเกี่ยวกับการเกิดอุบัติเหตุภายในโรงเรียน รวมถึงสถานที่ เวลา และรายละเอียดอื่นๆ
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">การวิเคราะห์ข้อมูล</h3>
              <p className="text-gray-600">
                เครื่องมือในการวิเคราะห์ข้อมูลอุบัติเหตุ เพื่อช่วยในการวางแผนและป้องกันเหตุการณ์ในอนาคต
              </p>
            </div>
          </div>
        </section> */}
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} โรงเรียนปริ้นส์รอยแยลวิทยาลัย. สงวนลิขสิทธิ์.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LocationPage;