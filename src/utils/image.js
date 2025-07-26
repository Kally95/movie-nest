const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const PLACEHOLDER_IMAGE =
  "https://placehold.co/500x750/1E1E1E/FFFFFF?text=No+Image";

export const getImageUrl = (path, size = "w500") => {
  if (!path) {
    return PLACEHOLDER_IMAGE;
  }
  return `${TMDB_IMAGE_BASE_URL}${size}${path}`;
};
