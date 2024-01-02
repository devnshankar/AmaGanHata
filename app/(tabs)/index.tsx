import { useMutation, useQuery } from '@apollo/client';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { CREATE_ORDERITEM, GET_ALL_ORDERITEMS } from 'Graphql/orderItem.operations';
import { GET_ALL_PRODUCTS } from 'Graphql/product.operations';
import { LOGIN_USER } from 'Graphql/user.operations';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ToastAndroid,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {
  YStack,
  H2,
  Separator,
  Button,
  Input,
  TextArea,
  ScrollView,
  Text,
  Card,
  View,
  ListItem,
  XStack,
  YGroup,
} from 'tamagui';
import {
  useFetchedProductStore,
  useLoginStore,
  useOrderItemStore,
  useProductStore,
} from 'zustand/store';

async function GetToken() {
  try {
    const token = await SecureStore.getItemAsync('token');
    return token;
  } catch (error) {
    console.error('Error getting token from SecureStore:', error);
    return null; // or handle the error appropriately
  }
}

export default function HomeTabScreen() {
  // const [canLogin, setCanLogin] = useState(false)
  const [loading, setLoading] = useState(false);
  const { user, setUser, setShowLogin } = useLoginStore();
  const { setProducts } = useProductStore();
  const { setOrderItems, addOrderItem } = useOrderItemStore();
  const { fetchedProducts, setFetchedProducts } = useFetchedProductStore();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loginUser, { loading: loginUserLoading, error: loginError }] = useMutation(LOGIN_USER);
  const [createOrderItem, { loading: createOrderItemLoading, error: createOrderItemError }] =
    useMutation(CREATE_ORDERITEM, {
      refetchQueries: [
        {
          query: GET_ALL_ORDERITEMS,
        },
      ],
    });

  const {
    loading: getAllProductsLoading,
    error: getAllProductsError,
    data: getAllProductsData,
    refetch: refetchProducts,
  } = useQuery(GET_ALL_PRODUCTS);

  // LOGIN USER HANDLER
  const LoginUser = async () => {
    const email = await SecureStore.getItemAsync('email').catch((error) => {
      console.error('Error getting email from SecureStore:', error);
    });
    const password = await SecureStore.getItemAsync('password').catch((error) => {
      console.error('Error getting password from SecureStore:', error);
    });

    if (email && password) {
      try {
        const { data: loginUserData } = await loginUser({
          variables: { email, password },
        });
        const token = loginUserData.loginUser?.token;
        if (token) {
          await SecureStore.setItemAsync('token', token);
          // await SecureStore.setItemAsync('User', loginUserData.loginUser);
          // await SecureStore.setItemAsync('Products', loginUserData.loginUser.products);
          setUser(loginUserData.loginUser);
          setProducts(loginUserData.loginUser.products);
          setOrderItems(loginUserData.loginUser.cart);
          console.log(JSON.stringify(loginUserData.loginUser, null, 2));
          ToastAndroid.show('Login Successful', ToastAndroid.BOTTOM);
        }
      } catch (error: any) {
        ToastAndroid.show('Error Logging in !!!', ToastAndroid.BOTTOM);
        console.log('Error while logging in', error);
      }
    } else {
      ToastAndroid.show('No User Data, Try again !!!', ToastAndroid.BOTTOM);
    }
  };

  // ADD PRODUCT HANDLER
  const AddToCart = async (product: any) => {
    try {
      const { data: createOrderItemData } = await createOrderItem({
        variables: {
          userId: user?.id,
          productId: product?.id,
          //WARNING FOR NOW THE QUANTITY IS 4 MAKE IT DYNAMIC LATER
          quantity: 4,
          productImageUrl: product?.productImageUrl,
          price: product?.price,
        },
      });
      addOrderItem(createOrderItemData?.createOrderItem);
      ToastAndroid.show('Product added to cart !!!', ToastAndroid.BOTTOM);
    } catch (error: any) {
      ToastAndroid.show('Error Adding product to cart !!!', ToastAndroid.BOTTOM);
      console.log('Error while adding product to cart\n', error);
    }
  };

  const handleBuy = (product: any) => {
    console.log(`Buy pressed for ${product.title}`);
    console.log(JSON.stringify(fetchedProducts, null, 2));
  };

  const handleLike = (product: any) => {
    console.log(`Like pressed for ${product.title}`);
  };

  const refetchButtonHandler = async () => {
    try {
      await refetchProducts();
      await new Promise<void>((resolve) => {
        const checkLoading = () => {
          if (!getAllProductsLoading) {
            resolve();
          } else {
            setTimeout(checkLoading, 100); // Check again after 100 milliseconds
          }
        };
        checkLoading();
      });

      // Now getAllProductsLoading is false, update the products
      setFetchedProducts(getAllProductsData?.getAllProducts);
      ToastAndroid.show('refetch successful!!!', ToastAndroid.BOTTOM);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Error fetching Products, Try again !!!', ToastAndroid.BOTTOM);
    }
  };
  // Function to chunk the array into rows
  const chunkArray = (array: any, size: any) => {
    return array?.reduce(
      (acc: any, _: any, i: any) => (i % size ? acc : [...acc, array.slice(i, i + size)]),
      []
    );
  };

  // Chunk products array into rows of 2
  const productRows = chunkArray(fetchedProducts, 2);

  const FetchData = async () => {
    try {
      const token = await GetToken();
      if (token !== null) {
        const nullToken: any = { _h: 0, _i: 0, _j: null, _k: null };

        const propertiesMatch = Object.keys(nullToken).every(
          (key: any) => nullToken[key] === token[key]
        );

        if (propertiesMatch) {
          router.push('/loginModal');
        } else {
          //WARNING Uncomment this after you're done with the frontend part
          await LoginUser();
          setLoading(false);
        }
      } else {
        router.push('/loginModal');

        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  const FetchProductData = async () => {
    try {
      await refetchProducts();
      await new Promise<void>((resolve) => {
        const checkLoading = () => {
          if (!getAllProductsLoading) {
            resolve();
          } else {
            setTimeout(checkLoading, 100);
          }
        };
        checkLoading();
      });

      setFetchedProducts(getAllProductsData?.getAllProducts);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Error fetching Products, Try again !!!', ToastAndroid.BOTTOM);
    }
  };
  React.useEffect(() => {
    setLoading(true);
    FetchData();
    FetchProductData();
    setTimeout(function () {
      setShowLogin(true);
    }, 2000);
    setLoading(false);
  }, [loading, getAllProductsLoading]);

  return (
    <>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            style={{ alignSelf: 'center', marginTop: '50%' }}
            size="large"
            color="green"
          />
        </View>
      ) : (
        <>
          <XStack>
            <ScrollView>
              {loginUserLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator style={{ alignSelf: 'center' }} size="large" color="green" />
                  {/* <Text color="white">{num}</Text> */}
                </View>
              ) : null}
              <Button backgroundColor="green" onPress={refetchButtonHandler}>
                Refetch
              </Button>
              <YGroup alignSelf="center" padding={10} width="100%" size="$5" flexDirection="column">
                <YGroup.Item>
                  {productRows?.map((row: any, rowIndex: any) => (
                    <XStack
                      key={rowIndex}
                      $sm={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      {row.map((product: any, colIndex: any) => (
                        <ListItem
                          key={colIndex}
                          onPress={() => {
                            console.log(product);
                          }}
                          elevation={15}
                          borderWidth={0.7}
                          borderTopWidth={1.1}
                          borderRightWidth={1.2}
                          borderColor={colorScheme === 'dark' ? '#3a3a3a' : 'transparent'}
                          $sm={{
                            backgroundColor: '$listItemBackgroundColor',
                            width: '49%', // Adjust width for spacing
                            flexDirection: 'column',
                            borderWidth: 1,
                            borderRadius: 10,
                            marginBottom: 10,
                          }}
                          pressStyle={{ backgroundColor: '$listItemPressColor' }}
                          title={product.title}
                          subTitle={
                            <View
                              $sm={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                              }}>
                              <View
                                $sm={{
                                  borderWidth: 1,
                                  borderColor: 'lightgray',
                                  borderRadius: 12,
                                }}>
                                <Image
                                  borderRadius={10}
                                  source={{ uri: product.productImageUrl }}
                                  style={{ width: 180, height: 230 }}
                                />
                              </View>
                              <Text $sm={{ margin: 5 }} color="gray">
                                Price: {product.price}
                              </Text>
                            </View>
                          }
                          size="$4"
                          padding={7}
                          backgroundColor="$listItemBackground">
                          <XStack
                            $sm={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Button
                              onPress={() => handleBuy(product)}
                              size="$3"
                              width={84}
                              marginRight={7}
                              marginTop={5}
                              icon={
                                <FontAwesome5 solid size={15} color="white" name="shopping-bag" />
                              }
                              backgroundColor="$green10Dark">
                              <Text color="$background">Buy</Text>
                            </Button>
                            <Button
                              onPress={() => AddToCart(product)}
                              color="white"
                              backgroundColor="$yellow8Dark"
                              marginTop={5}
                              size="$3"
                              width={84}
                              icon={
                                <FontAwesome5 solid size={15} color="white" name="shopping-cart" />
                              }>
                              Add
                            </Button>
                          </XStack>
                        </ListItem>
                      ))}
                    </XStack>
                  ))}
                </YGroup.Item>
              </YGroup>
            </ScrollView>
          </XStack>
          {/* <YStack $sm={{ flex: 1, flexDirection: 'column' }}>
            <FlatList
              data={products.slice().reverse()}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              renderItem={({ item, index }) => (
                <Card
                  key={index}
                  $sm={{
                    flex: 1,
                    width: '48%',
                    padding: 5,
                    margin: 5,
                    marginBottom: 0,
                    marginRight: 0,
                  }}>
                  <Image
                    source={item.image}
                    style={{ borderRadius: 10, height: 200, width: '100%' }}
                  />
                  <Text>{item.title}</Text>
                  <Text>Total Price: ${item.price.toFixed(2)}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>Buyer: {item.Buyer}</Text>
                  <Text>Payment Status: {item.paymentStatus}</Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View $sm={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                      <Button backgroundColor="limegreen" onPress={() => handleBuy(item)}>
                        Buy
                      </Button>
                      <Button backgroundColor="gold" onPress={() => handleAdd(item)}>
                        Add
                      </Button>
                    </View>
                    <TouchableOpacity style={{ position: 'absolute', bottom: 130, right: 5 }}>
                      <FontAwesome5
                        size={22}
                        name="heart"
                        color="red"
                        onPress={() => handleLike(item)}
                      />
                    </TouchableOpacity>
                  </View>
                </Card>
              )}
            />
          </YStack> */}
        </>
      )}
    </>
  );
}
