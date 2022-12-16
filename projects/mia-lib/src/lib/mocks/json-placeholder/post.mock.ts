import { Post } from '@lib/models/json-placeholder/post.model';

const MOCK_POST: Post = {
  userId: 1,
  id: 1,
  title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
} as const;

const LIST_MOCK_POSTS: Post[] = [MOCK_POST];

export { MOCK_POST, LIST_MOCK_POSTS };
