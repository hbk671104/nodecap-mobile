import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'

import List from 'component/uikit/list'
import styles from './style'

export default class Exchangeable extends Component {
  renderItem = ({ item }) => <Text>{item}</Text>

  render() {
    return (
      <View style={styles.container}>
        <List data={[1, 2, 3]} renderItem={this.renderItem} />
      </View>
    )
  }
}
