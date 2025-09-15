import { USERS } from '../database/users';
import { BURGERS } from '../database/burgers';
import { fetchBurgers } from '../utils/filter';
import { IBurgerInput } from '../interface/burger';

export const dataResolvers = {
    Query: {
        users: () => USERS,
        user: (parent: unknown, { id }: { id: number | string }) => USERS.find(data => data.id === Number(id)),
        burgers: (parent: unknown, args: IBurgerInput) => fetchBurgers(BURGERS, args),
        burger: (parent: unknown, { name }: { name: string }) => BURGERS.find(data => data.name === name),
    }
}