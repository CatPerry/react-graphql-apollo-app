import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const App: React.FC = () => {
  const PEOPLE = gql`
    {
      profile {
        id
        name
      }
    }
  `;
  const { loading, error, data } = useQuery(PEOPLE);
  if (loading) return <div>'Loading...'</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <div>
      {data.profile.map((person: any) => (
        <div key={person.id}>{person.name}</div>
      ))}
    </div>
  );

};

export default App;
