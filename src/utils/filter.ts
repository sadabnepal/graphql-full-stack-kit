import { BURGERS } from "@database/burgers";
import {
    IBurger,
    IBurgerCreateInput,
    IBurgerFilterInput,
    IBurgerCreateResponse,
    IBurgerDeleteInput,
    IBurgerDeleteResponse
} from "@interface/burger";

export const fetchBurgers = (burgers: IBurger[], args: IBurgerFilterInput) => {
    if (!args.where) return burgers;
    return burgers.filter(burger => {
        for (const key in args.where) {

            const burgerKey = key as keyof IBurger;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (burger[burgerKey] === undefined || burger[burgerKey] != args.where[burgerKey]) {
                return false;
            }
        }
        return true;
    });
}


export const createBurger = (args: IBurgerCreateInput): IBurgerCreateResponse => {
    const existingIds = BURGERS.map(burger => burger.id);
    const newId = Math.max(...existingIds) + 1;

    const updatedArgs = {
        message: "Burger created successfully",
        data: {
            id: newId,
            ...args.data
        }
    };

    BURGERS.push(updatedArgs.data);
    return updatedArgs;
}


export const deleteBurgerById = (args: IBurgerDeleteInput): IBurgerDeleteResponse => {
    console.log('typeof args.id', typeof args.id);
    console.log('value args.id', Number(args.id));
    const matchingBurger = BURGERS.find(burger => burger.id === Number(args.id));

    if (!matchingBurger) {
        return {
            success: false,
            message: {
                id: args.id,
                result: "Burger not found"
            }
        }
    }

    BURGERS.filter(burger => burger.id !== Number(args.id));

    return {
        success: true,
        message: {
            id: args.id,
            result: "Burger deleted successfully"
        }
    };
}