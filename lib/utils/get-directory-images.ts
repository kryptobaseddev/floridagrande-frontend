export async function getDirectoryImages(directoryPath: string): Promise<string[]> {
  try {
    const response = await fetch(`/api/get-directory-images?directory=${encodeURIComponent(directoryPath)}`)
    const data = await response.json()
    return data.images || []
  } catch (error) {
    console.error(`Error fetching images for directory ${directoryPath}:`, error)
    return []
  }
}
