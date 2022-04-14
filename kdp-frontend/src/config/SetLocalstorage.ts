export default function SetLocalStorage() {
  const UUIDV4 = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function(c) {
      const r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );

  if (!localStorage.getItem("UUIDV4")) {
    localStorage.setItem("UUIDV4", UUIDV4);
  } else {
    return;
  }
  return UUIDV4;
}
