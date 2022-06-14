export default interface ArticleShape {
  id: string;
  tribeId: string;
  tribeName: string;
  rockstarId: string;
  rockstarName: string;
  viewCount: number;
  totalViewCount: number;
  thumbnail: string;
  likes: number;
  title: string;
  content: string;
  publishDate: String | Date;
}
