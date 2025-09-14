import { expect } from 'chai';
import { graphql } from 'graphql';
import { schema } from '../src/modules/schema.js';
import { describe, it } from 'mocha';

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

        const result = await graphql({ schema, source: query, variableValues: variables });
        console.log('result', result);
        expect(result.errors).to.be.undefined;
        expect(result.data.burgers).to.be.an('array').that.is.not.empty;

        const isAllNonVegan = result.data.burgers.every(burger => burger.vegan === false);
        expect(isAllNonVegan).to.be.true;
    });
});