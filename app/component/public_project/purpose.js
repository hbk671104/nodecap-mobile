import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { Flex } from 'antd-mobile';
import R from 'ramda';

class PublicProjectPurpose extends PureComponent {
  render() {
    const purpose = R.pipe(
      R.pathOr([], ['portfolio', 'purpose']),
      R.reduce(
        (last, current) => `${last ? `${last}、` : last}${current.name}`,
        '',
      ),
    )(this.props);
    return (
      <Flex align="center" style={styles.container}>
        <View style={styles.title.container}>
          <Text style={styles.title.text}>需求</Text>
        </View>
        <View style={styles.content.container}>
          <Text style={styles.content.text}>{purpose}</Text>
        </View>
      </Flex>
    );
  }
}

const styles = {
  container: {
    paddingLeft: 12,
    height: 46.5,
    backgroundColor: 'white',
  },
  title: {
    container: {
      height: 22.5,
      borderRadius: 2,
      backgroundColor: '#1890FF',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 4,
    },
    text: {
      fontSize: 12,
      color: 'white',
      fontWeight: 'bold',
    },
  },
  content: {
    container: {
      marginLeft: 16,
    },
    text: {
      fontSize: 13,
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: 'bold',
    },
  },
};

PublicProjectPurpose.propTypes = {};
PublicProjectPurpose.defaultProps = {};

export default PublicProjectPurpose;
