import { gql } from '@apollo/client';

// Mutation for creating a product
export const CREATE_ORDERITEM = gql`
  mutation CreateOrderItem(
    $userId: String!
    $productId: String!
    $quantity: Int!
    $productImageUrl: String!
    $price: Int!
  ) {
    createOrderItem(
      userId: $userId
      productId: $productId
      quantity: $quantity
      productImageUrl: $productImageUrl
      price: $price
    ) {
      id
      userId
      productId
      quantity
      productImageUrl
      price
      createdAt
      updatedAt
      user {
        id
      }
      product {
        id
      }
    }
  }
`;

export const GET_ALL_ORDERITEMS = gql`
  query Query {
    getAllOrderItems {
      id
      userId
      productId
      quantity
      productImageUrl
      price
      createdAt
      updatedAt
    }
  }
`;
export const DELETE_ORDERITEM = gql`
  mutation Mutation($deleteOrderItemId: ID!) {
    deleteOrderItem(id: $deleteOrderItemId) {
      id
    }
  }
`;
