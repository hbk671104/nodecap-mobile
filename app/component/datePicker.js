import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

const datePicker = props => {
  const { onChange, style, inputStyle, value, maxDate } = props;
  return (
    <DatePicker
      {...props}
      style={[styles.container, style]}
      customStyles={{
        ...styles.customStyles,
        dateInput: { ...styles.customStyles.dateInput, ...inputStyle },
      }}
      date={value}
      mode="date"
      placeholder="请选择日期"
      format="YYYY-MM-DD"
      maxDate={maxDate}
      confirmBtnText="确认"
      cancelBtnText="取消"
      iconComponent={<View />}
      onDateChange={date => {
        onChange(date);
      }}
    />
  );
};

const styles = {
  container: {
    width: undefined,
  },
  customStyles: {
    dateTouch: {
      width: undefined,
    },
    dateTouchBody: {
      height: undefined,
    },
    dateInput: {
      height: undefined,
      borderWidth: 0,
      alignItems: 'flex-start',
    },
    placeholderText: {
      color: 'rgba(0, 0, 0, 0.25)',
      fontSize: 14,
    },
    btnTextConfirm: {
      color: '#1890FF',
    },
  },
};

datePicker.propTypes = {
  onChange: PropTypes.func,
  maxDate: PropTypes.string,
};

datePicker.defaultProps = {
  maxDate: moment().format('YYYY-MM-DD'),
};

export default datePicker;
