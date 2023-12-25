import { useMutation, useQuery } from '@apollo/client';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
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
import { useLoginStore, useProductStore } from 'zustand/store';

// let products: any = [
//   {
//     id: 1,
//     productImageUrl: require('../../assets/images/product1.jpg'),
//     title: 'Tomatoes',
//     price: 19.99,
//     quantity: 2,
//     Buyer: 'John Doe',
//     paymentStatus: 'Paid',
//   },
//   {
//     id: 2,
//     productImageUrl: require('../../assets/images/product1.jpg'),
//     title: 'Apples',
//     price: 29.99,
//     quantity: 1,
//     Buyer: 'Jane Smith',
//     paymentStatus: 'Pending',
//   },
//   {
//     id: 3,
//     productImageUrl: require('../../assets/images/product1.jpg'),
//     title: 'Jackfruits',
//     price: 39.99,
//     quantity: 3,
//     Buyer: 'Bob Johnson',
//     paymentStatus: 'Paid',
//   },
//   {
//     id: 4,
//     productImageUrl: require('../../assets/images/product1.jpg'),
//     title: 'Mushrooms',
//     price: 39.99,
//     quantity: 3,
//     Buyer: 'Bob Johnson',
//     paymentStatus: 'Paid',
//   },
//   {
//     id: 5,
//     productImageUrl: require('../../assets/images/product1.jpg'),
//     title: 'Carrots',
//     price: 39.99,
//     quantity: 3,
//     Buyer: 'Bob Johnson',
//     paymentStatus: 'Paid',
//   },
//   {
//     id: 6,
//     productImageUrl: require('../../assets/images/product1.jpg'),
//     title: 'Pencils',
//     price: 39.99,
//     quantity: 3,
//     Buyer: 'Bob Johnson',
//     paymentStatus: 'Paid',
//   },
//   {
//     id: 7,
//     productImageUrl: require('../../assets/images/product1.jpg'),
//     title: 'Lamps',
//     price: 39.99,
//     quantity: 3,
//     Buyer: 'Bob Johnson',
//     paymentStatus: 'Paid',
//   },
//   {
//     id: 8,
//     productImageUrl: require('../../assets/images/product1.jpg'),
//     title: 'Curtains',
//     price: 39.99,
//     quantity: 3,
//     Buyer: 'Bob Johnson',
//     paymentStatus: 'Paid',
//   },
//   // Add more products as needed
// ];

let products: any;

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
  const theme = useColorScheme();
  const [loading, setLoading] = useState(false);
  const { setUser } = useLoginStore();
  const { setProducts } = useProductStore();
  const router = useRouter();
  const [loginUser, { loading: loginUserLoading, error: loginError }] = useMutation(LOGIN_USER);
  // const [getAllProducts, { loading: getAllProductsLoading, error: getAllProductsError }] =
  //   useQuery(GET_ALL_PRODUCTS);
  const {
    loading: getAllProductsLoading,
    error: getAllProductsrError,
    data: getAllProductsData,
    refetch: refetchProducts,
  } = useQuery(GET_ALL_PRODUCTS);

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
          ToastAndroid.show('Logged in Successfully !!!', ToastAndroid.BOTTOM);
        }
      } catch (error: any) {
        ToastAndroid.show('Error Logging in !!!', ToastAndroid.BOTTOM);
        console.log('Error while logging in', error);
      }
    } else {
      ToastAndroid.show('No User Data, Try again !!!', ToastAndroid.BOTTOM);
    }
  };

  const handleBuy = (product: any) => {
    console.log(`Buy pressed for ${product.title}`);
  };

  const handleAdd = (product: any) => {
    console.log(`Add pressed for ${product.title}`);
  };

  const handleLike = (product: any) => {
    console.log(`Like pressed for ${product.title}`);
  };

  const refetchButtonHandler = async() => {
    try {
      await refetchProducts();
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
      products = getAllProductsData?.getAllProducts;
      console.log(JSON.stringify(products, null, 2))
      ToastAndroid.show('refetch successful!!!', ToastAndroid.BOTTOM);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Error fetching Products, Try again !!!', ToastAndroid.BOTTOM);
    }
  }
  // Function to chunk the array into rows
  const chunkArray = (array: any, size: any) => {
    return array?.reduce(
      (acc: any, _: any, i: any) => (i % size ? acc : [...acc, array.slice(i, i + size)]),
      []
    );
  };

  // Chunk products array into rows of 2
  const productRows = chunkArray(products, 2);

  React.useEffect(() => {
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
              setTimeout(checkLoading, 100); // Check again after 100 milliseconds
            }
          };
          checkLoading();
        });

        // Now getAllProductsLoading is false, update the products
        products = getAllProductsData?.getAllProducts;
        
      } catch (error) {
        console.log(error)
        ToastAndroid.show('Error fetching Products, Try again !!!', ToastAndroid.BOTTOM);
      }
    };
    setLoading(true);
    FetchData();
    FetchProductData();
  }, [getAllProductsLoading]); // Empty dependency array ensures the effect runs only once after the initial render
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
              <Button backgroundColor={'green'} onPress={refetchButtonHandler}>
                Refetch
              </Button>
              <YGroup
                alignSelf="center"
                padding={10}
                width="100%"
                size="$5"
                flexDirection="column"
                // borderRightWidth={1.4}

                borderColor="$tabItemBorderColor">
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
                                  source={
                                    product.productImageUrl
                                      ? product.productImageUrl
                                      : require('../../assets/images/product1.jpg')
                                  }
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
                              onPress={() => handleAdd(product)}
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
