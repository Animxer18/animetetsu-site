export type Anime = {
  id: string;
  title: string;
  image: string;
  episodeId: string;
  episodeNumber: string;
  releaseDate: string;
};

export type Episode = {
  id: string;
  number: string;
};

export type AnimeInfo = {
  id: string;
  title: string;
  type: string;
  image: string;
  status: string;
  releaseDate: string;
  genres: string[];
  totalEpisodes: string;
  otherName: string;
  description: string;
  episodes: Episode[];
};

export type EpisodeSrc = {
  url: string;
  isM3u8: boolean;
  quality: string;
};

export type EpisodeInfo = {
  headers: { Referer: string };
  sources: EpisodeSrc[];
  download: string;
};
