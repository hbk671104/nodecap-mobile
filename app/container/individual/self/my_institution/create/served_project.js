import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import R from 'ramda';

import List from 'component/uikit/list';
import Wrapper from './index';
import styles from './style';

@connect(({ institution_create }) => ({
  current: R.pathOr({}, ['current'])(institution_create),
}))
@createForm()
class ServedProject extends PureComponent {
  renderItem = ({ item }) => null;

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const data = R.pathOr([], ['current', 'served_project'])(this.props);
    return (
      <Wrapper {...this.props}>
        <List
          data={data}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
        />
      </Wrapper>
    );
  }
}

export default ServedProject;
