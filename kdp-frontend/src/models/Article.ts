export enum articleCategory {
  podcast = 'podcast',
  blog = 'blog',
  video = 'video',
}

export default interface ArticleShape {
  id: string;
  tribeId: string;
  category: articleCategory;
  writer: string;
  title: string;
  description: string;
  content: string;
}
