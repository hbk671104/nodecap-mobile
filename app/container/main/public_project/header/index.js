import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions } from 'react-native';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';
import Icon from 'component/uikit/icon';
import Group from './group';

const deviceWidth = Dimensions.get('window').width;

const header = ({
  style,
  institution,
  pagination,
  progress,
  params,
  onItemPress,
  onFilterPress,
  in_individual,
}) => {
  const total_count = R.pathOr(0, ['total'])(pagination);
  const progress_index = R.pathOr({}, ['progress'])(params);
  const progress_title = R.pathOr('全部', [progress_index])(progress);
  return (
    <View style={style}>
      <Group title="优质报告">
        <View style={styles.container}>
          {R.addIndex(R.map)((i, index) => {
            return (
              <Touchable key={index} foreground onPress={() => onItemPress(i)}>
                <View style={styles.item.container}>
                  <Avatar
                    size={28}
                    raised={false}
                    innerRatio={1}
                    source={i.logo_url ? { uri: i.logo_url } : null}
                  />
                  <Text style={styles.item.title}>{i.name}</Text>
                </View>
              </Touchable>
            );
          })(institution)}
        </View>
      </Group>
      <View style={styles.divider} />
      <Group title="精选项目">
        <View style={styles.bottom.container}>
          <Text style={styles.bottom.subtitle}>
            为您找到 {total_count} 个项目
          </Text>
          {in_individual && (
            <Touchable borderless onPress={onFilterPress}>
              <Text style={styles.bottom.filter}>
                {progress_title}{' '}
                <Icon
                  color="rgba(0, 0, 0, 0.25)"
                  name="md-arrow-dropdown"
                  override
                />
              </Text>
            </Touchable>
          )}
        </View>
      </Group>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 7,
  },
  item: {
    container: {
      width: deviceWidth / 4,
      height: 68,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    title: {
      fontSize: 12,
      marginTop: 8,
    },
  },
  divider: {
    height: 5,
    backgroundColor: '#F9F9F9',
  },
  bottom: {
    container: {
      marginTop: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingBottom: 8,
    },
    subtitle: {
      color: 'rgba(0, 0, 0, 0.45)',
      fontSize: 11,
    },
    filter: {
      fontSize: 13,
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: 'bold',
    },
  },
};

header.propTypes = {
  style: PropTypes.object,
  onItemPress: PropTypes.func,
  onFilterPress: PropTypes.func,
};

header.defaultProps = {
  onItemPress: () => null,
  onFilterPress: () => null,
};

export default header;
