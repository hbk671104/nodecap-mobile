import React, { Component } from 'react';
import {View, AsyncStorage} from 'react-native'
import { persistStore } from 'redux-persist';
import { connect } from '../../utils/dva';
import {NavigationActions} from '../../utils'
import {
  initializeListeners,
} from 'react-navigation-redux-helpers'

@connect(({ global, login }) => ({
  constants: global.constants,
  isLogin: !!login.token
}))
class RehydrateLoader extends Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'global/startup',
    });

    persistStore(this.props.store, {
      storage: AsyncStorage,
      blacklist: ['loading', 'routing', 'project'],
    }, () => {
      this.setState({ rehydrated: true }, () => {
        if(this.props.isLogin){
          this.props.dispatch(NavigationActions.navigate({
            routerName: 'Main'
          }));
        }
      });
      initializeListeners('root', this.props.router)
    });
  }

  render() {
    if (!this.state.rehydrated || !this.props.constants) {
      return <View />;
    }
    return this.props.children;
  }
}


export default RehydrateLoader;
