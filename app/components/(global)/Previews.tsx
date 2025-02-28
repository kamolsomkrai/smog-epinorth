"use client";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { Measure1UploadData } from "../../interfaces/newmeasure";

interface FileWithPreview extends File {
  preview: string;
  rawFile: File; // เก็บ File object จริง
  customName: string; // ชื่อใหม่ที่เป็น UUID
}

interface PreviewsProps {
  onFilesChange: (files: Measure1UploadData[]) => void;
}

const Previews: React.FC<PreviewsProps> = ({ onFilesChange }) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [], "application/pdf": [] },
    maxFiles: 5,
    onDrop: (acceptedFiles: File[]) => {
      const mappedFiles: FileWithPreview[] = acceptedFiles.map((file) => {
        const parts = file.name.split(".");
        const extension = parts.length > 1 ? parts.pop() || "" : "";
        const newFileName = extension ? `${uuidv4()}.${extension}` : uuidv4();
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
          rawFile: file,
          customName: newFileName,
        });
      });
      setFiles(mappedFiles);

      // ส่งข้อมูลไฟล์พร้อมชื่อใหม่ (UUID) โดยใช้ key "files" สำหรับ File object
      // และ key "fileNames" สำหรับชื่อใหม่
      const uploadDataFiles: Measure1UploadData[] = mappedFiles.map((file) => ({
        activityId: 0,
        filePath: file.preview, // สำหรับ preview
        fileName: file.customName, // ชื่อไฟล์ใหม่ (UUID)
        fileType: file.type,
        extension: file.customName.split(".").pop() || "",
        fileSize: file.size.toString(),
        rawFile: file, // ส่ง File object จริง
      }));
      onFilesChange(uploadDataFiles);
    },
  });

  const thumbs = files.map((file) => (
    <div
      key={file.name}
      className="relative inline-flex rounded overflow-hidden border border-gray-200 mb-2 mr-2 w-[100px] h-[100px] p-1 shadow-md"
    >
      <div className="relative w-full h-full">
        <Image src={file.preview} alt={file.name} fill style={{ objectFit: "cover" }} unoptimized />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="max-w-xl mx-auto p-4">
      <div
        {...getRootProps({
          className: `border-2 border-dashed p-6 rounded cursor-pointer text-center transition-colors duration-300 ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white hover:bg-gray-50"
            }`,
        })}
      >
        <input {...getInputProps()} />
        <p className="text-lg font-medium text-gray-700">
          {isDragActive ? "ปล่อยไฟล์ที่นี่..." : "ลากและวางไฟล์ที่นี่ หรือคลิกเพื่อเลือกไฟล์ (สูงสุด 5 ไฟล์)"}
        </p>
        <p className="text-sm text-gray-500 mt-2">รองรับไฟล์รูปภาพ (JPEG, PNG) และ PDF</p>
      </div>
      {files.length > 0 && (
        <aside className="mt-6 grid grid-cols-3 gap-4">
          {thumbs}
        </aside>
      )}
    </section>
  );
};

export default Previews;
