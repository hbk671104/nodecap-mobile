import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, ViewPropTypes } from 'react-native'
import * as R from 'ramda'
import Accounting from 'accounting'

import NodeCapIcon from 'component/icon/nodecap'

const symbol = (b, size = 22) => {
	switch (b) {
		case 'USD':
			return <NodeCapIcon name="tubiaozhizuomoban" size={size} />
		case 'CNY':
			return <NodeCapIcon name="icomoon" size={size} />
		default:
			return <NodeCapIcon name={b} size={size} />
	}
}

const investment = ({ style, data }) => {
	const investCount = R.path(['investCount'])(data)
	const profit = R.path(['profits'])(data)

	// CNY
	const investCNY = investCount.CNY
	const profitCNY = Math.abs(profit.CNY)
	return (
		<View style={[styles.container, style]}>
			<View style={styles.top.container}>
				<View style={styles.top.bar.container}>
					<View style={[styles.top.bar.left, { flex: investCNY }]}>
						<NodeCapIcon name={'touzi-'} size={20} color="white" />
					</View>
					<View style={[styles.top.bar.right, { flex: profitCNY }]}>
						<NodeCapIcon name={'lirun'} size={20} color="white" />
					</View>
				</View>
				<View style={styles.top.content.container}>
					<View style={styles.top.content.item}>
						<Text style={styles.top.content.title}>投资金额</Text>
						<Text style={styles.top.content.title}>利润</Text>
					</View>
					{R.keys(investCount).map((c, i) => {
						const countItem = R.path([c])(investCount)
						const profitItem = R.path([c])(profit)
						if (R.isNil(countItem) || R.isEmpty(countItem)) {
							return null
						}
						return (
							<View
								key={i}
								style={[
									styles.top.content.item,
									(c === 'CNY' || c === 'USD') && { marginTop: 8 }
								]}
							>
								<Text
									style={[
										styles.top.content.text,
										c === 'CNY' && styles.top.content.investment
									]}
								>
									{symbol(c, c === 'CNY' ? 13 : 12)}{' '}
									{Accounting.formatNumber(countItem, 0)}
								</Text>
								<Text
									style={[
										styles.top.content.text,
										c === 'CNY' && profitItem > 0 && styles.top.content.profit,
										c === 'CNY' && profitItem < 0 && styles.top.content.deficit
									]}
								>
									{symbol(c, c === 'CNY' ? 13 : 12)}{' '}
									{Accounting.formatNumber(profitItem, 0)}
								</Text>
							</View>
						)
					})}
				</View>
			</View>
			{/* <View style={styles.bottom.container}>
				<Text>哈哈哈</Text>
			</View> */}
		</View>
	)
}

const styles = {
	container: {
		paddingTop: 38
	},
	top: {
		container: {
			paddingHorizontal: 20
		},
		bar: {
			container: {
				height: 39,
				borderRadius: 2,
				flexDirection: 'row'
			},
			left: {
				borderTopLeftRadius: 2,
				borderBottomLeftRadius: 2,
				backgroundColor: '#F88E40',
				justifyContent: 'center',
				paddingLeft: 10
			},
			right: {
				borderTopRightRadius: 2,
				borderBottomRightRadius: 2,
				backgroundColor: '#1890FF',
				justifyContent: 'center',
				alignItems: 'flex-end',
				paddingRight: 10
			}
		},
		content: {
			container: {
				marginTop: 20
			},
			title: {
				color: '#666666',
				fontSize: 13,
				fontWeight: 'bold'
			},
			item: {
				flexDirection: 'row',
				justifyContent: 'space-between',
				marginTop: 4
			},
			investment: {
				color: '#FF7600',
				fontSize: 13,
				fontWeight: 'bold'
			},
			profit: {
				color: '#1890FF',
				fontSize: 13,
				fontWeight: 'bold'
			},
			deficit: {
				color: '#F5222D',
				fontSize: 13,
				fontWeight: 'bold'
			},
			text: {
				color: '#666666',
				fontSize: 12
			}
		}
	},
	bottom: {
		container: {
			paddingLeft: 20
		}
	}
}

investment.propTypes = {
	style: ViewPropTypes.style,
	data: PropTypes.object
}

export default investment
