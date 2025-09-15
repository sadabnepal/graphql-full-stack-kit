import { expect } from 'chai';
import { graphql } from 'graphql';
import { typeDefs } from '../src/modules/schema';
import { describe, it } from 'mocha';
import { IBurger } from '../src/interface/burger';
import { IQueryResult } from '../src/interface/burger';
import { dataResolvers } from '../src/modules/resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';


export const schema = makeExecutableSchema({ typeDefs, resolvers: dataResolvers });


describe('test burger', () => {

    it('should return the burger without vegan', async () => {

        const query = `query Burgers($vegan: Boolean!) {
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