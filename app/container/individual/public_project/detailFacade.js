import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { Toast } from 'antd-mobile';
import { NavigationActions } from 'react-navigation';
import MyProject from '../self/my_project/display';
import PublicProject from './detail';

@connect(({ project_create, loading }, { navigation }) => {
  const id = navigation.getParam('id');
  const myProjects = R.pathOr([], ['list', 'data'])(project_create);
  return {
    id,
    isMyProject: R.any((i) => id === i.id && i.owner_status === '1')(myProjects),
  };
})
class DetailFacade extends Component {
  componentWillMount() {
    if (this.props.isMyProject) {
      Toast.loading('加载中...', 0);

      this.props.dispatch({
        type: 'project_create/get',
        id: this.props.id,
        callback: () => {
          Toast.hide();
        },
      });
    }
  }

  render() {
    if (this.props.isMyProject) {
      return <MyProject {...this.props} />;
    } else {
      return <PublicProject {...this.props} />;
    }
  }
}

DetailFacade.propTypes = {};
DetailFacade.defaultProps = {};

export default DetailFacade;
