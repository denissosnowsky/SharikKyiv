import express from "express";
import { ApolloServer } from "apollo-server-express";
import config from "config";
import schema from "./grapgql/schema/schema";
import {
  ApolloServerContext,
  ReqResExpress,
} from "./types/ApolloServerContext";
import prisma from "./prisma/client";
import { graphqlUploadExpress } from 'graphql-upload';
import * as path from 'path';
import { Storage } from "@google-cloud/storage";


async function start() {
  try {
    const PORT = process.env.PORT || config.get("port");

    const gc = new Storage({
      keyFilename: path.join(__dirname, "../sharikkyiv-5c3745d593ac.json"),
      projectId: "sharikkyiv"
    });

    const coolFilesBucket = gc.bucket("sharikkyiv");

    type contextArgs = ReqResExpress;

    const context = ({ req, res }: contextArgs): ApolloServerContext => ({
      req,
      res,
      prisma,
      googleBucket: coolFilesBucket
    });

    const server = new ApolloServer({
      schema,
      context,
    });

    const app = express();

    await server.start();

    app.use(graphqlUploadExpress());

    server.applyMiddleware({ app });

    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
