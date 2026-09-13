export function getMapImageUrl(
  lat: number,
  lng: number,
  token: string,
  width = 420,
  height = 420
) {
  if (!token) return "";

  const marker = `pin-s+2b7cff(${lng},${lat})`;
  const style = "streets-v12";
  return `https://api.mapbox.com/styles/v1/mapbox/${style}/static/${marker}/${lng},${lat},11,0/${width}x${height}?access_token=${token}`;
}
