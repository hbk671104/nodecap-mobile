import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Flex } from 'antd-mobile';
import * as R from 'ramda';
import moment from 'moment';
import Group from 'component/project/group';

import { renderField } from './field';
import styles from './style';

const dateFormat = date => (date ? moment(date).format('YYYY年MM月DD日 HH:mm') : null);

class BaseInfo extends Component {
  render() {
    const projectProps = path => R.path(['item', ...path])(this.props);

    return (
      <View>
        <Group
          style={styles.base.container}
          icon={require('asset/project/detail/base.png')}
          title="录入信息"
        />
        <View>
          {renderField({
            name: '录入人',
            value: projectProps(['post_user', 'realname']),
          })}
          {renderField({
            name: '录入时间',
            value: dateFormat(projectProps(['created_at'])),
          })}
          {renderField({
            name: '对接时间',
            value: dateFormat(projectProps(['match_date'])),
          })}
          {renderField({
            name: 'Close 时间',
            value: dateFormat(projectProps(['close_date'])),
          })}
          {renderField({
            name: '团队持有比例',
            value: projectProps(['own_ratio']) ? `${projectProps(['own_ratio'])}%` : null,
          })}
          <Flex>
            {renderField({
              name: '项目国别',
              value: projectProps(['region', 'name']),
              style: {
                flex: 1,
                // alignItems: projectProps(['source']) ? 'flex-start' : 'space-between',
              },
              // valueStyle: {
              //   marginLeft: 14,
              // },
            })}
            {renderField({
              name: '项目来源',
              value: projectProps(['source']),
              style: {
                flex: 1,
                // marginLeft: projectProps(['region', 'name']) ? 0 : 22,
                // paddingLeft: projectProps(['region', 'name']) ? 10 : 0,
              },
            })}
          </Flex>
          <Flex>
            {renderField({
              name: '项目渠道',
              value: projectProps(['channel']),
              style: {
                flex: 1,
                // alignItems: projectProps(['watch_user']) ? 'flex-start' : 'space-between',
              },
              // valueStyle: {
              //   marginLeft: 14,
              // },
            })}
            {renderField({
              name: '跟进人',
              value: projectProps(['watch_user']),
              style: {
                flex: 1,
                // marginLeft: projectProps(['channel']) ? 0 : 22,
                // paddingLeft: projectProps(['channel']) ? 10 : 0,
              },
            })}
          </Flex>
          {!!projectProps(['review']) && (
            <View style={[styles.base.field, styles.base.verticalField]}>
              <Text style={styles.base.fieldName}>推荐语</Text>
              <Text style={[styles.base.fieldValue, { marginTop: 11 }]}>
                {projectProps(['review'])}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default BaseInfo;
