import React from 'react';
import styled from 'styled-components';

export default class Home extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <Title>Welcome to our home!</Title>
      </div>
    );
  }
}

const Title = styled.span`
  font-size: 20px;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 5px;
  color: black;
`;
