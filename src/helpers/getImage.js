import config from "@/config/config";

export const getImageUrl = (imagePath) => {
  if (!imagePath) return;

  if (imagePath.startsWith("http")) {
    return imagePath;
  }
  const imgPath = `${config.apiUrl}${imagePath}`;
  return imgPath;
};
