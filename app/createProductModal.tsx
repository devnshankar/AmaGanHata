// CreateProductModal.tsx
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER } from 'Graphql/user.operations';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button, Input, Text, View } from 'tamagui';
import { useLoginStore, useProductStore } from 'zustand/store';

import { CREATE_PRODUCT } from '../Graphql/product.operations'; // Import your product mutation

export default function CreateProductModalScreen() {
  const router = useRouter();
  const { user } = useLoginStore();
  const { products, setProducts, addProduct } = useProductStore();
  const [formData, setFormData] = useState({
    ownerId: user?.id,
    title: '',
    description: '',
    category: '',
    price: '',
    instock: '',
    isPublished: true,
    productImageUrl: '',
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const [createProduct, { loading: createProductLoading, error: createProductError }] =
    useMutation(CREATE_PRODUCT);

  const {
    loading: getUserLoading,
    error: getUserError,
    data: userData,
    refetch: refetchUser,
  } = useQuery(GET_USER, {
    variables: { getUserId: formData?.ownerId },
  });

  const HandleCreateProduct = async () => {
    try {
      // Call the createProduct mutation
      const { data: createdProductData } = await createProduct({
        variables: {
          ownerId: formData.ownerId,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          price: parseInt(formData.price, 10),
          instock: parseInt(formData.instock, 10),
          isPublished: formData.isPublished, // You may adjust this based on your requirements
          productImageUrl: formData.productImageUrl,
        },
      });
      await refetchUser();
      // await setProducts(userData.getUser.products);
      addProduct(createdProductData.createProduct);
      router.back();
      Toast.show({
        type: 'success',
        text1: 'Product Creation Successful',
        text2: 'Product created successfully !!!',
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <View $sm={styles.container}>
      <Text $sm={styles.title}>Create Product</Text>
      <Input
        $sm={styles.input}
        placeholderTextColor="gray"
        placeholder="Title"
        // value={formData.title || ''}
        onChangeText={(text) => handleInputChange('title', text)}
      />
      <Input
        $sm={styles.input}
        placeholder="Description"
        placeholderTextColor="gray"
        // value={formData.description || ''}
        onChangeText={(text) => handleInputChange('description', text)}
      />
      <Input
        $sm={styles.input}
        placeholder="Category"
        placeholderTextColor="gray"
        // value={formData.categoryId || ''}
        onChangeText={(text) => handleInputChange('category', text)}
      />
      <Input
        $sm={styles.input}
        placeholder="Price"
        placeholderTextColor="gray"
        // value={formData.price || ''}
        onChangeText={(text) => handleInputChange('price', text)}
        keyboardType="numeric"
      />
      <Input
        $sm={styles.input}
        placeholder="In Stock"
        placeholderTextColor="gray"
        // value={formData.instock || ''}
        onChangeText={(text) => handleInputChange('instock', text)}
        keyboardType="numeric"
      />
      <Button $sm={styles.button} onPress={HandleCreateProduct}>
        Create Product
      </Button>
      <Button
        $sm={styles.button}
        onPress={() => {
          router.back();
        }}>
        Cancel
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    width: '100%',
    borderRadius: 8,
  },
  button: {
    marginTop: 16,
    backgroundColor: 'blue',
    color: 'white',
  },
});
