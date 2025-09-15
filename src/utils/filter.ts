import { IBurger, IBurgerInput } from "../interface/burger";

export const fetchBurgers = (burgers: IBurger[], args: IBurgerInput) => {
    if (!args.where) return burgers;
    return burgers.filter(burger => {
        for (const key in args.where) {

            const burgerKey = key as keyof IBurger;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (burger[burgerKey] === undefined || burger[burgerKey] != args.where[burgerKey]) {
                return false;
            }
        }
        return true;
    });
}