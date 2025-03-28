import { TODOS } from "../database/todos.js";
import { USERS } from '../database/users.js';
import { BURGERS } from '../database/burgers.js';

export const dataResolvers = {
    Todo: {
        user: (todo) => USERS.find(data => data.id === todo.id)
    },
    Query: {
        todos: () => TODOS,
        users: () => USERS,
        user: (parent, { id }) => USERS.find(data => data.id === Number(id)),
        burgers: () => BURGERS,
        burger: (parent, { name }) => BURGERS.find(data => data.name === name),
    }
}