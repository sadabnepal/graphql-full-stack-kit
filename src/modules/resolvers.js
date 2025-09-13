import { USERS } from '../database/users.js';
import { BURGERS } from '../database/burgers.js';

export const dataResolvers = {
    Query: {
        users: () => USERS,
        user: (parent, { id }) => USERS.find(data => data.id === Number(id)),
        burgers: (parent, args) => {
            return BURGERS.filter(burger => {
                for (let key in args.where) {
                    if (burger[key] === undefined || burger[key] != args.where[key]) {
                        return false;
                    }
                }
                return true;
            });
        },
        burger: (parent, { name }) => BURGERS.find(data => data.name === name),
    }
}