// lib/calculatePrice.ts

export function calculatePrice(service: string, songCount: number): number {
  if (service === "demo") {
      // Demo pricing: $30 for first song, $25 for each additional
      return songCount <= 1 ? 30 : 30 + (songCount - 1) * 25;
  } else if (service === "final") {
      // Final recording pricing: $45 for first hour, $40 for each additional hour
      // Each song = 1 hour of studio time
      return songCount <= 1 ? 45 : 45 + (songCount - 1) * 40;
  }
  return 0; // If no service is selected
}
  