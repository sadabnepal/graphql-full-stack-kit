type PattyType = 'Beef' | 'Chicken' | 'Fish' | 'Veggie' | 'Vegan';

export interface IBurger {
    id: number;
    name: string;
    patty: PattyType;
    cheese: boolean;
    lettuce: boolean;
    tomato: boolean;
    onion: boolean;
    sauce: boolean;
    price: number;
    calories: number;
    inStock: boolean;
    description: string;
    vegan: boolean
};


export interface IBurgerInput {
    where?: {
        name?: string;
        vegan?: boolean;
        inStock?: boolean;
        patty?: PattyType;
        cheese?: boolean;
        lettuce?: boolean;
        tomato?: boolean;
        onion?: boolean;
        sauce?: boolean;
    }
};

export interface IQueryResult<T> {
    data: T,
    errors: unknown[]
};