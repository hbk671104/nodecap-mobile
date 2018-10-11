import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './roadmap.style';
import R from 'ramda';
import moment from 'moment';


class Roadmap extends Component {
  renderItem = ({ item }) => {
    const date = R.pathOr('', ['date'])(item);
    const content = R.pathOr('', ['content'])(item);

    return (
      <View style={styles.container}>
        <View style={styles.point} />
        <View style={styles.title}>
          <Text style={styles.time}>{date} </Text>
        </View>
        <View>
          <Text style={styles.content}>{content}</Text>
        </View>
      </View>
    );
  };

  render() {
    const roadmap = R.pathOr([], ['portfolio', 'basic', 'roadmap'])(this.props);
    return (
      <View>
        {roadmap.map(i => {
          return this.renderItem({ item: i });
        })}
      </View>
    );
  }
}

Roadmap.propTypes = {};
Roadmap.defaultProps = {};

export default Roadmap;
