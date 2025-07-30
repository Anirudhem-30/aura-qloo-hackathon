"use client";

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import EntityCard from "./EntityCard";
import PlaceCard from "./PlaceCard";
import PreferencesBar from "./PreferencesBar";
import Image from "next/image";

export default function Home() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [moodIntro, setMoodIntro] = useState("");

  // ✅ New state for location and language
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("en");

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-neutral-950 text-white flex flex-col relative">
      {/* ✅ Preferences bar */}
      <PreferencesBar
        location={location}
        setLocation={setLocation}
        language={language}
        setLanguage={setLanguage}
      />

      <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900 to-neutral-950 opacity-90 z-0"></div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <Image
            src="/logo.png"
            alt="Aura Logo"
            width={120}
            height={120}
            priority
            className="rounded-lg shadow-lg"
          />
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-fuchsia-500 to-blue-500 text-transparent bg-clip-text">
            Aura
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mt-2 mb-6 max-w-2xl">
            Find culture that fits your mood
          </p>
          <SearchBar
            onResults={(data) => {
              setRecommendations(
                Array.isArray(data.recommendations) ? data.recommendations : []
              );
            }}
            onLoading={setLoading}
            onMoodIntro={setMoodIntro}
            location={location} // ✅ pass location
            language={language} // ✅ pass language
          />
        </div>
      </section>

      {moodIntro && (
        <div className="max-w-2xl mx-auto bg-purple-700/20 rounded-lg p-4 mt-6 text-center border border-purple-600">
          <p className="text-purple-200 italic">{moodIntro}</p>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
          <svg
            className="animate-spin h-12 w-12 text-purple-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center my-4">{error}</div>
      )}

      <section className="py-20 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {recommendations.map((item) =>
          item.type === "destination" ? (
            <div key={item.name} className="animate-fadeIn">
              <PlaceCard place={item} />
            </div>
          ) : (
            <div key={item.imdb_id || item.name} className="animate-fadeIn">
              <EntityCard entity={item} />
            </div>
          )
        )}
      </section>

      <footer className="text-center text-gray-600 py-6 border-t border-neutral-800 mt-8 text-sm">
        Made with ❤️ for the Hackathon · Powered by Qloo · © 2025 Aura
      </footer>
    </main>
  );
}
