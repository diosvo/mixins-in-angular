import { DEFAULT_PAGINATE_PARAMS, PaginateParams } from '@lib/models/table';

interface Comment {
  post_id: number;
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
  comments: Array<Comment>;
  searchTerm: string;
  loading: boolean;
  commentsPagination: PaginateParams;
}

const initialArticleState: ViewArticleState = {
  id: undefined,
  article: null,
  comments: [],
  loading: true,
  searchTerm: '',
  commentsPagination: DEFAULT_PAGINATE_PARAMS
};

export { Comment, Article, PaginateParams, ViewArticleState, initialArticleState };
