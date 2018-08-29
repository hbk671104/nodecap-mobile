import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, StyleSheet, ImageBackground } from 'react-native';
import * as R from 'ramda';

import Text from 'component/text';
import NodeCapIcon from 'component/icon/nodecap';
import { symbol } from '../../../../../../../utils/icon';

const investment = ({ style, data }) => {
  const cost = R.pathOr({}, ['total_cost'])(data);
  const profit = R.pathOr({}, ['profits'])(data);

  if (R.isEmpty(cost) || R.isEmpty(profit)) {
    return null;
  }

  // CNY
  const investCNY = cost.CNY;
  const profitCNY = profit.CNY;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.top.container}>
        <View style={styles.top.bar.container}>
          <View style={[styles.top.bar.left, { flex: investCNY }]} />
          {profitCNY > 0 ? (
            <View
              style={[styles.top.bar.right, { flex: Math.abs(profitCNY) }]}
            />
          ) : (
            <ImageBackground
              source={require('asset/background_img.png')}
              style={[
                styles.top.bar.right,
                { backgroundColor: 'transparent', flex: Math.abs(profitCNY) },
              ]}
              imageStyle={styles.top.bar.border}
            />
          )}
          <View style={styles.top.bar.cover}>
            <NodeCapIcon name="touzi-" size={20} color="white" />
            <NodeCapIcon name="lirun" size={20} color="white" />
          </View>
        </View>
        <View style={styles.top.content.container}>
          <View style={styles.top.content.item}>
            <Text style={styles.top.content.title}>投资金额</Text>
            <Text style={styles.top.content.title}>利润</Text>
          </View>
          {R.keys(cost)
            .filter(c => c !== 'USDT')
            .map((c, i) => {
              const countItem = R.pathOr('--', [c])(cost);
              const profitItem = R.pathOr('--', [c])(profit);
              if (R.isNil(countItem) || R.isEmpty(countItem)) {
                return null;
              }
              return (
                <View
                  key={i}
                  style={[
                    styles.top.content.item,
                    (c === 'CNY' || c === 'USD') && { marginTop: 8 },
                  ]}
                >
                  <Text
                    style={[
                      styles.top.content.text,
                      c === 'CNY' && styles.top.content.investment,
                    ]}
                  >
                    {symbol(c)} <Text disablePrefix>{countItem}</Text>
                  </Text>
                  <Text
                    style={[
                      styles.top.content.text,
                      c === 'CNY' &&
                        profitItem > 0 &&
                        styles.top.content.profit,
                      c === 'CNY' &&
                        profitItem < 0 &&
                        styles.top.content.deficit,
                    ]}
                  >
                    {symbol(c)} <Text disablePrefix>{profitItem}</Text>
                  </Text>
                </View>
              );
            })}
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    paddingTop: 17,
  },
  top: {
    container: {
      // paddingHorizontal: 20,
    },
    bar: {
      container: {
        height: 39,
        borderRadius: 2,
        flexDirection: 'row',
      },
      left: {
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,
        backgroundColor: '#F88E40',
      },
      right: {
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
        backgroundColor: '#1890FF',
      },
      border: {
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
      },
      cover: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      },
    },
    content: {
      container: {
        marginTop: 20,
      },
      title: {
        color: '#666666',
        fontSize: 13,
        fontWeight: 'bold',
      },
      item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
      },
      investment: {
        color: '#FF7600',
        fontSize: 13,
        fontWeight: 'bold',
      },
      profit: {
        color: '#1890FF',
        fontSize: 13,
        fontWeight: 'bold',
      },
      deficit: {
        color: '#F5222D',
        fontSize: 13,
        fontWeight: 'bold',
      },
      text: {
        color: '#666666',
        fontSize: 12,
      },
    },
  },
  bottom: {
    container: {
      paddingLeft: 20,
      marginTop: 40,
    },
    title: {
      fontSize: 12,
      color: '#666666',
    },
    item: {
      container: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      divider: {
        borderBottomColor: '#E9E9E9',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      title: {
        color: '#333333',
        fontSize: 13,
        fontWeight: 'bold',
      },
      subtitle: {
        color: '#333333',
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 16,
      },
    },
  },
};

investment.propTypes = {
  style: ViewPropTypes.style,
  data: PropTypes.object,
};

export default investment;
