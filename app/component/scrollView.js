import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, RefreshControl } from 'react-native';

const scroll = props => (
  <ScrollView
    {...props}
    {...(props.enableRefresh
      ? {
          refreshControl: (
            <RefreshControl
              refreshing={props.loading}
              onRefresh={props.onRefresh}
            />
          ),
        }
      : {})}
  >
    {props.children}
  </ScrollView>
);

scroll.propTypes = {
  loading: PropTypes.bool,
  onRefresh: PropTypes.func,
  enableRefresh: PropTypes.bool,
};

scroll.defaultProps = {
  loading: false,
  onRefresh: () => null,
  enableRefresh: false,
};

export default scroll;
