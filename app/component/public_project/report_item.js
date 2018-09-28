import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import moment from 'moment';
import R from 'ramda';

import Touchable from 'component/uikit/touchable';

const reportItem = ({ data, onPress }) => {
  const title = R.pathOr('--', ['title'])(data);
  const date = R.pathOr('--', ['published_at'])(data);
  const institution = R.pathOr('--', ['industry', 'name'])(data);
  return (
    <Touchable onPress={() => onPress(data)}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={require('asset/institution/pdf.png')} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.content.container}>
          <Text style={styles.content.text}>{institution}</Text>
          <Text style={styles.content.text}>
            {moment(date).format('MM-DD')}
          </Text>
        </View>
      </View>
    </Touchable>
  );
};

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
