import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

const datePicker = props => {
  const { onChange, value } = props;
  return (
    <DatePicker
      {...props}
      style={{ width: undefined }}
      customStyles={styles.customStyles}
      date={value}
      mode="date"
      placeholder="请选择日期"
      format="LL"
      maxDate={moment().format('LL')}
      confirmBtnText="确认"
      cancelBtnText="取消"
      iconComponent={() => null}
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
    btnConfirm: {
      color: '#1890FF',
    },
  },
};

datePicker.propTypes = {
  onChange: PropTypes.func,
};

export default datePicker;
