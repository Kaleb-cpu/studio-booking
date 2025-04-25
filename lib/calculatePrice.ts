// lib/calculatePrice.ts

export function calculatePrice(service: string, songCount: number): number {
    if (service === "demo") {
      if (songCount <= 1) {
        return 30;
      }
      return 30 + (songCount - 1) * 25;
    } else if (service === "final") {
      if (songCount <= 1) {
        return 45;
      }
      return 45 + (songCount - 1) * 40;
    }
  
    return 0; // If no service is selected
  }
  