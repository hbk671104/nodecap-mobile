import React, { Component } from 'react';
import { View, Text, ScrollView, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

import NavBar from 'component/navBar';
import Loading from 'component/uikit/loading';
import ListItem from 'component/listItem';
import styles from './style';

@connect(({ resource, loading }) => ({
  data: R.pathOr(null, ['current'])(resource),
  loading: loading.effects['resource/get'],
}))
class ResourceDetail extends Component {
  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.loadData();
    });
  }

  componentWillUnmount() {
    this.clearData();
  }

  loadData = () => {
    const item = this.props.navigation.getParam('item');
    if (item && item.id) {
      this.props.dispatch({ type: 'resource/get', payload: item.id });
    }
  };

  clearData = () => {
    this.props.dispatch({ type: 'resource/clearCurrent' });
  };

  renderContent = content => (
    <View style={styles.item.content.container}>
      <Text
        style={[
          styles.item.content.text,
          !content && { color: 'rgba(0, 0, 0, 0.45)' },
        ]}
      >
        {content || '未填写'}
      </Text>
    </View>
  );

  render() {
    const item = this.props.navigation.getParam('item');
    const { data, loading } = this.props;
    return (
      <View style={styles.container}>
        <NavBar gradient back title={item.name} />
        {R.isNil(data) || loading ? (
          <Loading />
        ) : (
          <ScrollView>
            <ListItem
              disablePress
              title="姓名"
              titleStyle={styles.item.title}
              renderContent={() => this.renderContent(data.name)}
            />
            <ListItem
              disablePress
              title="类别"
              titleStyle={styles.item.title}
              renderContent={() => {
                if (R.isEmpty(data.types)) {
                  return this.renderContent(null);
                }
                return (
                  <View style={styles.typesContainer}>
                    {data.types.map(t => (
                      <View key={t.id}>{this.renderContent(t.name)}</View>
                    ))}
                  </View>
                );
              }}
            />
            <ListItem
              disablePress
              title="机构"
              titleStyle={styles.item.title}
              renderContent={() => this.renderContent(data.org)}
            />
            <ListItem
              disablePress
              title="职位"
              titleStyle={styles.item.title}
              renderContent={() => this.renderContent(data.title)}
            />
            <ListItem
              disablePress
              title="手机"
              titleStyle={styles.item.title}
              renderContent={() => this.renderContent(data.mobile)}
            />
            <ListItem
              disablePress
              title="微信"
              titleStyle={styles.item.title}
              renderContent={() => this.renderContent(data.wechat)}
            />
            <ListItem
              disablePress
              title="邮箱"
              titleStyle={styles.item.title}
              renderContent={() => this.renderContent(data.email)}
            />
            <ListItem
              disablePress
              title="常驻地"
              titleStyle={styles.item.title}
              renderContent={() => this.renderContent(data.address)}
            />
            <ListItem
              disablePress
              title="备注"
              titleStyle={styles.item.title}
              renderContent={() => this.renderContent(data.comment)}
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

export default ResourceDetail;
