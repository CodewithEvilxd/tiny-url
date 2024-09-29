export async function generateHash(content: string) {
  // Use the TextEncoder to convert the input content to a Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(content);

  // Compute SHA-256 hash using the SubtleCrypto API
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert the hash to a base64 string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const base64String = btoa(String.fromCharCode.apply(null, hashArray));

  // Remove non-alphanumeric characters from base64 and truncate to 6 characters
  const hash = base64String.replace(/[^a-zA-Z0-9]/g, "").substring(0, 6);

  return hash;
}
