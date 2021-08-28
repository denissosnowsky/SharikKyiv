import { ApolloClient, InMemoryCache } from "@apollo/client";
import { graphqlUrl } from "../config";
import { createUploadLink } from "apollo-upload-client";

const link = createUploadLink({ uri: graphqlUrl });

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export default client;