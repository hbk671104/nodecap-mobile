import { mainColor } from 'component/uikit/color';
import { shadow } from '../../../../../utils/style';

export default {
  container: {
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingTop: 10,
    backgroundColor: 'white',
    ...shadow,
  },
  name: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.85)',
    marginLeft: 12,
  },
  investment: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.45)',
  },
  investmentCount: {
    color: mainColor,
  },
  roi: {
    marginTop: 20,
  },
  roiTitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.45)',
    marginBottom: 10,
  },
  percent: {
    fontSize: 25,
    color: mainColor,
    fontWeight: 'bold',
    lineHeight: 25,
  },
  percentSymbol: {
    color: mainColor,
    fontSize: 14,
    marginBottom: 4,
  },
  baseCoin: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.45)',
    marginBottom: 4,
    marginLeft: 4,
    marginRight: 4,
  },
  roiDivision: {
    marginBottom: 4,
    marginHorizontal: 10,
    color: 'rgba(0,0,0,0.15)',
  },
  cnyPercent: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.45)',
    fontWeight: 'bold',
    marginBottom: 2,
    marginLeft: 4,
    marginRight: 4,
  },
  cnyCoin: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.45)',
    marginBottom: 5,
    marginLeft: 4,
    marginRight: 4,
  },
  actionBar: {
    paddingTop: 16,
    paddingBottom: 12,
  },
  buttonDivision: {
    width: 0.5,
    height: 10,
    backgroundColor: '#E7E7E7',
  },
  button: {
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
    color: 'rgba(0,0,0,0.65)',
    alignContent: 'center',
  },
};
