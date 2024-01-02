import { useMutation } from '@apollo/client';
import { FontAwesome5 } from '@expo/vector-icons';
import { DELETE_PRODUCT } from 'Graphql/product.operations';
import ProductList from 'components/ProductList';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';
import { View, Button, ScrollView, YStack } from 'tamagui';
import { useLoginStore, useProductStore } from 'zustand/store';

const MyProductsTabScreen = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { products, setProducts } = useProductStore();
  const [loading, setLoading] = React.useState(true);

  const [deleteProduct, { loading: deleteProductLoading, error: deleteProductError }] =
    useMutation(DELETE_PRODUCT);

  const HandleDeleteProduct = async (productId:any) => {
    try {
      // Call the createProduct mutation
      const { data: deletedProductData } = await deleteProduct({
        variables: {
          deleteProductId: productId,
        },
      });

      console.log(JSON.stringify(deletedProductData, null, 2))
      const productIdToDelete = productId; // Replace 'yourUniqueId' with the actual ID you want to delete

      Toast.show({
        type: 'success',
        text1: `${deletedProductData.deleteProduct.title} deleted`,
        text2: 'Product deleted successfully !!!',
      });
      const updatedProducts = products.filter((product) => product.id !== productIdToDelete);
      await setProducts(updatedProducts);
      // Close the modal or perform any other necessary actions
      // onClose();
    } catch (error) {
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            style={{ alignSelf: 'center', marginTop: '50%' }}
            size="large"
            color="green"
          />
        </View>
      ) : (
        <>
          <View>
            <Button
              $sm={{
                backgroundColor: '#185c3e',
                height: 50,
                width: 50,
                position: 'absolute',
                zIndex: 1000,
                right: 15,
                top: 645,
              }}
              elevate
              onPress={() => {
                router.push('/createProductModal');
              }}>
              <FontAwesome5
                name="plus"
                size={15}
                color={colorScheme === 'dark' ? 'lightgreen' : 'lightgreen'}
              />
            </Button>
          </View>
          <ScrollView overScrollMode="never" $sm={{ flex: 1, flexDirection: 'column' }}>
            <YStack $sm={{ padding: 10 }}>
              {(products || [])
                .slice()
                .reverse()
                .map((products) => (
                  <ProductList
                    key={products.id}
                    productId={products.id}
                    productTitle={products.title}
                    productCategory={products.category}
                    productInstock={products.instock}
                    productPublishStatus={products.isPublished}
                    productPrice={products.price}
                    productImage={products.productImageUrl}
                    handleDeleteProduct={HandleDeleteProduct}
                  />
                ))}
            </YStack>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default MyProductsTabScreen;
