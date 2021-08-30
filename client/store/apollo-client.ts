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
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              bouquets: {
                keyArgs: ["price", "personType", "code"],
                merge(existing: any[], incoming: any[], { args: { skip } }: Record<string, any>) {
                  const merged = existing ? existing.slice(0) : [];
                  for (let i = 0; i < incoming.length; ++i) {
                    merged[skip + i] = incoming[i];
                  }
                  return merged;
                },
                read(existing, { args: { skip, take } }: Record<string, any>) {
                  return existing && existing.slice(skip, skip + take);
                },
              },
              balloons: {
                keyArgs: ["price", "categoryId", "colorId", "code"],
                merge(existing: any[], incoming: any[], { args: { skip } }: Record<string, any>) {
                  const merged = existing ? existing.slice(0) : [];
                  for (let i = 0; i < incoming.length; ++i) {
                    merged[skip + i] = incoming[i];
                  }
                  return merged;
                },
                read(existing, { args: { skip, take } }: Record<string, any>) {
                  return existing && existing.slice(skip, skip + take);
                },
              },
            },
          },
        },
      }).restore(windowApolloState || {}),
    });
  }

  return CLIENT;
}
