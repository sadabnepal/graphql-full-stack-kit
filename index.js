import express from 'express';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4"
import bodyParser from 'body-parser';
import cors from 'cors';

import { TODOS } from "./database/todos.js";
import { USERS } from './database/users.js';


async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
            type User {
                id: ID!
                firstName: String! 
                lastName: String!
                maidenName: String!
                age: String!
                gender: String!
                email: String!
                phone: String!
                username: String!
                password: String!
            }

            type Todo {
                id: ID!
                todo: String!
                user: User
            }

            type Query {
                getTodos: [Todo]
                getAllUsers: [User]
                getUser(id: ID!): User
            }
         `,
        resolvers: {
            Todo: {
                user: (todo) => USERS.find(data => data.id === todo.id)
            },
            Query: {
                getTodos: () => TODOS,
                getAllUsers: () => USERS,
                getUser: (parent, { id }) => USERS.find(data => data.id === Number(id))
            }
        }
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => console.log("Server started at port 8000"));
}

startServer();