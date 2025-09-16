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
});