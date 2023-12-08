import { gql } from '@apollo/client';

// Mutation for creating a user
export const CREATE_USER = gql`
  mutation CreateUser($firstName: String!, $email: String!, $password: String!) {
    createUser(firstName: $firstName, email: $email, password: $password) {
      email
      id
      firstName
      token
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
      password
      profileImageUrl
      address
      token
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
      firstName
      lastName
      email
      password
      phoneNumber
      profileImageUrl
      address
      token
    }
  }
`;
