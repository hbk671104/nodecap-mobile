import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { Flex, Modal } from 'antd-mobile';
import R from 'ramda';
import styles from './style';

class rating extends Component {
  showRatingTip = content => {
    Modal.alert('评级说明', content);
  };

  render() {
    const data = R.pipe(
      R.pathOr([], ['portfolio', 'rating']),
      R.filter(i => i.rating_name && i.grade)
    )(this.props);

    return (
      <View>
        <Text style={[styles.title, styles.site]}>评级信息</Text>
        <Flex justify="between" style={{ marginBottom: 10, borderBottomWidth: 0.5, borderBottomColor: '#e9e9e9', paddingBottom: 6 }}>
          <View>
            <Text style={{ fontSize: 13, color: 'rgba(0,0,0,0.85)', letterSpacing: 0.16 }}>机构</Text>
          </View>
          <Flex>
            <Text style={{ fontSize: 13, color: 'rgba(0,0,0,0.85)', letterSpacing: 0.16 }}>评级</Text>
            <View style={styles.tip} />
          </Flex>
        </Flex>
        <View>
          {R.map(m => (
            <Flex justify="between" style={{ marginBottom: 10 }}>
              <View>
                <Text style={{ fontSize: 13, color: 'rgba(0,0,0,0.85)', letterSpacing: 0.16 }}>{m.rating_name}</Text>
              </View>
              <Flex>
                <Text style={{ fontSize: 13, color: '#1890FF', letterSpacing: 0.16 }}>{m.grade}</Text>
                {m.grading_result ? (
                  <TouchableWithoutFeedback
                    onPress={() => this.showRatingTip(m.grading_result)}
                  >
                    <Image
                      style={styles.tip}
                      source={require('asset/public_project/tip_icon.png')}
                    />
                  </TouchableWithoutFeedback>
                ) : (<View style={styles.tip} />)}
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
