import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { Flex } from 'antd-mobile';
import R from 'ramda';

class PublicProjectPurpose extends Component {
  render() {
    const purpose = R.pipe(
      R.pathOr([], ['portfolio', 'purpose']),
      R.reduce((last, current) => `${last ? `${last}、` : last}${current.name}`, '')
    )(this.props);
    return (
      <Flex align="center" style={styles.container}>
        <Image
          source={require('asset/project/detail/purpose.png')}
          style={{
            width: 20,
            height: 20,
          }}
        />
        <Text style={styles.text}>{purpose}</Text>
      </Flex>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#168AF3',
    marginTop: 10,
    marginHorizontal: -12,
    paddingLeft: 12,
  },
  text: { fontSize: 12, color: '#FFFFFF', letterSpacing: 0.14, marginLeft: 10 },
};

PublicProjectPurpose.propTypes = {};
PublicProjectPurpose.defaultProps = {};

export default PublicProjectPurpose;
