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

type Query {
    getTodos: [Todo]
    getAllUsers: [User]
    getUser(id: ID!): User
}
`