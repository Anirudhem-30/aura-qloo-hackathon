"use client";
import { useState } from "react";
import { fetchRecommendations } from "../utils/api";

interface SearchBarProps {
  onResults: (data: any) => void;
  onLoading?: (loading: boolean) => void;
  onMoodIntro: (text: string) => void;
  location: string;        // ✅ receives from PreferencesBar
  language: string;        // ✅ receives from PreferencesBar
}

export default function SearchBar({
  onResults,
  onLoading,
  onMoodIntro,
  location,
  language,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("movie");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onLoading?.(true);

    try {
      // ✅ Send all params
      const data = await fetchRecommendations(query, type, location, language);
      onResults(data);
      onMoodIntro(data.mood_intro);
    } catch (err) {
      console.error(err);
    } finally {
      onLoading?.(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full mt-6"
    >
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="px-3 py-2 rounded-md bg-neutral-800 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="movie">🎬 Movies</option>
        <option value="artist">🎵 Music Artists</option>
        <option value="book">📚 Books</option>
        <option value="tv_show">📺 TV Shows</option>
        <option value="podcast">🎙️ Podcasts</option>
        <option value="destination">🌍 Destinations</option>
      </select>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="How are you feeling today?"
        className="w-72 sm:w-80 px-4 py-3 rounded-md bg-neutral-800 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 placeholder:text-gray-400 hover:placeholder:text-gray-200"
      />

      <button
        type="submit"
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white rounded-md font-medium transition-all duration-300"
      >
        Find Recommendations
      </button>
    </form>
  );
}
