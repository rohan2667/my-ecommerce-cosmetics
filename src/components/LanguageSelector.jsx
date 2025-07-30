import React from "react";
import Flag from "react-world-flags";

const LanguageSelector = ({ selectedLang, setSelectedLang }) => {
  const languages = [
    { code: "US", label: "English", value: "en", short: "EN" },
    { code: "FR", label: "Français", value: "fr", short: "FR" },
    { code: "ES", label: "Español", value: "es", short: "ES" },
    { code: "DE", label: "Deutsch", value: "de", short: "DE" },
    { code: "JP", label: "日本語", value: "jp", short: "JP" },
  ];

  const handleChange = (e) => {
    const newLang = languages.find((lang) => lang.value === e.target.value);
    setSelectedLang(newLang);
  };

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <Flag
        code={selectedLang.code}
        style={{ width: 20, height: 14, verticalAlign: "middle" }}
      />
      <select
        value={selectedLang.value}
        onChange={handleChange}
        className="text-sm w-16 px-2 py-1 border border-gray-300 rounded-md bg-white shadow-sm hover:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400 transition-all duration-150 cursor-pointer"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.short}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
