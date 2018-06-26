import { mainColor, borderColor } from 'component/uikit/color';
import { PARALLAX_HEADER_HEIGHT } from '../../../../dashboard/style';

export default {
  container: {
    marginTop: 18,
  },
  verticalField: {
    height: 'auto',
    paddingVertical: 11,
  },
  field: {
    marginLeft: 9,
    borderBottomWidth: 0.5,
    borderBottomColor: borderColor,
    justifyContent: 'center',
    paddingRight: 15,
    paddingVertical: 13,
  },
  fieldName: {
    color: '#999999',
  },
  fieldValue: {
    marginLeft: 10,
    flex: 1,
  },
  item: {
    marginHorizontal: 12,
    marginBottom: 20,
    backgroundColor: 'white',
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'rgb(44, 64, 83)',
    shadowOpacity: 0.1,
  },
  itemHeader: {
    justifyContent: 'center',
    backgroundColor: mainColor,
    height: 30,
    borderTopEndRadius: 2,
    borderTopLeftRadius: 2,
    paddingHorizontal: 10,
  },
  itemHeaderText: {
    color: 'white',
  },
};
