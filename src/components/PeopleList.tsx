import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';

import './PeopleList.scss';

interface Person {
  id: number;
  name: string;
}

const App: React.FC = () => {
  let input;
  const [personNameInput, setPerson] = useState('');
  const GET_PEOPLE = gql`
    {
      profile {
        id
        name
      }
    }
  `;

  const ADD_PERSON = gql`
    mutation($name: String!) {
      insert_profile(objects: [{name: $name}]) {
        returning {
          id
          name
        }
      }
    }
  `;

  const resetInput = () => {
    setPerson('');
  };

  const { loading, error, data } = useQuery(GET_PEOPLE);
  const [insert_profile] = useMutation(ADD_PERSON, {
    // update: updateCache,
    onCompleted: resetInput
  });
  // const [insert_profile] = useMutation(ADD_PERSON);

  if (loading) return <div>Loading...</div>; //divs required for Typescript
  if (error) return <div>`Error! ${error.message}`</div>; //same

  return (
    <div>
      <main id='main'>
        <div>
          <p>Latest Uploads</p>
          <section>
            Lorem ipsum dolor sit ameht, Lorem ipsum dolor sit ameht. And Lorem ipsum dolor sit ameht lorem ipsum dolor sit ameht; add iframe video feed here and this is a very long sentence so that you can see what that looks like.
          </section>
        </div>
        <div>
          {data.profile.map((person: any) => (
            <p key={person.id}>{person.name}</p>
          ))}
        </div>
        <form
          className='formInput'
          onSubmit={(e) => {
            e.preventDefault();
            insert_profile({
              variables: { name: personNameInput },

              update(cache: any, { data }) {
                const getExistingPeople: any = cache.readQuery({ query: GET_PEOPLE });
                const existingPeople: Person[] = getExistingPeople ? getExistingPeople.profile : [];
                const newPerson: Person = data.insert_profile!.returning[0];
                cache.writeQuery({
                  query: GET_PEOPLE,
                  data: { profile: [...existingPeople, newPerson] }
                });
              }
            });
          }}
        >
          <input
            type='text'
            placeholder='Enter your name'
            value={personNameInput}
            onChange={(e) => (setPerson(e.target.value))}
            ref={n => (input = n)}
          />
          <button type='submit'>Add a new person</button>
        </form>
      </main>
    </div>
  );

};

export default App;
