import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { mainColor } from '../constants/style';
import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import { CHANGE_LANGUAGE } from '../actionTypes/index';
import { languageState } from '../types/language';

const languageOptions = [
  { key: 'Japanese', text: 'Japanese', value: 'ja' },
  { key: 'English', text: 'English', value: 'en' },
];

type Props = any;

class LanguageDropdown extends React.Component<Props> {
  changeLanguage(value: any) {
    this.props.changeLanguage(value);
  }
  render() {
    const { language, height = '10%' } = this.props;
    return (
      <Dropdown
        button
        className="icon"
        floating
        labeled
        icon="world"
        options={languageOptions}
        value={language}
        style={{ color: mainColor, height: height, marginTop: '15px', marginRight: '10px' }}
        onChange={(e, { value }) => {
          this.changeLanguage(value);
        }}
      />
    );
  }
}

function mapStateToProps(state: languageState) {
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
