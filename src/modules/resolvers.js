import { USERS } from '../database/users.js';
import { BURGERS } from '../database/burgers.js';
import { fetchBurgers } from '../utils/filter.js';

export const dataResolvers = {
    Query: {
        users: () => USERS,
        user: (parent, { id }) => USERS.find(data => data.id === Number(id)),
        burgers: (parent, args) => fetchBurgers(BURGERS, args),
        burger: (parent, { name }) => BURGERS.find(data => data.name === name),
    }
}