import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import PacmanLoading from "../components/PacmanLoading";
import type { Episode } from "../utils/types";
import { getAnimeInfo } from "../utils/api";

export default function AnimeDetails() {
  const { animeId } = useParams();

  const { data: animeInfo, isLoading } = useQuery({
    queryKey: ["anime-details", animeId],
    queryFn: () => getAnimeInfo(animeId!!),
  });

  if (!isLoading && animeInfo.type !== "OVA" && animeInfo.type !== "ONA") {
    animeInfo.type =
      animeInfo.type[0].toUpperCase() +
      animeInfo.type.substring(1).toLowerCase();
  }

  return (
    <div className="mx-1 sm:mx-4 lg:mx-6">
      <Helmet>
        <title>
          {isLoading ? "Animetetsu" : `${animeInfo.title} | Animetetsu`}
        </title>
      </Helmet>
      {!isLoading ? (
        <>
          <div id="info" className="flex flex-col lg:flex-row">
            <img
              className="rounded-md w-auto md:h-96 mb-6 hidden md:block lg:mb-0"
              src={animeInfo.image}
              alt={animeInfo.title}
              loading="lazy"
              width={300}
              height={600}
              style={{ objectFit: "cover" }}
            />
            <div className="ml-4">
              <h2 className="text-2xl sm:text-4xl font-bold mb-0 sm:mb-1">
                {animeInfo.title}
              </h2>
              <span className="opacity-50">{animeInfo.type}</span>
              <p
                className={`opacity-50 my-3 ${
                  animeInfo.description.length > 100
                    ? "text-xs sm:text-sm"
                    : "text-sm sm:text-base"
                }`}
              >
                {animeInfo.description}
              </p>
              <p className="text-sm sm:text-base">
                Genre:{" "}
                <span className="opacity-50">
                  {animeInfo.genres.map((g: string, i: number) => (
                    <span key={g}>
                      {g}
                      {animeInfo.genres.length === i + 1 || ", "}
                    </span>
                  ))}
                </span>
              </p>
              <p className="my-1 text-sm sm:text-base">
                Status: <span className="opacity-50">{animeInfo.status}</span>
              </p>
              <p className="text-sm sm:text-base">
                {animeInfo.totalEpisodes !== "1" ? "Episodes: " : "Episode: "}
                <span className="opacity-50">{animeInfo.totalEpisodes}</span>
              </p>
              <p className="my-1 text-sm sm:text-base">
                Released:{" "}
                <span className="opacity-50">{animeInfo.releaseDate}</span>
              </p>
              {animeInfo.otherName === "" || (
                <p className="text-sm sm:text-base">
                  Other Names:{" "}
                  <span className="opacity-50">{animeInfo.otherName}</span>
                </p>
              )}
            </div>
          </div>
          {(animeInfo.totalEpisodes !== "0" && animeInfo.type === "Movie") ||
          animeInfo.type === "Special" ? (
            <div className="my-8">
              <Link
                to={`/watch/${animeInfo.episodes[0].id.replace(
                  "episode",
                  "ep"
                )}`}
                className="link-btn px-6"
              >
                Watch {animeInfo.type}
              </Link>
            </div>
          ) : (
            <div
              className={`mt-8 mb-8 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4`}
            >
              {[...animeInfo.episodes].reverse().map(
                (e: Episode) =>
                  e.number === "0" || (
                    <Link
                      key={e.id}
                      className="link-btn"
                      to={`/watch/${e.id.replace("episode", "ep")}`}
                    >
                      {e.number}
                    </Link>
                  )
              )}
            </div>
          )}
        </>
      ) : (
        <PacmanLoading />
      )}
    </div>
  );
}
