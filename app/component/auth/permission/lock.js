import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import store from '../../../../index';

@connect(({ user, global }) => ({
  user: user.currentUser,
  allPermissions: global.permissions,
}))
class PermissionLock extends Component {
  render() {
    const currentKey = this.props.name;
    const has = R.pipe(
      R.pathOr([], ['user', 'permissions']),
      R.values,
      R.map(i => i.name),
      R.contains(currentKey),
    )(this.props);

    const existPermission = R.pipe(
      R.pathOr([], ['allPermissions']),
      R.values,
      R.map(i => i.name),
      R.contains(currentKey),
    )(this.props);
    if (!existPermission) {
      return this.props.children || null;
    }

    if (has) {
      return this.props.children || null;
    }

    if (!has) {
      return null;
    }
  }
}


export default PermissionLock;

export function LockWithNamespace(namespace) {
  return props => <PermissionLock {...props} name={props.name ? `${namespace}-${props.name}` : namespace} />;
}


export function hasPermission(name) {
  const currentKey = name;
  const state = store.getState();
  const has = R.pipe(
    R.pathOr([], ['user', 'currentUser', 'permissions']),
    R.values,
    R.map(i => i.name),
    R.contains(currentKey),
  )(state);

  const existPermission = R.pipe(
    R.pathOr([], ['global', 'permissions']),
    R.values,
    R.map(i => i.name),
    R.contains(currentKey),
  )(state);

  if (!existPermission) {
    return true;
  }

  return has;
}
