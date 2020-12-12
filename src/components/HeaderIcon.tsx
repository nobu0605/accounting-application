import React, { Component } from 'react';
import { library, IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faHome, faBookOpen, faBook, faPen } from '@fortawesome/free-solid-svg-icons';
library.add(faChartPie, faHome, faBookOpen, faBook, faPen);

type Props = {
  icon: IconProp;
};

export default class HeaderIcon extends Component<Props> {
  render(): React.ReactNode {
    const { icon } = this.props;

    return (
      <FontAwesomeIcon
        icon={icon}
        style={{
          width: 20,
          height: 15,
          paddingRight: 5,
        }}
      />
    );
  }
}
