import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, useColorScheme, StyleSheet, ActivityIndicator } from 'react-native';
import {
  YStack,
  Text,
  XStack,
  YGroup,
  ListItem,
  View,
  ScrollView,
  Button,
  Separator,
} from 'tamagui';

const products = [
  {
    id: 1,
    image: require('../../../assets/images/product1.jpg'),
    productName: 'Product 1',
    totalPrice: 19.99,
    quantity: 2,
    Buyer: 'John Doe',
    paymentStatus: 'Paid',
  },
  {
    id: 2,
    image: require('../../../assets/images/product1.jpg'),
    productName: 'Product 2',
    totalPrice: 29.99,
    quantity: 1,
    Buyer: 'Jane Smith',
    paymentStatus: 'Pending',
  },
  {
    id: 3,
    image: require('../../../assets/images/product1.jpg'),
    productName: 'Product 3',
    totalPrice: 39.99,
    quantity: 3,
    Buyer: 'Bob Johnson',
    paymentStatus: 'Paid',
  },
  {
    id: 4,
    image: require('../../../assets/images/product1.jpg'),
    productName: 'Product 4',
    totalPrice: 39.99,
    quantity: 3,
    Buyer: 'Bob Johnson',
    paymentStatus: 'Paid',
  },
  {
    id: 5,
    image: require('../../../assets/images/product1.jpg'),
    productName: 'Product 5',
    totalPrice: 39.99,
    quantity: 3,
    Buyer: 'Bob Johnson',
    paymentStatus: 'Paid',
  },
  {
    id: 6,
    image: require('../../../assets/images/product1.jpg'),
    productName: 'Product 6',
    totalPrice: 39.99,
    quantity: 3,
    Buyer: 'Bob Johnson',
    paymentStatus: 'Paid',
  },
  {
    id: 7,
    image: require('../../../assets/images/product1.jpg'),
    productName: 'Product 7',
    totalPrice: 39.99,
    quantity: 3,
    Buyer: 'Bob Johnson',
    paymentStatus: 'Paid',
  },
  {
    id: 8,
    image: require('../../../assets/images/product1.jpg'),
    productName: 'Product 8',
    totalPrice: 39.99,
    quantity: 3,
    Buyer: 'Bob Johnson',
    paymentStatus: 'Paid',
  },
  // Add more products as needed
];

const CartTabScreen = () => {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  React.useEffect(() => {
    // Set loading to true when starting to fetch data
    setLoading(true);

    // Your data fetching logic goes here

    // Set loading to false when data fetching is complete
    setLoading(false);
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <>
      {loading ? (
        <View style={{ ...styles.loadingContainer }}>
          <ActivityIndicator
            style={{ alignSelf: 'center', marginTop: '50%' }}
            size="large"
            color="green"
          />
        </View>
      ) : (
        <>
          <View $sm={{ padding: 16 , paddingBottom:0}}>
            <YGroup
              alignSelf="center"
              bordered
              width="100%"
              size="$5"
              elevation={10}
              borderColor={colorScheme === 'dark' ? '$green7Dark' : 'white'}
              separator={
                <Separator borderColor={colorScheme === 'dark' ? '$green7Dark' : '$gray5Light'} />
              }>
              <YGroup.Item>
                <ListItem
                  hoverTheme
                  onPress={() => {
                    router.push('/(tabs)/optionstab/myorders/');
                  }}
                  backgroundColor={'$listItemBackgroundColor'}
                  pressStyle={{ backgroundColor: '$listItemPressColor' }}
                  title="My Orders"
                  icon={<FontAwesome5 solid size={22} name="shopping-basket" />}
                  scaleIcon={2}
                  size="$4.5"
                  iconAfter={<FontAwesome5 name="chevron-right" size={18} />}
                />
              </YGroup.Item>
            </YGroup>
          </View>
          <ScrollView overScrollMode="never" $sm={{ flex: 1, flexDirection: 'column' }}>
            <YStack $sm={{ padding: 15 }}>
              {products.map((product) => (
                <ListItemDemo2
                  key={product.id}
                  productImage={product.image}
                  productName={product.productName}
                  productPrice={product.totalPrice}
                  productQuantity={product.quantity}
                  buyerName={product.Buyer}
                  paymentStatus={product.paymentStatus}
                />
              ))}
            </YStack>
          </ScrollView>
          <View $sm={{ padding: 10, paddingRight: 15, paddingLeft: 15 }}>
            <Button
              pressStyle={{ backgroundColor: '$green8Dark' }}
              backgroundColor="$green9Dark"
              color={colorScheme === 'dark' ? 'white' : 'black'}>
              Buy Everything
            </Button>
          </View>
        </>
      )}
    </>
  );
};

export default CartTabScreen;

function ListItemDemo2({
  productImage,
  productName,
  productPrice,
  productQuantity,
  buyerName,
  paymentStatus,
}: any) {
  const colorScheme = useColorScheme();
  return (
    <XStack $sm={{ marginBottom: 10 }}>
      <YGroup
        alignSelf="center"
        bordered
        width="100%"
        size="$5"
        borderRightWidth={1.4}
        borderColor="$tabItemBorderColor">
        <YGroup.Item>
          <ListItem
            borderWidth={0.5}
            onPress={() => {
              console.log(productName);
            }}
            elevation={15}
            $sm={{ backgroundColor: '$listItemBackgroundColor' }}
            pressStyle={{ backgroundColor: '$listItemPressColor' }}
            title={productName}
            subTitle={
              <View $sm={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                <Text color="gray">Quantity: {productQuantity}</Text>
                <Text color="gray">Buyer: {buyerName}</Text>
                <Text color="gray">Status: {paymentStatus}</Text>
              </View>
            }
            iconAfter={() => (
              <XStack>
                <Text color="gray" $sm={styles.productPrice}>
                  ${productPrice.toFixed(2)}
                </Text>
              </XStack>
            )}
            icon={
              <Image
                borderRadius={5}
                source={
                  productImage ? productImage : require('../../../assets/images/product1.jpg')
                }
                style={{ width: 130, height: 130 }}
              />
            }
            size="$4"
            padding={7}
            backgroundColor="$listItemBackground">
            <XStack $sm={{ flex: 1, flexDirection: 'row' }}>
              <Button size="$3" marginRight={10} marginTop={5} backgroundColor="$green10Dark">
                <Text color="$background">Buy Now</Text>
              </Button>
              <Button
                backgroundColor="$red8Dark"
                marginTop={5}
                size="$3"
                icon={<FontAwesome5 solid size={19} color="white" name="trash-alt" />}
              />
            </XStack>
          </ListItem>
        </YGroup.Item>
      </YGroup>
    </XStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  orderCardImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
  },
  orderCardImage: {
    width: '100%',
    height: '100%',
  },
  orderCardContent: {
    marginLeft: 16,
    flex: 1,
  },
  orderCardProductName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderCardDetails: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  fabButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderRadius: 50,
    backgroundColor: 'green',
    padding: 16,
  },
  productPrice: {
    fontSize: 14,
    marginTop: 4,
  },
});
