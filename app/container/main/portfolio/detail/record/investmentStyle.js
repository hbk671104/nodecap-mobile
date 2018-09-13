import { mainColor, borderColor } from 'component/uikit/color';
import { shadow } from '../../../../../utils/style';

export default {
  container: {
    marginTop: 12,
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
    borderRadius: 2,
    ...shadow,
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
