import React from 'react';
import styled from 'styled-components';

const Rankblock = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 800;
  margin-top: 30px;
`;

const Rank = ({name, entries}) => {
  return(
    <Rankblock>
    {`${name}, your current entry count is ${entries}`}
    </Rankblock>
  );
}

export default Rank;
