import striptags from 'striptags';

export const cleanHTML = (wikiContent: string) => {
  const x = striptags(wikiContent);

  const re = /(.*)Read more/g;

  const y = x.match(re);
  const matched = y ? y[0] : '';
  const content = matched?.replace(/Read more/g, '');

  return { content, length: content?.length };
};
