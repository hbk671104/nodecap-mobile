import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { compose, withState } from 'recompose';
// import { Flex } from 'antd-mobile';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';
import Avatar from 'component/uikit/avatar';

const deviceWidth = Dimensions.get('window').width;

@compose(
  withState('collapsed', 'setCollapsed', ({ data }) => R.length(data) > 10),
)
class Section extends PureComponent {
  toggleCollapsed = () => {
    this.props.setCollapsed(!this.props.collapsed);
  };

  renderItem = item => (
    <Touchable key={item.id} onPress={() => this.props.onItemPress(item)}>
      <View style={styles.content.item.container}>
        <Avatar
          size={45}
          source={{ uri: item.logo }}
          innerRatio={1}
          raised={false}
          imageStyle={{ borderRadius: 0 }}
        />
        <Text style={styles.content.item.title} numberOfLines={2}>
          {item.name}
        </Text>
      </View>
    </Touchable>
  );

  render() {
    const { title, data, collapsed } = this.props;
    const displayData = collapsed ? R.take(10)(data) : data;

    return (
      <View style={styles.container}>
        <View style={styles.title.container}>
          <Text style={styles.title.text}>{title}</Text>
        </View>
        <View style={styles.content.container}>
          {R.map(this.renderItem)(displayData)}
        </View>
        {R.length(data) > 10 && (
          <Touchable
            style={styles.button.container}
            onPress={this.toggleCollapsed}
          >
            {collapsed ? (
              <Text style={styles.button.text}>
                查看全部
                <Text style={styles.button.count}>（{R.length(data)}）</Text>
              </Text>
            ) : (
              <Text style={styles.button.text}>收起</Text>
            )}
          </Touchable>
        )}
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: 'white',
  },
  title: {
    container: {
      paddingTop: 20,
      paddingHorizontal: 12,
    },
    text: {
      fontSize: 17,
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: 'bold',
    },
  },
  content: {
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingVertical: 8,
    },
    item: {
      container: {
        paddingVertical: 8,
        width: deviceWidth / 5,
        // justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.65)',
        marginTop: 12,
        textAlign: 'center',
        paddingHorizontal: 6,
      },
    },
  },
  button: {
    container: {
      height: 45,
      marginHorizontal: 12,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#E9E9E9',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 13,
      color: 'rgba(0, 0, 0, 0.65)',
    },
    count: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#1890FF',
    },
  },
};

export default Section;
