// components/(global)/InputRow.tsx
import React from 'react';

export interface Field {
  title?: string;
  id: string;
  name: string;
  label: string;
  type: string;
  value?: number;
}

interface InputRowProps {
  fields: Field[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  containerClassName?: string;
}

const InputRow: React.FC<InputRowProps> = ({ fields, handleChange, containerClassName }) => {
  // ฟังก์ชันสำหรับกรองให้กรอกได้เฉพาะตัวเลข
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const char = e.key;
    if (!/[\d]/.test(char)) {
      e.preventDefault();
    }
  };

  return (
    <div className={containerClassName || "grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4"}>
      {fields.map((field) => (
        <div key={field.id}>
          {field.title && (
            <h4 className="text-md font-semibold text-gray-700">{field.title}</h4>
          )}
          <label htmlFor={field.id} className="block text-gray-700 font-medium mb-2">
            {field.label}
          </label>
          <input
            type={field.type === "number" ? "text" : field.type}
            inputMode={field.type === "number" ? "numeric" : undefined}
            pattern={field.type === "number" ? "[0-9]*" : undefined}
            id={field.id}
            name={field.name}
            value={
              field.type === "number"
                ? field.value !== undefined
                  ? field.value.toString()
                  : ""
                : (field.value as unknown as string) || ""
            }
            onChange={handleChange}
            onKeyPress={field.type === "number" ? handleKeyPress : undefined}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      ))}
    </div>
  );
};

export default InputRow;
