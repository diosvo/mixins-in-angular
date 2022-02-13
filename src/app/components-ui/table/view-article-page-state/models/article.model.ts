import { DEFAULT_PAGINATE_PARAMS, PaginateParams } from '@lib/models/table';

interface Comment {
  postId: number;
  id: number;
  body: string;
}

interface Article {
  id: number;
  comments: Array<Comment>;
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
  article: null,
  articles: [],
  comments: [],
  loading: false,
  searchTerm: '',
  paginate: DEFAULT_PAGINATE_PARAMS
};

export { Comment, Article, PaginateParams, ViewArticleState, initialArticleState };
