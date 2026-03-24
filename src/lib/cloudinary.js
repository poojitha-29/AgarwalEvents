import axios from 'axios';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export async function uploadImage(file, folder = 'agarwal-events/general') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', folder);
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    formData
  );
  return res.data.secure_url;
}

export function getOptimizedUrl(url, { width = 'auto', quality = 'auto' } = {}) {
  if (!url || !url.includes('cloudinary')) return url;
  return url.replace('/upload/', `/upload/w_${width},q_${quality},f_auto/`);
}
