import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdowv from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { NavigationContainer, LogoCointainer, NavLinks, NavLink } from "./navigation.styles";

const Navigation = () => {

    const { currentUser } = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);



    return (
        <Fragment>
            <NavigationContainer>
                <LogoCointainer to="/">
                    <CrwnLogo className="logo" />
                </LogoCointainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    
                    {currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                    ) : (
                        <NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                    )}
                    <CartIcon />

                </NavLinks>
                {isCartOpen && <CartDropdowv />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;