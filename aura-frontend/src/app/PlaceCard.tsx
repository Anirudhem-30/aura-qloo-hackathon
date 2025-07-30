"use client";

export default function PlaceCard({ place }: { place: any }) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}`;

  return (
    <div className="bg-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 flex flex-col border border-neutral-700">
      {place.image_url ? (
        <img
          src={place.image_url}
          alt={place.name}
          className="w-full aspect-[2/3] object-cover"
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-neutral-700 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-lg font-semibold mb-2">{place.name}</h2>
        {place.description && (
          <p className="text-gray-400 text-sm mb-2 line-clamp-3">{place.description}</p>
        )}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:underline text-sm mt-auto"
        >
          View on Google Maps
        </a>
      </div>
    </div>
  );
}
