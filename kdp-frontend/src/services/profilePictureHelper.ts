export default function SetProfilePicture(pictureName: string): string {
  return `https://tritkdpstorageaccount.blob.core.windows.net/profilepictures/${pictureName}`;
}
