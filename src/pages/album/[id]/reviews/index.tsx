import dynamic from 'next/dynamic';

const AlbumReviewPage = dynamic(
  () => import('@components/Album/AlbumReviewPage'),
  {
    ssr: false,
  }
);

export default AlbumReviewPage;
