import React, { Component } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';
import RatingItems from './ratingItems';
import Reports from './reports';
import R from 'ramda';
import Group from '../partials/group';
import ReadMore from 'react-native-read-more-text';
import { raised as raisedStyle } from 'utils/style';
import FavorItem from './coin';
import Member from './memberItem';
import { NavigationActions } from 'react-navigation';

class InstitutionShareContent extends Component {
  render() {
    const desc = R.pathOr('', ['description'])(this.props.data);
    const members = R.pathOr([], ['members'])(this.props.data);
    const coins = R.pathOr([], ['coins'])(this.props.data);
    const reports = R.take(5)(R.pathOr([], ['reports', 'data'])(this.props.data));
    return (
      <View style={styles.container}>
        {R.not(R.isEmpty(desc)) && (
          <View style={{ marginTop: 16 }}>
            <Group title="简介">
              <View style={styles.desc.container}>
                <Text numberOfLines={10} style={styles.desc.text}>{desc}</Text>
              </View>
            </Group>
          </View>
        )}
        {R.not(R.isEmpty(members)) && (
          <Group title="机构成员">
            {R.map(m => (
              <Member
                institutionOwned={R.pathOr(false, ['is_owned'])(this.props.data)}
                key={m.id}
                data={m}
              />
            ))(members)}
          </Group>
        )}
        <RatingItems data={this.props.ratingTypes} />
        <Reports data={reports} />
        {R.not(R.isEmpty(coins)) && (
          <Group title={this.props.data.type === 1 ? '所投项目' : '服务案例'}>
            {R.take(5)(R.addIndex(R.map)((m, index) => (
              <FavorItem
                style={{ paddingHorizontal: 0 }}
                institutionId={this.props.id}
                key={m.id}
                data={m}
                showTopBorder={index !== 0}
              />
            ))(coins))}
          </Group>
        )}
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: 'white',
    width: 330,
    borderRadius: 2,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(12,26,40, .13)',
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 2.5,
      },
      android: {
        elevation: 2,
      },
    }),
    marginTop: 20,
  },
  desc: {
    container: {
      marginTop: 8,
    },
    text: {
      color: '#4A4A4A',
      fontSize: 14,
      lineHeight: 21,
    },
  },
};
InstitutionShareContent.propTypes = {};
InstitutionShareContent.defaultProps = {};

export default InstitutionShareContent;
