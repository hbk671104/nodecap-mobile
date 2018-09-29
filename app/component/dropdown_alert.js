import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, ViewPropTypes } from 'react-native';
import * as Animatable from 'react-native-animatable';

class DropdownAlert extends PureComponent {
  static propTypes = {
    style: ViewPropTypes.style,
    duration: PropTypes.number,
  };

  static defaultProps = {
    duration: 2500,
  };

  state = {
    title: null,
  };

  show = title => {
    this.setState({ title }, () => {
      this.dropdown.transitionTo({
        transform: [
          {
            translateY: alertHeight,
          },
        ],
      });
      setTimeout(() => {
        this.dropdown.transitionTo({
          transform: [
            {
              translateY: 0,
            },
          ],
        });
      }, this.props.duration);
    });
  };

  render() {
    const { style } = this.props;
    const { title } = this.state;
    return (
      <Animatable.View
        ref={ref => {
          this.dropdown = ref;
        }}
        useNativeDriver
        style={[styles.container, style]}
      >
        <Text style={styles.title}>{title}</Text>
      </Animatable.View>
    );
  }
}

export const alertHeight = 25;
const styles = {
  container: {
    height: alertHeight,
    backgroundColor: '#E5F3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#1890FF',
    fontSize: 11,
  },
};

export default DropdownAlert;
