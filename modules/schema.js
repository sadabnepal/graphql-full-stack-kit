export const schemaTypeDefinition = `
type Todo {
    id: ID!
    todo: String!
    user: User
}

type User {
    id: ID!
    firstName: String!
    lastName: String!
    maidenName: String!
    age: String!
    gender: String!
    email: String!
    phone: String!
    username: String!
    password: String!
}

type Burger {
    id: ID!
    name: String!
    description: String!
    price: Float!
    calories: Float!
    inStock: Boolean!
    patty: String!
    cheese: Boolean!
    lettuce: Boolean!
    tomato: Boolean!
    onion: Boolean!
    sauce: Boolean!
}

type Query {
    todos: [Todo]
    users: [User]
    user(id: ID!): User
    burgers: [Burger]
    burger(name: String!): Burger
}
`