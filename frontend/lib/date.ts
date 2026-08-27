// Format tanggal, bulan, tahun di header
export function formatBusinessDate(date: Date = new Date()): string {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dayName = days[date.getDay()];
  const dateNum = date.getDate();
  const monthName = months[date.getMonth()];
  const yearNum = String(date.getFullYear()).slice(-2);

  return `${dayName}, ${dateNum} ${monthName} ${yearNum}`;
}
