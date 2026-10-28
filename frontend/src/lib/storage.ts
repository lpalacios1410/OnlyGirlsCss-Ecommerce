import { supabase } from "./supabase";

export const PRODUCT_IMAGES_BUCKET = "images-onlygirlsccs";

/**
 * Sube una imagen al bucket de productos y devuelve su URL pública.
 * Usa la sesión actual (admin) para que Supabase aplique las políticas
 * RLS de storage.
 */
export async function uploadProductImage(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(fileName, file);

  if (uploadError) {
    throw new Error("Error al subir la imagen: " + uploadError.message);
  }

  const { data } = supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .getPublicUrl(fileName);

  return data.publicUrl;
}

/**
 * Extrae la ruta del archivo dentro del bucket a partir de su URL pública:
 * .../storage/v1/object/public/<bucket>/<ruta>
 */
function getStoragePathFromUrl(imageUrl: string): string | null {
  try {
    const url = new URL(imageUrl);
    const marker = `/object/public/${PRODUCT_IMAGES_BUCKET}/`;
    const idx = url.pathname.indexOf(marker);

    if (idx === -1) return null;

    return decodeURIComponent(url.pathname.slice(idx + marker.length));
  } catch {
    return null;
  }
}

/**
 * Elimina la imagen de un producto del bucket (con la sesión del admin,
 * para que Supabase aplique las políticas RLS de storage).
 *
 * Es "best-effort": nunca lanza. Si falla devuelve false para no bloquear
 * la operación principal (editar o eliminar el producto).
 */
export async function safeDeleteProductImage(
  imageUrl?: string | null,
): Promise<boolean> {
  if (!imageUrl) return false;

  const path = getStoragePathFromUrl(imageUrl);
  if (!path) return false; // Imagen externa o URL no reconocida: nada que borrar.

  try {
    const { error } = await supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .remove([path]);

    if (error) {
      console.warn(
        "No se pudo eliminar la imagen del bucket:",
        error.message,
      );
      return false;
    }

    return true;
  } catch (e) {
    console.warn("No se pudo eliminar la imagen del bucket:", e);
    return false;
  }
}
