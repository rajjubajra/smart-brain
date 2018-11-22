import React from 'react';
import styled from 'styled-components';
import YwLogo from './YwLogo.png';

const LogoBlock = styled.div`
   display: flex;
   justify-content: left;
   width: 100px;

   > img{
     position: relative;
     top: -40px;
     width: 100% auto;
   }
`;


const Logo = () => {
  return(
    <LogoBlock>
      <img src={YwLogo} alt="My Logo" />
    </LogoBlock>

  );
}


export default Logo;
