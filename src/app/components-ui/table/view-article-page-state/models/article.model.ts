import { DEFAULT_PAGINATE_PARAMS, PaginateParams } from '@lib/models/table';

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

interface ViewArticleState {
  id: number;
  article: Article;
  articles: Array<Article>,
  comments: Array<Comment>;
  searchTerm: string;
  loading: boolean;
  paginate: PaginateParams;
}

const initialArticleState: ViewArticleState = {
  id: undefined,
  article: {
    id: null,
    userId: null,
    title: '',
    body: '',
  },
  articles: [],
  comments: [],
  loading: false,
  searchTerm: '',
  paginate: DEFAULT_PAGINATE_PARAMS
};

export { Comment, Article, PaginateParams, ViewArticleState, initialArticleState };
