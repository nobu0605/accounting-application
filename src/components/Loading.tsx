import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

type Props = {
  isDataFetching: boolean;
};

export default class Loading extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    const { isDataFetching } = this.props;
    return (
      <Dimmer active={isDataFetching} inverted>
        <Loader inline="centered" size="huge">
          Loading
        </Loader>
      </Dimmer>
    );
  }
}
