export const stripURI = (uri: string) => {
  const re = /:([^:]*)$/;

  const strippedURI = uri.match(re);

  if (!strippedURI) {
    return null;
  }
  return strippedURI[1];
};
