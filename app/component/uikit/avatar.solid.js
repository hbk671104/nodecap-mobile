import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import R from 'ramda';

class SolidAvatar extends PureComponent {
  constructor(props) {
    super(props);
    const source = R.path(['source'])(props);
    const uri = R.pathOr('', ['uri'])(source);
    this.state = {
      source: R.isEmpty(uri)
        ? typeof source === 'number'
          ? source
          : require('asset/project/project_logo_default.png')
        : { uri },
    };
  }

  componentWillReceiveProps(nextProps) {
    const uri = R.pathOr('', ['source', 'uri'])(nextProps);
    if (!R.isEmpty(uri)) {
      this.setState({
        source: { uri },
      });
    }
  }

  onError = error => {
    this.setState({
      source: require('asset/project/project_logo_default.png'),
    });
  };

  render() {
    const { source } = this.state;
    const { style, size, resizeMode, innerRatio } = this.props;
    return (
      <Animated.View
        style={[
          styles.container,
          {
            height: size,
            width: size,
            borderRadius: size / 2,
          },
          style,
        ]}
      >
        <Animated.Image
          {...this.props}
          resizeMode={resizeMode}
          source={source}
          style={{
            height: size * innerRatio,
            width: size * innerRatio,
          }}
          onError={this.onError}
        />
      </Animated.View>
    );
  }
}

SolidAvatar.defaultProps = {
  size: 42,
  innerRatio: 2 / 3,
  resizeMode: 'contain',
  raised: true,
};

SolidAvatar.propTypes = {
  size: PropTypes.number,
  innerRatio: PropTypes.number,
  resizeMode: PropTypes.string,
  raised: PropTypes.bool,
};

const styles = {
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#E9E9E9',
  },
};

export default SolidAvatar;
