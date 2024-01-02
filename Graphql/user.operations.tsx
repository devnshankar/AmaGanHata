import { gql } from '@apollo/client';

// Mutation for creating a user
export const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      firstName
      lastName
      email
      id
      token
    }
  }
`;

export const GET_USER = gql`
  query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      id
      firstName
      lastName
      email
      password
      salt
      token
      phoneNumber
      address
      profileImageUrl
      products {
        id
        title
        description
        category
        price
        instock
        isPublished
        createdAt
        updatedAt
      }
      cart {
        id
        userId
        productId
        quantity
        productImageUrl
        price
        createdAt
        updatedAt
        product {
          title
          price
        }
        user {
          firstName
          lastName
        }
      }
      notifications {
        id
        title
        description
        createdAt
      }
      orders {
        id
        status
        createdAt
        updatedAt
        products {
          title
        }
      }
      createdAt
      updatedAt
    }
  }
`;

// Mutation for logging in a user
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      firstName
      lastName
      phoneNumber
      email
      profileImageUrl
      address
      token
      products {
        id
        title
        description
        category
        price
        instock
        isPublished
        ownerId
        productImageUrl
        createdAt
        updatedAt
      }
      cart {
        id
        userId
        productId
        quantity
        productImageUrl
        price
        createdAt
        updatedAt
        product {
          title
          price
        }
        user {
          firstName
          lastName
        }
      }
      notifications {
        id
        title
        description
        createdAt
      }
      orders {
        id
        status
        createdAt
        updatedAt
        products {
          title
        }
      }
      createdAt
      updatedAt
    }
  }
`;

// Mutation for updating user data
export const UPDATE_USER = gql`
  mutation UpdateUser(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
    $phoneNumber: String
    $profileImageUrl: String
    $address: String
    $token: String
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      phoneNumber: $phoneNumber
      profileImageUrl: $profileImageUrl
      address: $address
      token: $token
    ) {
      id
      firstName
      lastName
      email
      phoneNumber
      profileImageUrl
      address
      token
      products {
        id
        title
        description
        category
        price
        instock
        isPublished
        ownerId
        productImageUrl
        createdAt
        updatedAt
      }
      cart {
        id
        quantity
        createdAt
        updatedAt
      }
      notifications {
        id
        title
        description
        createdAt
      }
      orders {
        id
        status
        createdAt
        updatedAt
        products {
          title
        }
      }
      createdAt
      updatedAt
    }
  }
`;
