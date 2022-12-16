import { Comment } from '@lib/models/json-placeholder/comment.model';

const MOCK_COMMENT: Comment = {
  postId: 6,
  id: 28,
  name: 'quo voluptates voluptas nisi veritatis dignissimos dolores ut officiis',
  email: 'Ronny@rosina.org',
  body: 'voluptatem repellendus quo alias at laudantium\nmollitia quidem esse\ntemporibus consequuntur vitae rerum illum\nid corporis sit id'
} as const;

const MOCK_LIST_COMMENTS: Comment[] = [MOCK_COMMENT];

export { MOCK_COMMENT, MOCK_LIST_COMMENTS };
