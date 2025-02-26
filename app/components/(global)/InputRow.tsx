import React from 'react';

interface Field {
  id: string;
  name: string;
  label: string;
  value?: number;
}

interface InputRowProps {
  fields: Field[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  containerClassName?: string;
}

const InputRow: React.FC<InputRowProps> = ({ fields, handleChange, containerClassName }) => {
  return (
    <div className={containerClassName || "grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4"}>
      {fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id} className="block text-gray-700 font-medium mb-2">
            {field.label}
          </label>
          <input
            type="number"
            id={field.id}
            name={field.name}
            value={field.value || 0}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      ))}
    </div>
  );
};

export default InputRow;
