import React from 'react';
import { Dropdown } from 'semantic-ui-react';

type Props = {
  userName: string;
  isBorderRight?: boolean;
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
    const { userName, isBorderRight = false } = this.props;

    return (
      <Dropdown
        style={{
          marginTop: '10px',
          paddingRight: isBorderRight ? '17px' : '0px',
          borderRight: isBorderRight ? '1px solid' : '0px',
          paddingTop: isBorderRight ? '3px' : '0px',
          paddingBottom: isBorderRight ? '3px' : '0px',
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
