import React from 'react';
import axios from '../utils/axios';
import styled from 'styled-components';
import { Button, Input } from 'semantic-ui-react';

type Props = any;
type State = {
  response: any;
  loginInput: {
    password: string;
    email: string;
    [key: string]: any;
  };
};

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      response: '',
      loginInput: {
        password: '',
        email: '',
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const loginInput = { ...this.state.loginInput };
    loginInput[e.target.name] = e.target.value;
    this.setState({ loginInput });
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    axios
      .post('/api/login', {
        email: this.state.loginInput.email,
        password: this.state.loginInput.password,
      })
      .then((response: any) => {
        localStorage.setItem('token', response.data.token);
      })
      .catch((error: any) => {
        console.error(error);
      });
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
        <Title>Welcome to our site!</Title>
        <br />
        <form onSubmit={this.handleSubmit}>
          <Input
            name="email"
            type="email"
            placeholder="E-mail address"
            onChange={(e) => this.handleChange(e)}
          />
          <br />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => this.handleChange(e)}
          />
          <br />
          <Button type="submit" color="blue" size="large">
            送信
          </Button>
        </form>
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
