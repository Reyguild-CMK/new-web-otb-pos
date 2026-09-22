import { StepId } from "motion";

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

export function formatDateTime(value: Date | string): string{
  // const date = typeof value === "string"
  //   ? new Date(value.replace(" ", "T"))
  //   : value;
  
  const date = new Date(value);
  
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}
