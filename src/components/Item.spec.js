import Vue from 'vue'
import Item from './Item'

describe('MyComponent', () => {
    // Inspect the raw component options
    it('has a created hook', () => {
        expect(typeof Item.created).toBe('function')
    })

})