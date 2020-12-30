import React from 'react';
import { backGroundColor } from '../../constants/style';

type Props = {
  children: React.ReactNode;
};

export default class PageWrapper extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <div
        style={{
          width: '100%',
          background: backGroundColor,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
