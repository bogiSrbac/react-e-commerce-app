import { CartItemContainer, ItemsDetails, Img, Name } from "./cart-item.styles";

const CartItem = ({ cartItem }) => {

    const { name, imageUrl, price, quantity } = cartItem;

    return (

        <CartItemContainer>
            <Img src={imageUrl} alt={`${name}`} />
            <ItemsDetails>
                <Name>{name}</Name>
                <span className='price'>{quantity} x ${price}</span>
            </ItemsDetails>
        </CartItemContainer>
    );
};

export default CartItem;