// import { expect } from 'chai';
import { graphql } from 'graphql';
import { schema } from '../src/modules/schema.js';
import { describe, it } from 'mocha';

describe('getUser query', () => {
    it('should return the requested user', async () => {
        const query = `
                query Burger($name: String!, $vegan: Boolean! ) {
                    burger (name: $name) {
                        id
                        name
                        tomato
                        cheese @skip(if: $vegan)
                        inStock
                        price
                    }
                }
            `;
        const variables = {
            vegan: false,
            name: "Veggie Delight"
        };

        const result = await graphql({ schema, source: query, variableValues: variables });
        console.log('result', result);
        // expect(result.errors).to.be.undefined;
        // expect(result.data.user).to.deep.equal({ name: 'John', email: 'john@example.com' });
    });
});