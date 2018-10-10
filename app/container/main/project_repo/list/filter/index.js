import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { NavigationActions, SafeAreaView } from 'react-navigation';

import FilterGroup from './group';
import styles from './style';

@connect(({ filter, public_project }) => ({
  institution: R.pathOr([], ['institution', 'data'])(filter),
  coinTag: R.pathOr([], ['coinTag', 'data'])(filter),
  params: R.pathOr({}, ['list', 'params'])(public_project),
}))
export default class ProjectListFilter extends Component {
  handleSelection = ({ value, key }) => {
    const { params } = this.props;
    let data = R.path([key])(params);
    if (data) {
      const array = R.split(',')(data);
      if (R.contains(value)(array)) {
        data = R.remove(value)(array);
      } else {
        data = R.append(value)(array);
      }
      data = array;
    } else {
      data = [value];
    }

    data = R.join(',')(data);

    console.log(data);

    this.props.dispatch({
      type: 'public_project/fetch',
      params: {
        ...params,
        [key]: data,
        currentPage: 1,
        pageSize: 20,
      },
    });
  };

  render() {
    const { institution, coinTag, params } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>筛选条件</Text>
          <FilterGroup
            title="知名机构"
            data={institution}
            selection={R.pipe(
              R.pathOr('', ['industry_id']),
              R.split(','),
            )(params)}
            onSelect={value =>
              this.handleSelection({ value, key: 'industry_id' })
            }
          />
          <View style={styles.separator} />
          <FilterGroup
            title="领域"
            data={coinTag}
            selection={R.pathOr([], ['tag_id'])(params)}
            onSelect={value => this.handleSelection({ value, key: 'tag_id' })}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
