import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { mainColor } from '../constants/style';
import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import { CHANGE_LANGUAGE } from '../actionTypes/index';
import { LanguageState } from '../types/language';

const languageOptions = [
  { key: 'Japanese', text: 'Japanese', value: 'ja' },
  { key: 'English', text: 'English', value: 'en' },
];

type Props = {
  language: string;
  height?: string;
  marginTop?: string;
  changeLanguage: (value: string) => void;
};

class LanguageDropdown extends React.Component<Props> {
  changeLanguage(value: any) {
    this.props.changeLanguage(value);
  }

  render(): React.ReactNode {
    const { language, height = '10%', marginTop = '15px' } = this.props;
    return (
      <Dropdown
        button
        className="icon"
        floating
        labeled
        icon="world"
        options={languageOptions}
        value={language}
        style={{ color: mainColor, height: height, marginTop: marginTop, marginRight: '10px' }}
        onChange={(e, { value }) => {
          this.changeLanguage(value);
        }}
      />
    );
  }
}

function mapStateToProps(state: LanguageState) {
  return {
    language: state.ui.language.locale,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    changeLanguage: (language: string) => {
      dispatch(createAction(CHANGE_LANGUAGE)({ language }));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageDropdown);
