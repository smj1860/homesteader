'use client';

/**
 * Compresses an image file or data URI using the Canvas API.
 * @param source The File object or base64 data URI to compress.
 * @param maxWidth The maximum width for the compressed image.
 * @param maxHeight The maximum height for the compressed image.
 * @param quality The compression quality (0 to 1).
 * @returns A promise that resolves to a compressed base64 data URI.
 */
export async function compressImage(
  source: File | string,
  maxWidth: number = 1024,
  maxHeight: number = 1024,
  quality: number = 0.7
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions while maintaining aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const compressedDataUri = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUri);
    };

    img.onerror = (err) => reject(err);

    if (source instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(source);
    } else {
      img.src = source;
    }
  });
}
