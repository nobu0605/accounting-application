import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

type Props = any;

export default class Loading extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    const { isUserDataFetching } = this.props;
    return (
      <Dimmer active={isUserDataFetching} inverted>
        <Loader inline="centered" size="huge">
          Loading
        </Loader>
      </Dimmer>
    );
  }
}
