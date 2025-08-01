// Cloudinary configuration and upload utilities
export const CLOUDINARY_CONFIG = {
  cloudName: 'de19jlsgv',
  apiKey: '835176438542863'
};

// Upload image to Cloudinary via secure Edge Function
export async function uploadImageToCloudinary(file: File, folder = 'ink-insights'): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  try {
    const response = await fetch('https://kysxtuvuyqgcatwoapmk.supabase.co/functions/v1/upload-image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5c3h0dXZ1eXFnY2F0d29hcG1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MzcyMDIsImV4cCI6MjA2ODQxMzIwMn0.5zERNnNKggBbFms-IDHwbF6k-ehw-8sN0-uYHR7sNSk`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Upload failed');
    }

    return data.url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
}

// Generate Cloudinary URL with transformations
export function getCloudinaryUrl(
  publicId: string,
  transformations?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
  }
): string {
  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload`;
  
  if (!transformations) {
    return `${baseUrl}/${publicId}`;
  }
  
  const transformParams = [];
  if (transformations.width) transformParams.push(`w_${transformations.width}`);
  if (transformations.height) transformParams.push(`h_${transformations.height}`);
  if (transformations.crop) transformParams.push(`c_${transformations.crop}`);
  if (transformations.quality) transformParams.push(`q_${transformations.quality}`);
  
  const transformString = transformParams.join(',');
  return `${baseUrl}/${transformString}/${publicId}`;
}