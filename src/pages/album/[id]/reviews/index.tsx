import dynamic from 'next/dynamic';

const AlbumReviewPage = dynamic(
  () => import('@components/Album/AlbumReviewPage'),
  {
    suspense: true,
  },
);

export default AlbumReviewPage;
