import React from 'react';
import styled from 'styled-components'

const Nav = styled.nav `
    display: flex;
    justify-content: flex-end;
    > p {
      padding-right: 10px;
      cursor: pointer;
    }
`;

const Navigation = ({route, onRouteChange}) => {
  switch (route) {
    case 'signin':
       return(
         <Nav>
           <p onClick={()=>onRouteChange('register')}>Register</p>
         </Nav>
       );
      break;
    case 'register':
      return(
        <Nav>
          <p onClick={()=>onRouteChange('signin')}>Sign In</p>
        </Nav>
      );
    break;
    case 'home':
    return(
      <Nav>
        <p onClick={()=>onRouteChange('signin')}>Signout</p>
      </Nav>
    );
    break;

    default:
    return `Error: Route  not found`;

  }

}

export default Navigation;
