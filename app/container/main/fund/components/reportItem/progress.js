import React from 'react';
import { View, Text } from 'react-native';
import { Flex } from 'antd-mobile';
import styles from './progress.style.js';
import { currencyFormat } from '../../../../../utils/utils';

export default function ReportItemProgress({ title, unit = '', leftNumber, rightNumber, rightTitle, color }) {
  return (
    <View>
      <Flex justify="space-between">
        <View>
          <Flex>
            <View style={[styles.titlePrefix, {
            backgroundColor: color,
          }]}
            />
            <Text style={styles.title}>{title}</Text>
          </Flex>
          <Text style={styles.currency}>{currencyFormat(leftNumber)} {unit.toUpperCase()}</Text>
        </View>
        <Flex direction="column" align="end">
          <Text style={styles.title}>{rightTitle}</Text>
          <Text style={styles.currency}>{currencyFormat(rightNumber)} {unit.toUpperCase()}</Text>
        </Flex>
      </Flex>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBackground, {
          backgroundColor: color,
          width: '100%',
        }]}
        />
        <View style={[styles.progressForeground, {
          backgroundColor: color,
          width: `${leftNumber / (leftNumber + rightNumber) * 100}%`,
        }]}
        />
      </View>
    </View>
  );
}
