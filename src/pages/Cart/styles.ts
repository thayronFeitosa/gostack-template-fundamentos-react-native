import styled from 'styled-components/native';
import { FlatList } from 'react-native';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface ButtonPros {
  plus?: boolean;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const ProductContainer = styled.View`
  border-radius: 5px;
  margin-top: 60px;
  flex: 1;
  flex-direction: row;
`;

export const ProductList = styled(FlatList as new () => FlatList<Product>)`
  padding: 0 10px;
`;

export const Product = styled.View.attrs({
  elevation: 2,
})`
  background: #fff;
  padding: 15px 10px;
  border-radius: 5px;
  margin: 5px;
  flex-direction: row;
`;

export const ProductImage = styled.Image`
  height: 92px;
  width: 92px;
`;

export const ProductTitleContainer = styled.View`
  font-size: 16px;
  margin-left: 5px;
`;

export const ProductTitle = styled.Text`
  font-size: 16px;
`;

export const ProductPriceContainer = styled.View`
  flex-direction: column;
`;

export const TotalContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

export const ProductSinglePrice = styled.Text`
  font-size: 12px;
  color: #a0a0b3;
  margin-top: 8px;
`;

export const ProductPrice = styled.Text`
  font-weight: bold;
  margin-top: 5px;

  font-size: 16px;
  color: #c45500;
`;

export const ProductQuantity = styled.Text`
  margin-top: 5px;
  margin-right: 10px;

  font-size: 16px;
  color: #c45500;
`;

export const ActionContainer = styled.View`
  align-self: flex-end;
  align-items: center;
  justify-content: space-between;

  margin-left: auto;
`;

export const ActionButton = styled.TouchableOpacity<ButtonPros>`
  background: ${({ plus }) =>
    plus ? 'rgba(7, 126, 99, 0.1)' : 'rgba(232, 63, 91, 0.1)'};
  border-radius: 5px;
  padding: 12px;
  margin-bottom: 5px;
`;

export const EmptyBag = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const EmptyBagText = styled.Text`
  font-size: 16px;
  color: #e83f5b;
  margin-top: 20px;
`;

export const TotalProductsContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0px;
  flex-direction: row;
  background: #232f3e;
  padding: 17px 20px;
  justify-content: space-between;
  align-items: center;

  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

export const TotalProductsText = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-left: 15px;
  flex: 1;
  font-weight: bold;
`;

export const SubtotalValue = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;
