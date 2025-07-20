import React from "react";

interface DeviceAddressInputProps {
  value: string;
  onChange: (value: string) => void;
}

const DeviceAddressInput: React.FC<DeviceAddressInputProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Device Address</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Enter device address"
      />
    </div>
  );
};

export default DeviceAddressInput;