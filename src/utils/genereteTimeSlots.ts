export const generateTimeSlots = (start: number, end: number, step: number) => {
  const slots = [];
  for (let hour = start; hour < end; hour++) {
    for (let min = 0; min < 60; min += step) {
      const hh = hour.toString().padStart(2, "0");
      const mm = min.toString().padStart(2, "0");
      slots.push(`${hh}:${mm}`);
    }
  }
  return slots;
};
