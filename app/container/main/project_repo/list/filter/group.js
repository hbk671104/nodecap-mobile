import React, { PureComponent } from 'react';
import { View, Text, LayoutAnimation } from 'react-native';
import { compose, withState, withProps } from 'recompose';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import Icon from 'component/uikit/icon';
import FilterItem from './item';

@compose(
  withState('expanded', 'setExpanded', false),
  withProps(({ expanded, data }) => {
    const sortData = R.sort((a, b) => a.id - b.id)(data);
    return {
      clipped_data: expanded ? sortData : R.take(8)(sortData),
    };
  }),
)
export default class FilterGroup extends PureComponent {
  handleExpandPress = () => {
    LayoutAnimation.easeInEaseOut();
    this.props.setExpanded(!this.props.expanded);
  };

  render() {
    const {
      title,
      data,
      clipped_data,
      expanded,
      selection,
      onSelect,
      onAllPress,
    } = this.props;

    const empty_selection = R.isEmpty(selection) || R.isNil(selection);
    return (
      <View style={styles.container}>
        <View style={styles.header.container}>
          <Text style={styles.header.title} numberOfLines={1}>
            {title}
          </Text>
          {R.length(data) > 8 && (
            <Touchable borderless onPress={this.handleExpandPress}>
              <Text style={styles.header.expand}>
                {expanded ? '收起' : '展开'}{' '}
                <Icon
                  name={`md-arrow-${expanded ? 'dropup' : 'dropdown'}`}
                  override
                />
              </Text>
            </Touchable>
          )}
        </View>
        <View style={styles.tag.container}>
          <FilterItem
            title="全部"
            selected={empty_selection}
            onPress={() => onAllPress()}
          />
          {R.map(d => {
            const id = R.pathOr(0, ['id'])(d);
            const name = R.pathOr('', ['name'])(d);
            const selected = R.contains(`${id}`)(selection);
            return (
              <FilterItem
                key={`${id}`}
                title={name}
                selected={selected}
                onPress={() => onSelect({ value: id, name })}
              />
            );
          })(clipped_data)}
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    marginTop: 20,
    marginBottom: 10,
  },
  header: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      paddingRight: 12,
    },
    title: {
      flex: 1,
      fontSize: 14,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.85)',
    },
    expand: {
      fontSize: 13,
      color: 'rgba(0, 0, 0, 0.65)',
    },
  },
  tag: {
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },
};
