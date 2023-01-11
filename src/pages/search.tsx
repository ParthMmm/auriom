import dynamic from 'next/dynamic';

const SearchPage = dynamic(() => import('../components/Search/Page'), {
  suspense: true,
});

export default SearchPage;
