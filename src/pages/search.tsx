import dynamic from 'next/dynamic';

const SearchPage = dynamic(() => import('../components/Search/Page'), {
  ssr: false,
});

export default SearchPage;
