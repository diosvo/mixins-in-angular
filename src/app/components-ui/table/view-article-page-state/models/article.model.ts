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

type ArticleState = State<Article> & {
  selected?: {
    article: Article,
    comments: Comment[]
  };
}

const INITIAL_ARTICLE_STATE: ArticleState = {
  selected: null,
  data: [],
  loading: true,
};

export { Comment, Article, ArticleState, INITIAL_ARTICLE_STATE };
