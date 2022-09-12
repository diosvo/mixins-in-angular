import { State } from '@lib/models/server.model';

interface Comment {
  postId: number;
  id: number;
  body: string;
}

interface Article {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const INITIAL_ARTICLE_STATE: State<Article> = {
  data: [],
  loading: true,
};

export { Comment, Article, INITIAL_ARTICLE_STATE };
