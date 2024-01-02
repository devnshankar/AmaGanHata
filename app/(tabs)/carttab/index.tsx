import { useMutation } from '@apollo/client';
import { FontAwesome5 } from '@expo/vector-icons';
import { DELETE_ORDERITEM } from 'Graphql/orderItem.operations';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, useColorScheme, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native';
import Toast from 'react-native-toast-message';
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
import { useOrderItemStore } from 'zustand/store';

const CartTabScreen = () => {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const { orderItems, setOrderItems } = useOrderItemStore();

  const [deleteOrderItem, { loading: deleteOrderItemLoading, error: deleteOrderItemError }] =
    useMutation(DELETE_ORDERITEM);

  const HandleDeleteOrderItem = async (orderItemId: any) => {
    try {
      // Call the createProduct mutation
      const { data: deletedOrderItemData } = await deleteOrderItem({
        variables: {
          deleteOrderItemId: orderItemId,
        },
      });

      console.log(JSON.stringify(deletedOrderItemData, null, 2));
      const orderItemIdToDelete = orderItemId; // Replace 'yourUniqueId' with the actual ID you want to delete

      Toast.show({
        type: 'success',
        text1: `Product removed from cart`,
        text2: 'Product removed successfully !!!',
      });
      const updatedProducts = orderItems.filter(
        (orderItem) => orderItem.id !== orderItemIdToDelete
      );
      setOrderItems(updatedProducts);
    } catch (error) {
      ToastAndroid.show('Error removing product !!!', ToastAndroid.BOTTOM);
      console.error('Error creating product:', error);
    }
  };

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
          <View $sm={{ padding: 10, paddingBottom: 10 }}>
            <YGroup
              alignSelf="center"
              width="100%"
              size="$5"
              elevation={10}
              borderWidth={0.7}
              borderTopWidth={1.1}
              borderRightWidth={1.2}
              borderColor={colorScheme === 'dark' ? '#3a3a3a' : 'transparent'}
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
            <YStack $sm={{ padding: 10 }}>
              {orderItems.map((orderItem) => (
                <ListItemDemo2
                  key={orderItem?.id}
                  orderItemId={orderItem?.id}
                  orderItemImage={orderItem?.productImageUrl || 'null'}
                  orderItemName={'product'}
                  orderItemPrice={orderItem?.totalPrice || 55}
                  orderItemQuantity={orderItem?.quantity}
                  buyerName={orderItem?.Buyer || 'buyer'}
                  paymentStatus={orderItem?.paymentStatus || 'pending'}
                  HandleDeleteOrderItem={HandleDeleteOrderItem}
                />
              ))}
            </YStack>
          </ScrollView>
          <View $sm={{ padding: 10 }}>
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
  orderItemId,
  orderItemImage,
  orderItemName,
  orderItemPrice,
  orderItemQuantity,
  buyerName,
  paymentStatus,
  HandleDeleteOrderItem,
}: any) {
  const colorScheme = useColorScheme();
  return (
    <XStack $sm={{ marginBottom: 10 }}>
      <YGroup
        alignSelf="center"
        width="100%"
        size="$5"
        borderWidth={0.7}
        borderTopWidth={1.1}
        borderRightWidth={1.2}
        borderColor={colorScheme === 'dark' ? '#3a3a3a' : 'transparent'}>
        <YGroup.Item>
          <ListItem
            // borderWidth={0.5}
            onPress={() => {
              console.log(orderItemName);
            }}
            // elevation={15}
            $sm={{
              backgroundColor: '$listItemBackgroundColor',
              elevation: 15,
              size: '$4',
              padding: 7,
            }}
            pressStyle={{ backgroundColor: '$listItemPressColor' }}
            title={orderItemName}
            subTitle={
              <View $sm={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                <Text color="gray">Quantity: {orderItemQuantity}</Text>
                <Text color="gray">Buyer: {buyerName}</Text>
                <Text color="gray">Status: {paymentStatus}</Text>
              </View>
            }
            iconAfter={() => (
              <XStack>
                <Text color="gray" $sm={styles.productPrice}>
                  ${orderItemPrice.toFixed(2)}
                </Text>
              </XStack>
            )}
            icon={
              <Image
                borderRadius={5}
                source={{ uri: orderItemImage }}
                style={{ width: 130, height: 130 }}
              />
            }>
            <XStack $sm={{ flex: 1, flexDirection: 'row' }}>
              <Button size="$3" marginRight={10} marginTop={5} backgroundColor="$green10Dark">
                <Text color="$background">Buy Now</Text>
              </Button>
              <Button
                backgroundColor="$red8Dark"
                onPress={() => {HandleDeleteOrderItem(orderItemId);}}
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
