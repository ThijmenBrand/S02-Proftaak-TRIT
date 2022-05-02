export default interface ArticleShape {
  id: string;
  tribeId: string;
  tribeName: string;
  rockstarId: string;
  rockstarName: string;
  viewCount: number;
  totalViewCount: number;
  title: string;
  content: string;
  publishDate: String | Date;
}
