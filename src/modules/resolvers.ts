
import { BURGERS } from '@database/burgers';
import { IBurgerInput } from '@interface/burger';
import { fetchBurgers } from '@utils/filter';

export const dataResolvers = {
    Query: {
        burgers: (parent: unknown, args: IBurgerInput) => fetchBurgers(BURGERS, args),
        burger: (parent: unknown, { name }: { name: string }) => BURGERS.find(data => data.name === name),
    }
}