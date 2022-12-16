import { Album } from '@lib/models/json-placeholder/album.model';

const MOCK_ALBUM: Album = {
  userId: 1,
  id: 1,
  title: 'quidem molestiae enim'
} as const;

const MOCK_LIST_ALBUMS: Album[] = [MOCK_ALBUM];

export { MOCK_ALBUM, MOCK_LIST_ALBUMS };
