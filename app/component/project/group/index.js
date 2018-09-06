import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ViewPropTypes } from 'react-native';

const group = ({
  style,
  icon,
  title,
  interactionEnabled,
  onAddPress,
  onEditPress,
  children,
}) => (
  <View style={[styles.container, style]}>
    <View style={styles.groupWrapper}>
      <View style={styles.group}>
        {!!icon && <Image style={styles.image} source={icon} />}
        {!!title && <Text style={styles.title}>{title}</Text>}
      </View>
      {interactionEnabled && (
        <View style={styles.group}>
          <Text style={styles.add} onPress={onAddPress}>
            添加
          </Text>
          <Text style={styles.edit} onPress={onEditPress}>
            编辑
          </Text>
        </View>
      )}
    </View>
    {children}
  </View>
);

group.propTypes = {
  style: ViewPropTypes.style,
  icon: PropTypes.number,
  title: PropTypes.string,
  interactionEnabled: PropTypes.bool,
  onAddPress: PropTypes.func,
  onEditPress: PropTypes.func,
};

group.defaultProps = {
  interactionEnabled: false,
  onAddPress: () => null,
  onEditPress: () => null,
};

const styles = {
  container: {
    paddingLeft: 22,
    paddingRight: 12,
    paddingVertical: 10,
  },
  groupWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginRight: 12,
  },
  title: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  add: {
    fontSize: 14,
    color: '#1890FF',
    fontWeight: 'bold',
  },
  edit: {
    fontSize: 14,
    color: '#FF7600',
    fontWeight: 'bold',
    marginLeft: 15,
  },
};

export default group;
