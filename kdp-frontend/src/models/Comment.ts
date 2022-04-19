export interface CommentShape {
  id?: string;
  articleId?: string;
  userId: string;
  userName: string;
  commentText: string;
  commentDate?: string;
}
