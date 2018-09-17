import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../style';
import List from '../components/list';
import R from 'ramda';
import moment from 'moment';

class News extends Component {
  requestData = (isRefresh) => {
    this.props.dispatch({
      type: 'news/index',
      payload: isRefresh ? null : this.props.lastNewsID,
    });
  };

  renderItem = ({ item }) => {
    const time = moment(item.created_at * 1000).format('HH:mm');

    const regex = item.content.match(/【(.*)】(.*)/);
    const title = R.pathOr('', [1])(regex);
    const content = R.pathOr('', [2])(regex);

    if (R.or(R.isEmpty(title), R.isEmpty(content))) {
      return null;
    }

    return (
      <View style={styles.item.container}>
        <View style={styles.item.title}>
          <Text style={styles.item.time}>{time} </Text>
          <Text style={styles.item.titleText}>{title}</Text>
        </View>
        <View>
          <Text style={styles.item.content}>{content}</Text>
        </View>
      </View>
    );
  };

  render() {
    const { newsLoading, news } = this.props;
    return (
      <View style={styles.container}>
        <List
          action={this.requestData}
          loading={newsLoading}
          data={news}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

News.propTypes = {};
News.defaultProps = {};

export default News;
