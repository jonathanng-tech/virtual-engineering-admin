export const buildThumbnailPath = (path: string, thumbnail: string) => {
  return `${import.meta.env.VITE_S3_URL}/models/${path}/${thumbnail}`;
};

export const buildGlftPath = (path: string) => {
  const filename = `${path.split('/').pop()}.gltf`;
  return `${import.meta.env.VITE_S3_URL}/models/${path}/${filename}?t=${Date.now()}`;
};

export const fileExists = async (filePath: string) => {
  try {
    const response = await fetch(filePath);
    return response.status === 200;
  } catch (error) {
    console.error('Error fetching file:', error);
    return false;
  }
};

export const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
};
