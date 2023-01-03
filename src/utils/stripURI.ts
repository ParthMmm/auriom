export const stripURI = (uri: string) => {
  const re = new RegExp(":([^:]*)$");

  const strippedURI = uri.match(re);

  return strippedURI;
};
