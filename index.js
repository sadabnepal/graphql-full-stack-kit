import express from 'express';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4"
import bodyParser from 'body-parser';
import cors from 'cors';

import { schemaTypeDefinition } from './src/modules/schema.js';
import { dataResolvers } from './src/modules/resolvers.js';

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: schemaTypeDefinition,
        resolvers: dataResolvers
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => console.log("Server started at port 8000"));
}

startServer();