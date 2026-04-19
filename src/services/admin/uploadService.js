import imageCompression from "browser-image-compression";
import { supabase } from "../supabase/supabaseClient";
import { v4 as uuidv4 } from "uuid";

/**
 * Upload image with compression and thumbnail
 */
export const uploadImage = async (file) => {
  try {
    // Compress original
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    });

    // Create thumbnail
    const thumbnail = await imageCompression(file, {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 400,
    });

    const id = uuidv4();

    const originalPath = `originals/${id}.jpg`;
    const thumbPath = `thumbnails/${id}.jpg`;

    // Upload original
    const { error: error1 } = await supabase.storage
      .from("wedding-gallery")
      .upload(originalPath, compressedFile);

    if (error1) throw error1;

    // Upload thumbnail
    const { error: error2 } = await supabase.storage
      .from("wedding-gallery")
      .upload(thumbPath, thumbnail);

    if (error2) throw error2;

    // Get public URLs
    const { data: originalUrl } = supabase.storage
      .from("wedding-gallery")
      .getPublicUrl(originalPath);

    const { data: thumbUrl } = supabase.storage
      .from("wedding-gallery")
      .getPublicUrl(thumbPath);

    return {
      image_url: originalUrl.publicUrl,
      thumbnail_url: thumbUrl.publicUrl,
    };

  } catch (err) {
    console.error(err);
    throw err;
  }
};