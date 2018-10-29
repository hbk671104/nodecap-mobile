import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import R from 'ramda';

import NavBar from 'component/navBar';
import List from 'component/uikit/list';
import Touchable from 'component/uikit/touchable';
import InstitutionItem from 'component/institution/item';

import styles from './style';

@global.bindTrack({
  page: '认领我的机构',
  name: 'App_MyInstitutionClaimSearchOperation',
})
@connect(({ institution_create }) => ({
  data: R.pathOr([], ['search_list', 'data'])(institution_create),
  pagination: R.pathOr(null, ['search_list', 'pagination'])(institution_create),
}))
class ClaimInstitutionSearch extends Component {
  componentDidMount() {
    this.props.track('进入');
  }

  handleSkipPress = () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'CreateMyInstitutionDescription',
      }),
    );
  };

  handleClaimPress = id => () => {
    this.props.dispatch(
      NavigationActions.navigate({
        routeName: 'ClaimMyInstitution',
        params: {
          id,
        },
      }),
    );
  };

  renderItem = ({ item }) => (
    <InstitutionItem
      wrapperStyle={{ backgroundColor: 'white' }}
      data={item}
      renderBottom={() => (
        <Touchable
          style={styles.claim.container}
          onPress={this.handleClaimPress(item.id)}
        >
          <Text style={styles.claim.title}>认领机构</Text>
        </Touchable>
      )}
    />
  );

  renderSeparator = () => <View style={{ height: 5 }} />;

  render() {
    const { data, pagination } = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          back
          gradient
          title="机构认领"
          renderRight={() => (
            <Touchable borderless onPress={this.handleSkipPress}>
              <Text style={styles.navBar.right}>跳过</Text>
            </Touchable>
          )}
        />
        <List
          style={{ backgroundColor: '#F5F5F5' }}
          loadOnStart={false}
          disableRefresh
          data={data}
          pagination={pagination}
          renderItem={this.renderItem}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}

export default ClaimInstitutionSearch;
