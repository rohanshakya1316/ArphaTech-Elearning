import config from "@/config/config";

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "/images/default-avatar.png";

  if (imagePath.startsWith("http")) {
    return imagePath;
  }
  const imgPath = `${config.apiUrl}${imagePath}`;
  return imgPath;
};
