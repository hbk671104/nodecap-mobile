import React, { PureComponent } from 'react';
import { View, ScrollView, Text } from 'react-native';
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
      <View style={styles.container}>
        <View style={styles.title.container}>
          <Text style={styles.title.text}>需求</Text>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.content.container}
          contentContainerStyle={{ alignItems: 'center', paddingRight: 16 }}
        >
          <Text style={styles.content.text}>{purpose}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    paddingLeft: 12,
    height: 46.5,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  title: {
    container: {
      height: 22.5,
      borderRadius: 2,
      backgroundColor: '#1890FF',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 4,
      alignSelf: 'center',
    },
    text: {
      fontSize: 12,
      color: 'white',
      fontWeight: 'bold',
    },
  },
  content: {
    container: {
      flex: 1,
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
