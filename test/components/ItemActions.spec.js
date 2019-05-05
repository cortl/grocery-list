import {shallow} from "enzyme/build";
import React from "react";
import {expect} from "../utils/chai";
import Chance from "chance";
import {ItemActions, mapDispatchToProps} from "../../src/components/items/ItemActions";
import * as sinon from "sinon";
import Category from "../../src/components/items/Category";
import Icon from "../../src/components/Icon";
import * as Actions from "../../src/actions";
import {CATEGORIES} from "../../src/constants/categories";

const chance = new Chance();
const sandbox = sinon.createSandbox();

describe('Item Actions', () => {

    let wrapper,
        id = chance.string(),
        name = chance.string(),
        userId = chance.string(),
        category = {
            categoryId: chance.string(),
            associationId: chance.string(),
            textColor: chance.string()
        },
        categoryChange = chance.string,
        changeCategorySpy,
        removeItemSpy;

    const whenComponentIsRendered = () => {
        wrapper = shallow(<ItemActions
            itemId={id}
            name={name}
            category={category}
            changeCategory={changeCategorySpy}
            removeItem={removeItemSpy}
        />)
    };

    beforeEach(() => {
        changeCategorySpy = sandbox.stub().returns(categoryChange);
        removeItemSpy = sandbox.spy();

        whenComponentIsRendered()
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should render in a div', () => {
        expect(wrapper).to.have.type('div');
        expect(wrapper).to.have.className('float-right');
    });

    describe('Category Button', () => {

        it('should have a button', () => {
            expect(wrapper.find('button').at(0)).to.have.prop('type', 'button');
            expect(wrapper.find('button').at(0)).to.have.className('btn btn-link');
            expect(wrapper.find('button').at(0)).to.have.prop('id', `${id}dropDown`);
            expect(wrapper.find('button').at(0)).to.have.prop('data-toggle', 'dropdown');
            expect(wrapper.find('button').at(0)).to.have.prop('aria-haspopup', 'true');
            expect(wrapper.find('button').at(0)).to.have.prop('aria-expanded', 'true');
        });

        it('should have an Icon', () => {
            expect(wrapper.find(Icon).at(0)).to.have.prop('color', category.textColor);
            expect(wrapper.find(Icon).at(0)).to.have.prop('type', 'cog');
        });

        it('should have a dropdown', () => {
            expect(wrapper.find('ul')).to.have.className('dropdown-menu');
            expect(wrapper.find('ul')).to.have.prop('aria-labelledby', `${id}dropDown`);
        });

        it('should have a category for every category given', () => {
            Object.keys(CATEGORIES).forEach((key, index) => {
                expect(wrapper.find(Category).at(index)).to.have.prop('change', categoryChange);
                expect(wrapper.find(Category).at(index)).to.have.prop('category', CATEGORIES[key]);
            })
        });

        it('should call new category prop if current category does not exist', () => {
            category.associationId = '';

            whenComponentIsRendered();

            Object.keys(CATEGORIES).forEach((key, index) => {
                expect(wrapper.find(Category).at(index)).to.have.prop('change', categoryChange);
                expect(wrapper.find(Category).at(index)).to.have.prop('category', CATEGORIES[key]);
            })
        });

    });

    describe('Delete Button', () => {
        it('should have a button', () => {
            expect(wrapper.find('button').at(1)).to.have.prop('type', 'button');
            expect(wrapper.find('button').at(1)).to.have.className('btn btn-link');
        });

        it('should call removeItem when clicked', () => {
            wrapper.find('button').at(1).simulate('click');

            expect(removeItemSpy).to.have.been.calledWith(id);
        });

        it('should have an icon', () => {
            expect(wrapper.find(Icon).at(1)).to.have.prop('color', category.textColor);
            expect(wrapper.find(Icon).at(1)).to.have.prop('type', 'trash');
        });
    });

    describe('Redux', () => {
        let dispatchSpy,
            actualProps;

        beforeEach(() => {
            sandbox.stub(Actions, 'removeItem');
            sandbox.stub(Actions, 'changeCategory');
            dispatchSpy = sandbox.spy();

            actualProps = mapDispatchToProps(dispatchSpy);
        });

        afterEach(() => {
            sandbox.restore();
        });
        it('should map removeItem', () => {
            actualProps.removeItem(id);
            expect(dispatchSpy).to.have.been.calledWith(Actions.removeItem());
        });

        it('should map changeCategory', () => {
            actualProps.changeCategory(id, userId, name)(category);
            expect(dispatchSpy).to.have.been.calledWith(Actions.changeCategory());
        })
    });
});
