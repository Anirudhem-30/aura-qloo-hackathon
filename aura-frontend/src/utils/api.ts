export async function fetchRecommendations(
  mood: string,
  type: string,
  location?: string,
  language?: string
) {
  const res = await fetch("http://localhost:8000/recommend/json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mood,
      type,
      location: location || null,
      language: language || null,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return res.json();
}
