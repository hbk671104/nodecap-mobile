import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import moment from 'moment';

import Touchable from 'component/uikit/touchable';

const reportItem = ({ data, onPress, institution }) => (
  <Touchable onPress={() => onPress(data)}>
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={require('asset/institution/pdf.png')} />
        <Text style={styles.title}>{data.title}</Text>
      </View>
      <View style={styles.content.container}>
        <Text style={styles.content.text}>#ahha1</Text>
        <Text style={styles.content.text}>
          {data.published_at ? moment(data.published_at).format('MM-DD') : ''}
        </Text>
      </View>
    </View>
  </Touchable>
);

const styles = {
  container: {
    padding: 12,
  },
  title: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  content: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    text: {
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
    },
  },
};

reportItem.propTypes = {
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

reportItem.defaultProps = {
  onPress: () => null,
};

export default reportItem;
