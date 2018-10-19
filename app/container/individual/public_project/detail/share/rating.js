import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { Flex, Modal } from 'antd-mobile';
import R from 'ramda';
import styles from './styles';

class rating extends Component {
  render() {
    const data = R.pipe(
      R.pathOr([], ['coin', 'rating']),
      R.filter(i => i.rating_name && i.grade)
    )(this.props);
    if (!data.length) {
      return null;
    }
    return (
      <View style={styles.groupContent}>
        <Flex justify="between" style={{ borderBottomWidth: 0.5, borderBottomColor: '#e9e9e9', paddingBottom: 6 }}>
          <View>
            <Text style={{ fontSize: 13, color: 'rgba(0,0,0,0.85)', letterSpacing: 0.16 }}>机构</Text>
          </View>
          <Flex style={{ marginRight: 10 }}>
            <Text style={{ fontSize: 13, color: 'rgba(0,0,0,0.85)', letterSpacing: 0.16 }}>评级</Text>
          </Flex>
        </Flex>
        <View>
          {R.map(m => (
            <Flex justify="between" style={{ marginTop: 10 }}>
              <View>
                <Text style={{ fontSize: 13, color: 'rgba(0,0,0,0.85)', letterSpacing: 0.16 }}>{m.rating_name}</Text>
              </View>
              <Flex style={{ marginRight: 10 }}>
                <Text style={{ fontSize: 13, color: '#1890FF', letterSpacing: 0.16 }}>{m.grade}</Text>
              </Flex>
            </Flex>
          ))(data)}
        </View>
      </View>
    );
  }
}

rating.propTypes = {};
rating.defaultProps = {};

export default rating;
