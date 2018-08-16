import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ViewPropTypes } from 'react-native';

import { shadow as shadowized } from '../../../../../utils/style';
import styles from './style';

const fundGroup = ({
  style,
  contentContainer,
  title,
  subtitle,
  renderRight,
  shadow,
  children,
}) => {
  return (
    <View style={[styles.container, shadow && shadowized, style]}>
      <View style={styles.top.container}>
        <Text style={styles.top.title}>
          {title}{' '}
          {!!subtitle && <Text style={styles.top.subtitle}>{subtitle}</Text>}
        </Text>
        {renderRight && renderRight()}
      </View>
      <View style={[styles.bottom.container, contentContainer]}>
        {children}
      </View>
    </View>
  );
};

fundGroup.propTypes = {
  style: ViewPropTypes.style,
  contentContainer: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  renderRight: PropTypes.func,
  shadow: PropTypes.bool,
};

fundGroup.defaultProps = {
  shadow: false,
};

export default fundGroup;
