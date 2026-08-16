/**
 * Utility to automatically append Cloudinary auto-format (AVIF/WebP),
 * quality optimization, and width bounds to prevent massive uncompressed payloads.
 */
export function optimizeImage(url, width = 800) {
  if (!url || typeof url !== "string") return url || "";

  if (
    url.includes("res.cloudinary.com") &&
    url.includes("/upload/") &&
    !url.includes("f_auto")
  ) {
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  }

  return url;
}
