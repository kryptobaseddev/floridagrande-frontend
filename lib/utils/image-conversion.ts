export interface ImageConversionOptions {
  size?: number;
  background?: string;
  foreground?: string;
}

/**
 * Converts an image buffer to SVG format
 * @param imageFile The input image file
 * @param options Conversion options
 * @returns SVG string
 */
export async function convertImageToSvg(
  imageFile: File,
  options: ImageConversionOptions = {}
): Promise<string> {
  const formData = new FormData();
  formData.append('type', 'convert');
  formData.append('file', imageFile);
  formData.append('options', JSON.stringify(options));

  const response = await fetch('/api/images', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to convert image');
  }

  const data = await response.json();
  return data.svg;
}

/**
 * Generates an SVG with user initials
 * @param initials User initials
 * @param options Generation options
 * @returns SVG string
 */
export async function generateInitialsAvatar(
  initials: string,
  options: ImageConversionOptions = {}
): Promise<string> {
  const formData = new FormData();
  formData.append('type', 'initials');
  formData.append('initials', initials);
  formData.append('options', JSON.stringify(options));

  const response = await fetch('/api/images', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate avatar');
  }

  const data = await response.json();
  return data.svg;
} 