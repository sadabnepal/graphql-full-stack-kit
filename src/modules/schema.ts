export const typeDefs = `#graphql
type Query {
    burgers(where: BurgerFilterInput): [Burger]
    burger(name: String!): Burger
}

type Mutation {
  createBurger(data: BurgerCreateInput!): BurgerCreateResponse!
  deleteBurger(id: ID!): BurgerDeleteResponse!
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

input BurgerCreateInput {
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


type BurgerCreateResponse {
    data: Burger!
    message: String!
}

input BurgerDeleteInput {
    id: ID!
}

type BurgerDeleteResponse {
    success: Boolean!
    message: BurgerDeleteMessage!
}

type BurgerDeleteMessage {
    id: ID!
    result: String!
}


enum PattyType {
    Beef
    Chicken
    Fish
    Veggie
    Vegan
}
`;