import { logPolicy } from "@azure/core-http";

export default function SetTribePicture(pictureName: string): string {
    return `https://tritkdpstorageaccount.blob.core.windows.net/tribepictures/csharp-logo.png`;
  }
  