import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import jaLanguage from '../languages/ja';
import enLanguage from '../languages/en';
import { connect } from 'react-redux';
import { languageState } from '../types/language';

type Messages = {
  ja: any;
  en: any;
  [key: string]: any;
};

const messages: Messages = {
  ja: jaLanguage.messages,
  en: enLanguage.messages,
};

type Props = {
  children?: React.ReactNode;
  language?: string;
  defaultLanguage?: string;
};

class LanguageProvider extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render(): React.ReactNode {
    const { language = 'ja', defaultLanguage = 'ja' } = this.props;

    return (
      <IntlProvider locale={language} defaultLocale={defaultLanguage} messages={messages[language]}>
        {this.props.children}
      </IntlProvider>
    );
  }
}

function mapStateToProps(state: languageState) {
  return {
    language: state.ui.language.locale,
  };
}

export default connect(mapStateToProps)(LanguageProvider);
