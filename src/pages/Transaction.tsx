import React from 'react';
import styled from 'styled-components';

type Props = any;
type State = any;

export default class Transaction extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
        }}
      >
        <Title>Welcome to our transaction!</Title>
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
