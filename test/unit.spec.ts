import { expect } from 'chai';
import { graphql } from 'graphql';
import { describe, it } from 'mocha';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from '@modules/schema';
import { dataResolvers } from '@modules/resolvers';
import { IBurger, IQueryResult } from '@interface/burger';

export const schema = makeExecutableSchema({ typeDefs, resolvers: dataResolvers });

describe('test burger', () => {

    it('should return the burger without vegan', async () => {

        const query = `
        query Burgers($vegan: Boolean!) {
            burgers(where: {vegan: $vegan}) {
                name
                inStock
                description
                cheese @skip(if: $vegan)
                vegan
            }
        }`;

        const variables = {
            vegan: false
        };

        const result = await graphql({ schema, source: query, variableValues: variables }) as IQueryResult<{ burgers: IBurger[] }>;

        expect(result.data).to.haveOwnProperty('burgers');
        expect(result.data.burgers.filter(burger => burger.vegan).length).to.equal(0);
    });


    it('should create a new burger', async () => {

        const mutation = `
        mutation CreateBurger($data: BurgerCreateInput!) {
            createBurger(data: $data) {
                success
                message {
                    result
                    data {
                        id
                        name
                        description
                        price
                        calories
                        inStock
                        patty
                        cheese
                        lettuce
                        tomato
                        onion
                        sauce
                        vegan
                    }
                }
            }
        }`;

        const variables = {
            data: {
                name: "Test Burger",
                description: "This is a test burger",
                price: 9.99,
                calories: 800,
                inStock: true,
                patty: "Beef",
                cheese: true,
                lettuce: true,
                tomato: true,
                onion: true,
                sauce: true,
                vegan: false
            }
        };

        const result = await graphql({ schema, source: mutation, variableValues: variables }) as IQueryResult<{ createBurger: { success: boolean, message: { result: string, data: IBurger } } }>;

        expect(result.data).to.haveOwnProperty('createBurger');
        expect(result.data.createBurger.success).satisfies((val: boolean) => val === true, 'Expected burger to be created successfully');
        expect(result.data.createBurger.message.data.name).to.equal(variables.data.name);
    });

    it('should delete a burger by id', async () => {

        const mutation = `
        mutation DeleteBurger($id: ID!) {
            deleteBurger(id: $id) {
                success
                message {
                    result
                }
            }
        }`;

        // First, create a burger to ensure there is one to delete
        const createMutation = `
        mutation CreateBurger($data: BurgerCreateInput!) {
            createBurger(data: $data) {
                success
                message {
                    data {
                        id
                    }
                }
            }
        }`;

        const createVariables = {
            data: {
                name: "Burger to Delete",
                description: "This burger will be deleted",
                price: 8.99,
                calories: 700,
                inStock: true,
                patty: "Chicken",
                cheese: false,
                lettuce: true,
                tomato: false,
                onion: true,
                sauce: false,
                vegan: false
            }
        };

        const createResult = await graphql({ schema, source: createMutation, variableValues: createVariables }) as IQueryResult<{ createBurger: { success: boolean, message: { data: IBurger } } }>;

        expect(createResult.data).to.haveOwnProperty('createBurger');
        expect(createResult.data.createBurger.success).satisfies((val: boolean) => val === true, 'Expected burger to be created successfully');

        const burgerIdToDelete = createResult.data.createBurger.message.data.id;

        const deleteVariables = {
            id: burgerIdToDelete
        };

        const deleteResult = await graphql({ schema, source: mutation, variableValues: deleteVariables }) as IQueryResult<{ deleteBurger: { success: boolean, message: { result: string } } }>;

        expect(deleteResult.data).to.haveOwnProperty('deleteBurger');
        expect(deleteResult.data.deleteBurger.success).satisfies((val: boolean) => val === true, 'Expected burger to be deleted successfully');
        expect(deleteResult.data.deleteBurger.message.result).to.equal('Burger deleted successfully');
    });


});