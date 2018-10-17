import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';

import Input from 'component/uikit/textInput';
import Wrapper from './index';

@connect()
@createForm()
class Description extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Wrapper>
        {getFieldDecorator('description')(
          <Input
            autoFocus
            style={{ margin: 12, lineHeight: 20 }}
            multiline
            placeholder="项目主要的解决的问题是？可以从这几个方面来介绍"
            placeholderTextColor="#9B9B9B"
          />,
        )}
      </Wrapper>
    );
  }
}

export default Description;
