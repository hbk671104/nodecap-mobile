import React from 'react';
import { PropTypes } from 'prop-types';
import { View, Text } from 'react-native';

import Touchable from 'component/uikit/touchable';
import { shadow } from '../../../../../utils/style';

const header = ({ activeTab, goToPage }) => (
  <View style={styles.container}>
    <Touchable borderless onPress={() => goToPage(0)}>
      <View style={styles.group.container}>
        <Text
          style={[
            styles.group.title.normal,
            activeTab === 0 && styles.group.title.highlight,
          ]}
        >
          全部
        </Text>
        {activeTab === 0 && <View style={styles.group.line} />}
      </View>
    </Touchable>
    <Touchable borderless onPress={() => goToPage(1)}>
      <View style={styles.group.container}>
        <Text
          style={[
            styles.group.title.normal,
            activeTab === 1 && styles.group.title.highlight,
          ]}
        >
          确定意向
        </Text>
        {activeTab === 1 && <View style={styles.group.line} />}
      </View>
    </Touchable>
    <Touchable borderless onPress={() => goToPage(2)}>
      <View style={styles.group.container}>
        <Text
          style={[
            styles.group.title.normal,
            activeTab === 2 && styles.group.title.highlight,
          ]}
        >
          待打币
        </Text>
        {activeTab === 2 && <View style={styles.group.line} />}
      </View>
    </Touchable>
    <Touchable borderless onPress={() => goToPage(3)}>
      <View style={styles.group.container}>
        <Text
          style={[
            styles.group.title.normal,
            activeTab === 3 && styles.group.title.highlight,
          ]}
        >
          已打币
        </Text>
        {activeTab === 3 && <View style={styles.group.line} />}
      </View>
    </Touchable>
  </View>
);

header.propTypes = {
  activeTab: PropTypes.number,
  goToPage: PropTypes.func,
};

const styles = {
  container: {
    paddingLeft: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 51,
    alignItems: 'center',
    ...shadow,
  },
  group: {
    container: {
      marginHorizontal: 17,
      paddingBottom: 10,
    },
    title: {
      highlight: {
        fontSize: 14,
        color: '#1890FF',
        fontWeight: 'bold',
      },
      normal: {
        color: '#666666',
        fontWeight: 'normal',
      },
    },
    line: {
      position: 'absolute',
      height: 3,
      borderRadius: 2,
      backgroundColor: '#1890FF',
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
};

export default header;
