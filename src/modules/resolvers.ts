
import { BURGERS } from '@database/burgers';
import {
    IBurgerCreateInput,
    IBurgerFilterInput,
    IBurgerCreateResponse,
    IBurgerDeleteInput,
    IBurgerDeleteResponse
} from '@interface/burger';
import { createBurger, deleteBurgerById, fetchBurgers } from '@utils/filter';

export const dataResolvers = {
    Query: {
        burgers: (parent: unknown, args: IBurgerFilterInput) => fetchBurgers(BURGERS, args),
        burger: (parent: unknown, { name }: { name: string }) => BURGERS.find(data => data.name === name),
    },
    Mutation: {
        createBurger: (parent: unknown, args: IBurgerCreateInput): IBurgerCreateResponse => createBurger(args),
        deleteBurger: (parent: unknown, args: IBurgerDeleteInput): IBurgerDeleteResponse => deleteBurgerById(args)
    }
}