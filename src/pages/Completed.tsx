import React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { LanguageState } from '../types/language';
import { mainColor, backGroundColor } from '../constants/style';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LanguageDropdown from '../components/LanguageDropdown';
import { Link } from 'react-router-dom';

type Props = WrappedComponentProps;

class Completed extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <CompletedWrapper>
        <LanguageSection>
          <LanguageDropdown height={'5%'} />
        </LanguageSection>
        <CompletedContainer>
          <CompletedSection>
            <ServiceName>
              <FontAwesomeIcon
                icon="chart-pie"
                style={{
                  width: 40,
                  height: 40,
                  color: mainColor,
                }}
              />
              <span style={{ color: mainColor }}>&nbsp;Accounting</span>
            </ServiceName>
            <CompletedTitle>
              <span style={{ color: mainColor }}>
                <FormattedMessage id="completed.registered" defaultMessage="登録が完了しました。" />
              </span>
              <br />
              <br />
              <Link style={{ marginTop: '15px' }} to="/home">
                <Button size="large" style={{ color: mainColor }}>
                  <FormattedMessage id="completed.start" defaultMessage="利用を開始する。" />
                </Button>
              </Link>
            </CompletedTitle>
            <br />
          </CompletedSection>
        </CompletedContainer>
      </CompletedWrapper>
    );
  }
}

const ServiceName = styled.h1`
  font-size: 50px;
  text-align: left;
  margin-right: 20px;
  margin-bottom: 45px;
  font-family: Pacifico;
  color: ${mainColor};
`;

const CompletedTitle = styled.span`
  font-size: 20px;
  text-align: center;
  margin-bottom: 5px;
  color: ${mainColor};
  font-weight: bold;
`;

const LanguageSection = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CompletedWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${backGroundColor};
`;

const CompletedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90%;
`;

const CompletedSection = styled.div`
  width: 30%;
  height: 75%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
`;

function mapStateToProps(state: LanguageState) {
  return {
    language: state.ui.language.locale,
  };
}

export default connect(mapStateToProps)(injectIntl(Completed));
