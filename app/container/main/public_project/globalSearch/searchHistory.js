import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Flex } from 'antd-mobile';
import Touchable from 'component/uikit/touchable';

class SearchHistory extends Component {
  async componentWillMount() {
    try {
      const historyStr = await AsyncStorage.getItem('historySearch');
      const history = historyStr ? JSON.parse(historyStr) : [];
      this.props.setHistory(history);
    } catch (e) {
      console.log(e);
    }
  }

  onPressHistory = (item) => {
    this.props.addHistory(item);
    this.props.onPress(item);
  }

  render() {
    const { history } = this.props;

    return (
      <View style={styles.container}>
        <Flex justify="between" align="center">
          <Text style={styles.title}>搜索历史</Text>
          <Touchable onPress={this.props.clearHistory}>
            <View>
              <Text style={styles.clear}>清空</Text>
            </View>
          </Touchable>
        </Flex>
        <Flex wrap="wrap" style={styles.items}>
          {history.map(i => (
            <Touchable onPress={() => this.onPressHistory(i)} key={i}>
              <Flex style={styles.item} justify="center" align="center">
                <Text style={styles.itemText}>{i}</Text>
              </Flex>
            </Touchable>
))}
        </Flex>
      </View>
    );
  }
}

const styles = {
  container: {
    margin: 12,
  },
  title: { fontFamily: 'PingFangSC-Medium', fontSize: 14, color: '#000000', textAlign: 'left' },
  clear: { fontSize: 12, color: '#1890FF', textAlign: 'left' },
  items: {
    marginTop: 10,
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 5.5,
    backgroundColor: '#EEEEEE',
    marginRight: 11.5,
  },
  itemText: { fontSize: 13, color: 'rgba(0,0,0,0.65)' },
};

SearchHistory.propTypes = {};
SearchHistory.defaultProps = {};

export default SearchHistory;
