export default function getCustomDateTime(date: string): string {
  let custom = date;
  if (date != "") {
    const language = navigator.language;
    custom = new Date(date.toString()).toLocaleDateString(language);
    return custom;
  } else {
    return "Error, failed converting date to localdate";
  }
}
