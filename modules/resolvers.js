import { TODOS } from "../database/todos.js";
import { USERS } from '../database/users.js';

export const dataResolvers = {
    Todo: {
        user: (todo) => USERS.find(data => data.id === todo.id)
    },
    Query: {
        getTodos: () => TODOS,
        getAllUsers: () => USERS,
        getUser: (parent, { id }) => USERS.find(data => data.id === Number(id))
    }
}