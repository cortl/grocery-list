import { expect } from '../../utils/chai'
import React from "react";
import { mount, shallow } from "enzyme";
import { mapStateToProps, SignOut } from "../../../src/components/security/SignOut";
import Chance from "chance";
import { Menu } from 'semantic-ui-react';
import * as sinon from "sinon";

const sandbox = sinon.createSandbox();
const chance = new Chance();

describe('Sign Out', () => {

    let wrapper,
        signOutSpy = sandbox.spy();

    beforeEach(() => {
        wrapper = shallow(<SignOut
            auth={{
                isEmpty: false
            }}
            signOut={signOutSpy}
        />)
    });

    it('should be a sign out button', () => {
        expect(wrapper).to.have.type(Menu.Item);
        expect(wrapper.childAt(0)).to.have.text('Sign Out');
    });

    describe('when sign out is clicked', () => {
        beforeEach(() => {
            wrapper.simulate('click');
        });

        it('should call sign out', () => {
            expect(signOutSpy).to.have.been.calledOnce;
        });
    });

    describe('when auth is not empty', () => {
        let context,
            auth;

        beforeEach(() => {
            context = {
                router: {
                    history: {
                        push: sinon.spy()
                    }
                }
            };
            auth = {
                isEmpty: false
            };

            wrapper = mount(<SignOut
                auth={auth}
            />, { context });
        })

        it('should not push the user to the signIn page', () => {
            expect(context.router.history.push).to.have.not.been.calledWith('/signIn')
        });

        describe('when the auth becomes empty', () => {
            beforeEach(() => {
                auth = {
                    isEmpty: true
                };

                wrapper.setProps({ auth: auth });
            });

            it('should push the user to the signIn page', () => {
                expect(context.router.history.push).to.have.been.calledWith('/signIn')
            });
        });
    });

    describe('Redux', () => {
        let props,
            state;
        beforeEach(() => {
            state = {
                firebase: {
                    auth: chance.string()
                }
            };
            props = mapStateToProps(state);
        });

        it('should map state to props', () => {
            expect(props.auth).to.be.equal(state.firebase.auth)
        });
    });

});
