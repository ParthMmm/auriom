export const stripURI = (uri: string) => {
  const re = new RegExp(':([^:]*)$');

  const strippedURI = uri.match(re);

  if (!strippedURI) {
    return null;
  }
  return strippedURI[1];
};
