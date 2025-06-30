import React from "react";

const Settings: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">⚙️ Settings</h1>
      <p className="text-gray-600">Customize your Excel Analytics experience.</p>

      {/* Add actual settings here later */}
      <div className="mt-6">
        <label className="block mb-2 font-medium">Default Chart Type</label>
        <select className="border p-2 rounded w-full max-w-md">
          <option>Bar</option>
          <option>Line</option>
          <option>Pie</option>
        </select>

        <label className="block mt-6 mb-2 font-medium">Theme</label>
        <select className="border p-2 rounded w-full max-w-md">
          <option>Light</option>
          <option>Dark</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
