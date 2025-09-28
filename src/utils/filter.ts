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
    const matchingBurger = BURGERS.find(burger => burger.name === args.data.name);

    if (matchingBurger) {
        return {
            success: false,
            message: {
                result: "Burger with this ID already exists",
                data: matchingBurger
            }
        }
    };

    const existingIds = BURGERS.map(burger => burger.id);
    const newId = Math.max(...existingIds) + 1;

    const updatedArgs = {
        success: true,
        message: {
            result: "Burger created successfully",
            data: {
                id: newId,
                ...args.data
            }
        }
    };

    BURGERS.push(updatedArgs.message.data);
    return updatedArgs;
}


export const deleteBurgerById = (args: IBurgerDeleteInput): IBurgerDeleteResponse => {

    const matchingBurger = BURGERS.find(burger => burger.id === Number(args.id));

    if (!matchingBurger) {
        return {
            success: false,
            message: {
                result: `Burger with id: ${args.id} not found`,
            }
        }
    }

    BURGERS.filter(burger => burger.id !== Number(args.id));

    return {
        success: true,
        message: {
            result: "Burger deleted successfully",
        }
    };
}