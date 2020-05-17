import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';

import * as CONSTANTS from '../constants/personModels';
import './PeopleList.scss';

interface Person {
  id: number;
  name: string;
}

const App: React.FC = () => {
  let input;
  const [personNameInput, setPerson] = useState('');
  const { loading, error, data } = useQuery(CONSTANTS.GET_PEOPLE);
  const resetInput = (): void => {
    setPerson('');
  };
  const [insert_profile] = useMutation(CONSTANTS.ADD_PERSON, {
    onCompleted: resetInput
  });
  const [remove_profile] = useMutation(CONSTANTS.DELETE_PERSON);
  const removePerson = (e: React.MouseEvent, value: Person) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log(e, value);
    remove_profile({
      variables: { id: value.id },
      update(cache, { data }) {
        const existingPeople: any = cache.readQuery({ query: CONSTANTS.GET_PEOPLE });
        const newPeople = existingPeople!.profile.filter((p: any) => (p.id !== value.id));
        cache.writeQuery({
          query: CONSTANTS.GET_PEOPLE,
          data: { profile: newPeople }
        });
      }
    });
  };

  const updateCache = (): void => {
    insert_profile({
      variables: { name: personNameInput },

      update(cache, { data }) {
        const getExistingPeople: any = cache.readQuery({ query: CONSTANTS.GET_PEOPLE });
        const existingPeople: Person[] = getExistingPeople ? getExistingPeople.profile : [];
        const newPerson: Person = data.insert_profile!.returning[0];
        cache.writeQuery({
          query: CONSTANTS.GET_PEOPLE,
          data: { profile: [newPerson, ...existingPeople] }
        });
      }
    });
  };

  if (loading) return <div>Loading...</div>; // <div> required for Typescript
  if (error) return <div>`Error! ${error.message}`</div>; // same

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
            <p key={person.id}>
              {person.name}
              <button onClick={(e) => removePerson(e, person)}>Remove</button>
            </p>
          ))}
        </div>
        <form
          className='formInput'
          onSubmit={(e) => {
            e.preventDefault();
            updateCache();
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
