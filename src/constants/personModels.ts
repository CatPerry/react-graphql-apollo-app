import gql from 'graphql-tag';

export const GET_PEOPLE = gql`
  {
    profile (order_by: {id: desc}) {
      id
      name
      }
    }
  `;

export const ADD_PERSON = gql`
    mutation($name: String!) {
      insert_profile(objects: [{name: $name}]) {
        returning {
          id
          name
        }
      }
    }
    `;

export const DELETE_PERSON = gql`
    mutation removePerson ($id: Int!) {
      delete_profile(where: {id: {_eq: $id}}) {
        affected_rows
      }
    }
    `;
