import React from 'react';
import './Header.scss';

// import megaphone from './../assets/images/megaphone_011.jpg';

let Header: React.FC = () => {
  return (
    <nav className='Nav'>
      <p className='Nav_BrandName'>
        do telly!
        {/* <img className='Logo' src={megaphone} alt='Megaphone logo' /> */}
      </p>
      <p className='Nav__SubHead'>
        <span>
          Why DIY
        </span>
        <span>
          Watch
        </span>
        <span>
          Shop
        </span>
        <span>
          Search
        </span>
      </p>
    </nav>
  );
};

export default Header;
