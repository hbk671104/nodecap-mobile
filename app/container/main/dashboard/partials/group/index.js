import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ViewPropTypes } from 'react-native';
import { Card } from 'react-native-elements';
// import Shimmer from 'react-native-shimmer';
// import NodeCapIcon from 'component/icon/nodecap';
import styles from './style';

const dashboardGroup = ({ style, icon, title, children }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.group}>
        {!!icon && <Image style={styles.image} source={icon} />}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Card containerStyle={styles.card}>{children}</Card>
    </View>
  );
};

dashboardGroup.propTypes = {
  style: ViewPropTypes.style,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default dashboardGroup;
