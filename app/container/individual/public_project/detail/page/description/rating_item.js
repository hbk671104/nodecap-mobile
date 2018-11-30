import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flex } from 'antd-mobile';
import { Col, Row, Grid } from 'react-native-easy-grid';
import R from 'ramda';
import { shadow } from '../../../../../../utils/style';
import Touchable from 'component/uikit/touchable';
import Gradient from 'component/uikit/gradient';

const rating_item = ({ data, org, columns = 5, onMorePress, onIndustryPress }) => {
  const targeted_id = R.path(['rating_type_id'])(data);
  const grade_url = R.path(['grade_url'])(data);
  const name = R.pathOr('--', ['name'])(org);
  const standard = R.pathOr([], ['rating_types'])(org);

  // rating
  const rating = R.find(r => r.id === targeted_id)(standard);
  const rating_id = R.path(['id'])(rating);
  const rating_name = R.path(['name'])(rating);

  const length = R.length(standard);
  const rows = Math.ceil(length / columns);
  const remainder = rows > 1 ? length % columns : length;
  const residue = rows > 1 ? columns - remainder : columns - length;

  return (
    <View style={styles.container}>
      <Flex align="center" justify="space-between" style={{ marginBottom: 8 }}>
        <Touchable onPress={onIndustryPress}>
          <Text style={styles.title}>{name}</Text>
        </Touchable>
        {!R.isNil(grade_url) && (
          <Touchable borderless onPress={onMorePress}>
            <Text style={styles.more}>查看</Text>
          </Touchable>
        )}
      </Flex>
      <View>
        <Flex align="flex-start">
          {standard.map(i => (
            <View style={{ flex: 1 }}>
              {i.id === rating_id ? (
                <View style={[styles.ratingName]}>
                  <Text style={styles.ratingText}>{rating_name}</Text>
                  <View style={styles.ratingArrow} />
                </View>
              ) : null}
            </View>
          ))}
        </Flex>
      </View>
      <View style={styles.ratingProgress}>
        <Gradient
          colors={['#D0DFED', '#7E99B3']}
          start={{ x: 0, y: 2.5 }}
          end={{ x: 1.0, y: 2.5 }}
        >
          <Flex align="flex-start" style={styles.content.container}>
            {standard.map(i => (
              <View style={{ flex: 1, borderRightColor: 'white', borderRightWidth: 1, height: 5 }} />
            ))}
          </Flex>
        </Gradient>
      </View>
    </View>
  );
};

const styles = {
  container: {
    marginTop: 18,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
  },
  more: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1890FF',
  },
  ratingProgress: {
    marginTop: 10,
  },
  ratingName: {
    height: 15,
    paddingHorizontal: 8,
    backgroundColor: '#C2D3E3',
    borderRadius: 2,
    alignItems: 'center',
    alignSelf: 'center',
  },
  ratingText: {
    color: 'white',
    fontSize: 11,
    zIndex: 10,
    ...shadow,
  },
  ratingArrow: {
    width: 8,
    height: 8,
    backgroundColor: '#C2D3E3',
    borderRadius: 1,
    transform: [{ rotateZ: '45deg' }],
    zIndex: 0,
    marginTop: -5.5,
  },
  content: {
    container: {
      height: 5,
    },
    overall: {
      container: {
        height: 45,
        width: 65,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
      },
      rating: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1890FF',
      },
      subtitle: {
        fontSize: 11,
        color: 'rgba(0, 0, 0, 0.85)',
      },
    },
    grid: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: '#E9E9E9',
      marginLeft: 6,
    },
    item: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#E9E9E9',
      },
      highlight: {
        backgroundColor: '#F5F5F5',
      },
      text: {
        fontSize: 14,
        color: '#999999',
      },
    },
  },
};

export default rating_item;
