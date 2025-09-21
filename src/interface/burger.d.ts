export interface IQueryResult<T> {
    data: T,
    errors: unknown[]
};


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


export interface IBurgerFilterInput {
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

export interface IBurgerCreateInput {
    data: {
        name: string;
        description: string;
        price: number;
        calories: number;
        inStock: boolean;
        patty: PattyType;
        cheese: boolean;
        lettuce: boolean;
        tomato: boolean;
        onion: boolean;
        sauce: boolean;
        vegan: boolean
    };
}

export interface IBurgerCreateResponse {
    data: IBurger;
    message: string;
}


export interface IBurgerDeleteInput {
    id: string;
}

export interface IBurgerDeleteResponse {
    success: boolean;
    message: {
        id: string;
        result: string;
    };
}
