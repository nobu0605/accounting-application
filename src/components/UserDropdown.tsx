import React from 'react';
import { Dropdown } from 'semantic-ui-react';

type Props = {
  userName: string;
};

class UserDropdown extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(): void {
    localStorage.removeItem('token');
    location.pathname = '/login';
  }

  render(): React.ReactNode {
    const { userName } = this.props;

    return (
      <Dropdown
        style={{
          marginTop: '10px',
        }}
        text={userName}
      >
        <Dropdown.Menu>
          <Dropdown.Item text="Logout" onClick={this.logout} />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default UserDropdown;
