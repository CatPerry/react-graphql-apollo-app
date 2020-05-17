import React from 'react';
import Header from './components/Header';

import PeopleList from './components/PeopleList';

import './App.scss';

const App: React.FC = () => {

  return (
    <div>
      <Header />
      <PeopleList />
      <footer>
        <p className='ImageCredit'>
          Image Credit:
          <a href="https://www.vecteezy.com/free-vector/black-and-white-background">Black And White Background Vectors by Vecteezy</a>
        </p>
      </footer>
    </div>
  );

};

export default App;
