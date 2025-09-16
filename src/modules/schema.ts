export const typeDefs = `#graphql
type Query {
    burgers(where: BurgerFilterInput): [Burger]
    burger(name: String!): Burger
}

type Burger {
    id: ID!
    name: String!
    description: String!
    price: Float!
    calories: Float!
    inStock: Boolean!
    patty: PattyType!
    cheese: Boolean!
    lettuce: Boolean!
    tomato: Boolean!
    onion: Boolean!
    sauce: Boolean!
    vegan: Boolean!
}

input BurgerFilterInput {
    name: String
    vegan: Boolean
    inStock: Boolean
    patty: PattyType
    cheese: Boolean
    lettuce: Boolean
    tomato: Boolean
    onion: Boolean
    sauce: Boolean
}

enum PattyType {
    Beef
    Chicken
    Fish
    Veggie
    Vegan
}
`;