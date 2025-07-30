"use client";
import React from "react";

interface PreferencesBarProps {
  location: string;
  setLocation: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
}

export default function PreferencesBar({
  location,
  setLocation,
  language,
  setLanguage,
}: PreferencesBarProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
        display: "flex",
        gap: "0.75rem",
        background: "#222 !important",
        padding: "0.75rem",
        borderRadius: "0.5rem",
        zIndex: 9999,
        border: "1px solid #666",
      }}
    >
      <>
  <input
    type="text"
    list="city-options"
    placeholder="Location"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    style={{
      width: "140px",
      padding: "0.5rem",
      borderRadius: "0.375rem",
      background: "#333 !important",
      color: "#fff !important",
      border: "1px solid #aaa",
      outline: "none",
      fontSize: "0.95rem",
    }}
  />
  <datalist id="city-options">
    <option value="Bangalore" />
    <option value="San Jose" />
    <option value="New York" />
    <option value="Los Angeles" />
    <option value="London" />
    <option value="Tokyo" />
    <option value="Delhi" />
    <option value="Paris" />
    <option value="Berlin" />
    <option value="Singapore" />
  </datalist>
</>


      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{
          padding: "0.5rem",
          borderRadius: "0.375rem",
          background: "#333 !important",
          color: "#fff !important",
          border: "1px solid #aaa",
          outline: "none",
          fontSize: "0.95rem",
        }}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="zh">中文</option>
        <option value="hi">हिन्दी</option>
      </select>
    </div>
  );
}
