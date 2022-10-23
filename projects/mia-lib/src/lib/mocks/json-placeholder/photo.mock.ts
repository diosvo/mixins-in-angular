import { Photo } from '@lib/models/json-placeholder/photo.model';

const MOCK_PHOTO: Photo = {
  albumId: 1,
  id: 1,
  title: 'accusamus beatae ad facilis cum similique qui sunt',
  url: 'https://via.placeholder.com/600/92c952',
  thumbnailUrl: 'https://via.placeholder.com/150/92c952'
} as const;

const MOCK_LIST_PHOTOS: Photo[] = [MOCK_PHOTO];

export { MOCK_PHOTO, MOCK_LIST_PHOTOS };
