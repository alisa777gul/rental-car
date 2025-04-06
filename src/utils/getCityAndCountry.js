export function extractCity(address) {
  const parts = address.split(",").map((part) => part.trim());
  return parts.length >= 2 ? parts[parts.length - 2] : null;
}

export function extractCountry(address) {
  const parts = address.split(",").map((part) => part.trim());
  return parts.length >= 1 ? parts[parts.length - 1] : null;
}
