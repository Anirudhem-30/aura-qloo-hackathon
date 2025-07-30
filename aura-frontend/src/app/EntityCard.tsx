"use client";

export default function EntityCard({ entity }: { entity: any }) {
  const type = entity.type || "";

  const isMovie = Boolean(entity.imdb_id);
  const isBook = type.includes("book");
  const isArtist = type.includes("artist");
  const isTV = type.includes("tv_show");
  const isPodcast = type.includes("podcast");
  const isDestination = type.includes("destination");
  const isPlace = type.includes("place");

  return (
    <div className="bg-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 flex flex-col border border-neutral-700">
      {entity.image_url ? (
        <img
          src={entity.image_url}
          alt={entity.name}
          className="w-full aspect-[2/3] object-cover"
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-neutral-700 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-lg font-semibold mb-2">{entity.name}</h2>

        {entity.release_year && (
          <p className="text-gray-400 text-sm mb-1">
            📅 <span className="font-medium">Year:</span> {entity.release_year}
          </p>
        )}

        {entity.imdb_rating && (
          <p className="text-gray-400 text-sm mb-1">
            ⭐ <span className="font-medium">IMDb Rating:</span> {entity.imdb_rating}
          </p>
        )}

        {entity.price && (
          <p className="text-gray-400 text-sm mb-1">
            💰 <span className="font-medium">Approx. Price:</span> {entity.price}
          </p>
        )}

        {entity.description && (
          <p className="text-gray-400 text-sm mb-2 line-clamp-3">{entity.description}</p>
        )}

        {isMovie && (
          <a
            href={`https://www.imdb.com/title/${entity.imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline text-sm mt-auto"
          >
            View on IMDb
          </a>
        )}

        {isBook && entity.name && (
          <a
            href={`https://www.amazon.com/s?k=${encodeURIComponent(entity.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline text-sm mt-auto"
          >
            View on Amazon
          </a>
        )}

        {isArtist && entity.name && (
          <a
            href={`https://open.spotify.com/search/${encodeURIComponent(entity.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline text-sm mt-auto"
          >
            Listen on Spotify
          </a>
        )}

        {isTV && entity.name && (
          <a
            href={`https://www.imdb.com/find?q=${encodeURIComponent(entity.name)}&s=tt&ttype=tv`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline text-sm mt-auto"
          >
            View on IMDb
          </a>
        )}

        {isPodcast && entity.name && (
          <a
            href={`https://podcasts.apple.com/us/search?term=${encodeURIComponent(entity.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline text-sm mt-auto"
          >
            Listen on Apple Podcasts
          </a>
        )}

        {isDestination && entity.name && (
          <a
            href={`https://www.google.com/maps/search/${encodeURIComponent(entity.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline text-sm mt-auto"
          >
            View on Google Maps
          </a>
        )}

        {isPlace && entity.name && (
          <a
            href={`https://www.google.com/travel/search/${encodeURIComponent(entity.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline text-sm mt-auto"
          >
            Explore Location
          </a>
        )}

        {!isMovie &&
          !isBook &&
          !isArtist &&
          !isTV &&
          !isPodcast &&
          !isDestination &&
          !isPlace &&
          entity.name && (
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(entity.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:underline text-sm mt-auto"
            >
              Learn More
            </a>
          )}
      </div>
    </div>
  );
}
