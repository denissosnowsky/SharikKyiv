import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { graphqlUrl } from "../config";
import { createUploadLink } from "apollo-upload-client";

const isServer = typeof window === "undefined";

const windowApolloState = !isServer && window.__NEXT_DATA__.apolloState;

let CLIENT: ApolloClient<NormalizedCacheObject>;

const link = createUploadLink({ uri: graphqlUrl });

export function getApolloClient(forceNew?: boolean) {
  if (!CLIENT || forceNew) {
    CLIENT = new ApolloClient({
      ssrMode: isServer,
      link,
      cache: new InMemoryCache().restore(windowApolloState || {}),
    });
  }

  return CLIENT;
}
