import {itemStripper, matchingCategory} from "../../src/utils/categoryMatching";
import {expect} from "./chai";

describe('Category Matching', () => {

    let result;

    const whenMatchIsCalled = (item, association) => {
        return matchingCategory({name: item})({name: association});
    };

    it('should match on any case', () => {
        result = whenMatchIsCalled('Apples', 'APPLES');

        expect(result).to.be.true;
    });

    it('should match when item given has quantifiers', () => {
       result = whenMatchIsCalled('32x Apples', 'APPLES');

       expect(result).to.be.true;
    });

    describe('Item Stripper', () => {
        it('should remove front quantifiers from name', () => {
            expect(itemStripper('32x Chicken Breast')).to.be.equal('Chicken Breast');
        });

        it('should remove front quantifiers from name', () => {
            expect(itemStripper('32 x Chicken Breast')).to.be.equal('Chicken Breast');
        });

        it('should remove front quantifiers from name', () => {
            expect(itemStripper('32lbs Chicken Breast')).to.be.equal('Chicken Breast');
        });

        it('should remove front quantifiers from name', () => {
            expect(itemStripper('x 3 Chicken Breast')).to.be.equal('Chicken Breast');
        });

        it('should remove front quantifiers from name', () => {
            expect(itemStripper('Chicken Breast')).to.be.equal('Chicken Breast');
        });

        it('should remove rear quantifiers from name', () => {
            expect(itemStripper('Chicken Breast x32')).to.be.equal('Chicken Breast');
        });

        it('should remove rear quantifiers from name', () => {
            expect(itemStripper('Chicken Breast x 32')).to.be.equal('Chicken Breast');
        });

        it('should remove rear quantifiers from name', () => {
            expect(itemStripper('Chicken Breast 32lbs')).to.be.equal('Chicken Breast');
        });

        it('should remove rear quantifiers from name', () => {
            expect(itemStripper('Chicken Breast 3x')).to.be.equal('Chicken Breast');
        });

        it('should not remove important details from name', () => {
            expect(itemStripper('46oz x Evaporated Milk')).to.be.equal('Evaporated Milk');
        });

        it('should not remove important details from name', () => {
            expect(itemStripper('Evaporated Milk')).to.be.equal('Evaporated Milk');
        });

    })

});
