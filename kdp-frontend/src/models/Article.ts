export enum articleCategory {
  podcast = "podcast",
  blog = "blog",
  video = "video",
}

export default interface ArticleShape {
  articleId: string;
  tribeId: string;
  articleCategory: articleCategory;
  articleWriter: string;
  articleTitle: string;
  articleDescription: string;
  articleContent: string;
}
