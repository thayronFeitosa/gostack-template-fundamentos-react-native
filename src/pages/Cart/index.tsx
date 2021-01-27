import React, { useMemo } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { View } from 'react-native';

import LongPressButton from '../../components/LongPressButton';

import {
  Container,
  ProductContainer,
  ProductList,
  Product,
  ProductImage,
  ProductTitleContainer,
  ProductTitle,
  ProductPriceContainer,
  ProductSinglePrice,
  TotalContainer,
  ProductPrice,
  ProductQuantity,
  ActionContainer,
  ActionButton,
  EmptyBag,
  EmptyBagText,
  TotalProductsContainer,
  TotalProductsText,
  SubtotalValue,
} from './styles';

import { useCart } from '../../hooks/cart';

import formatValue from '../../utils/formatValue';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const { increment, decrement, products, removeAllFromCart } = useCart();

  function handleIncrement(id: string): void {
    increment(id);
  }

  function handleDecrement(id: string): void {
    decrement(id);
  }

  const cartTotal = useMemo(() => {
    // TODO RETURN THE SUM OF THE QUANTITY OF THE PRODUCTS IN THE CART
    const total = products.reduce((accumulator, product) => {
      return accumulator + product.price * product.quantity;
    }, 0);

    return formatValue(total);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    // TODO RETURN THE SUM OF THE QUANTITY OF THE PRODUCTS IN THE CART
    const totalItems = products.reduce((accumulator, product) => {
      return accumulator + product.quantity;
    }, 0);

    return totalItems;
  }, [products]);

  return (
    <Container>
      {products.length === 0 && (
        <EmptyBag>
          <FeatherIcon name="frown" size={40} color="rgba(35, 47, 62, 1)" />
          <EmptyBagText>Oh no! seu carrinha está fazio...</EmptyBagText>
        </EmptyBag>
      )}
      <ProductContainer>
        <ProductList
          data={products}
          keyExtractor={item => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }: { item: Product }) => {
            return (
              <LongPressButton id={item.id} title={item.title}>
                <Product>
                  <ProductImage source={{ uri: item.image_url }} />
                  <ProductTitleContainer>
                    <ProductTitle>{item.title}</ProductTitle>
                    <ProductPriceContainer>
                      <ProductSinglePrice>
                        {formatValue(item.price)}
                      </ProductSinglePrice>

                      <TotalContainer>
                        <ProductQuantity>{`${item.quantity}x`}</ProductQuantity>

                        <ProductPrice>
                          {formatValue(item.price * item.quantity)}
                        </ProductPrice>
                      </TotalContainer>
                    </ProductPriceContainer>
                  </ProductTitleContainer>
                  <ActionContainer>
                    <ActionButton
                      plus
                      testID={`increment-${item.id}`}
                      onPress={() => handleIncrement(item.id)}
                    >
                      <FeatherIcon name="plus" color="#077e63" size={16} />
                    </ActionButton>
                    <ActionButton
                      testID={`decrement-${item.id}`}
                      onPress={() => handleDecrement(item.id)}
                    >
                      <FeatherIcon name="minus" color="#E83F5B" size={16} />
                    </ActionButton>
                  </ActionContainer>
                </Product>
              </LongPressButton>
            );
          }}
        />
      </ProductContainer>

      <TotalProductsContainer>
        <View
          style={{ alignItems: 'center', flexDirection: 'row', width: 100 }}
        >
          <FeatherIcon name="shopping-cart" color="#fff" size={24} />
          <TotalProductsText>{`${totalItensInCart} itens`}</TotalProductsText>
        </View>

        <ActionButton
          onPress={() => removeAllFromCart()}
          style={{
            position: 'absolute',
            bottom: 0,
            left: '49%',
            right: '49%',
          }}
        >
          <FeatherIcon name="trash" color="#fff" size={24} />
        </ActionButton>
        <SubtotalValue>{cartTotal}</SubtotalValue>
      </TotalProductsContainer>
    </Container>
  );
};

export default Cart;
