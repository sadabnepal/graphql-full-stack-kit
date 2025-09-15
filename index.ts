import express from 'express';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4"
import bodyParser from 'body-parser';
import cors from 'cors';

import { typeDefs } from './src/modules/schema';
import { dataResolvers } from './src/modules/resolvers';

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: dataResolvers
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => console.log('GraphQL server started at port http://localhost:8000/graphql'));
}

startServer();