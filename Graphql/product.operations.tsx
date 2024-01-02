import { gql } from '@apollo/client';

// Mutation for creating a product
export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $title: String!
    $category: String!
    $price: Int!
    $ownerId: String!
    $description: String
    $instock: Int
    $productImageUrl: String
    $isPublished: Boolean
  ) {
    createProduct(
      title: $title
      category: $category
      price: $price
      ownerId: $ownerId
      description: $description
      instock: $instock
      productImageUrl: $productImageUrl
      isPublished: $isPublished
    ) {
      id
      ownerId
      title
      description
      category
      price
      instock
      isPublished
      productImageUrl
      createdAt
      updatedAt
    }
  }
`;
export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      id
      ownerId
      title
      description
      category
      price
      instock
      isPublished
      productImageUrl
      createdAt
      updatedAt
    }
  }
`;
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($deleteProductId: ID!) {
    deleteProduct(id: $deleteProductId) {
      id
      title
      price
    }
  }
`;
