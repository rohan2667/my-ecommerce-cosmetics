import React from "react";
import Select from "react-select";
import Flag from "react-world-flags";

const LANGUAGES = [
  { code: "US", label: "English", value: "en" },
  { code: "ES", label: "Spanish", value: "es" },
  { code: "FR", label: "French", value: "fr" },
];

const LanguageOption = (props) => {
  const { data, innerRef, innerProps, isFocused, isSelected } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`flex items-center p-2 cursor-pointer ${
        isFocused ? "bg-pink-100" : ""
      } ${isSelected ? "bg-pink-200 font-bold" : ""}`}
      style={{ minHeight: 36 }}
    >
      <Flag
        code={data.code}
        style={{ width: 24, height: 16, borderRadius: 2, marginRight: 8 }}
      />
      <span>{data.label}</span>
    </div>
  );
};

const SingleValue = ({ data }) => (
  <div className="flex items-center" style={{ minHeight: 36 }}>
    <Flag
      code={data.code}
      style={{ width: 24, height: 16, borderRadius: 2, marginRight: 8 }}
    />
    <span>{data.label}</span>
  </div>
);

const LanguageSelector = ({ selectedLang, setSelectedLang }) => {
  return (
    <Select
      options={LANGUAGES}
      value={selectedLang}
      onChange={setSelectedLang}
      isSearchable={false}
      components={{ Option: LanguageOption, SingleValue }}
      menuPortalTarget={typeof window !== "undefined" ? document.body : null}
      styles={{
        control: (base) => ({
          ...base,
          minHeight: 36,
          height: 36,
          fontSize: "0.875rem",
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
          zIndex: 100,
          cursor: "pointer",
        }),
        input: (base) => ({
          ...base,
          visibility: "hidden", 
          height: 0,
          padding: 0,
          margin: 0,
        }),
        valueContainer: (base) => ({
          ...base,
          height: 36,
          padding: "0",
          display: "flex",
          alignItems: "center",
        }),
        singleValue: (base) => ({
          ...base,
          display: "flex",
          alignItems: "center",
        }),
        indicatorsContainer: (base) => ({
          ...base,
          height: 36,
        }),
        menuPortal: (base) => ({
          ...base,
          zIndex: 9999,
        }),
      }}
    />
  );
};

export default LanguageSelector;
