import React, { Component } from 'react'
import { Animated, Button, Text, View, Image } from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import NavigationBar from 'react-native-navbar'
import Swiper from 'react-native-swiper'
import { Card } from 'react-native-elements'
import { compose, withState, withProps } from 'recompose'
import styles, { PARALLAX_HEADER_HEIGHT } from './style'

const AnimatedParallax = Animated.createAnimatedComponent(ParallaxScrollView)
import {
	VictoryBar,
	VictoryAxis,
	VictoryChart,
	VictoryLine
} from 'victory-native'

const data = [
	{ quarter: '5/22', earnings: 200 },
	{ quarter: '5/23', earnings: 400 },
	{ quarter: '5/24', earnings: 100 },
	{ quarter: '5/25', earnings: 500 },
	{ quarter: '5/26', earnings: 600 },
	{ quarter: '5/27', earnings: 200 },
	{ quarter: '5/28', earnings: 800 }
]

@compose(
	withState('scrollY', 'setScrollY', new Animated.Value(0)),
	withState('offsetY', 'setOffsetY', 0),
	withProps(({ scrollY }) => ({
		opacityRange: scrollY.interpolate({
			inputRange: [0, PARALLAX_HEADER_HEIGHT / 2],
			outputRange: [0, 1],
			extrapolate: 'clamp'
		})
	}))
)
export default class Dashboard extends Component {
	handleOnLogout = () => {
		this.props.navigation.navigate('Auth')
	}

	renderBackground = () => (
		<Image
			style={styles.background}
			source={require('asset/dashboard_bg.png')}
		/>
	)

	renderFixedHeader = () => {
		const { opacityRange, offsetY } = this.props
		return (
			<Animated.View style={{ opacity: opacityRange }}>
				<NavigationBar
					title={{ title: 'Dashboard' }}
					statusBar={{
						style:
							offsetY > PARALLAX_HEADER_HEIGHT / 2 ? 'default' : 'light-content'
					}}
				/>
			</Animated.View>
		)
	}

	render() {
		const { scrollY, setOffsetY } = this.props
		return (
			<View style={styles.container}>
				<AnimatedParallax
					contentContainerStyle={styles.scrollView.container}
					outputScaleValue={10}
					showsVerticalScrollIndicator={false}
					parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
					renderBackground={this.renderBackground}
					renderFixedHeader={this.renderFixedHeader}
					scrollEventThrottle={16}
					onScroll={Animated.event(
						[
							{
								nativeEvent: {
									contentOffset: {
										y: scrollY
									}
								}
							}
						],
						{
							listener: ({ nativeEvent: { contentOffset } }) => {
								setOffsetY(contentOffset.y)
							}
						}
					)}
				>
					<View style={styles.sticker.container}>
						<Swiper height={100} showsPagination={false} loop={false}>
							<Card containerStyle={styles.sticker.card}>
								<Text>哦哦哦拉拉拉</Text>
							</Card>
							<Card containerStyle={styles.sticker.card}>
								<Text>哦哦哦拉拉拉</Text>
							</Card>
							<Card containerStyle={styles.sticker.card}>
								<Text>哦哦哦拉拉拉</Text>
							</Card>
						</Swiper>
					</View>
					<VictoryChart
						style={{
							parent: {
								paddingHorizontal: 10
							}
						}}
						height={220}
						// domainPadding={15}
					>
						<VictoryAxis
							crossAxis
							style={{
								tickLabels: {
									fontSize: 11,
									fill: '#666666'
								},
								axis: { stroke: '#DDDDDD', strokeWidth: 0.5 }
							}}
						/>
						<VictoryAxis
							dependentAxis
							style={{
								tickLabels: {
									fontSize: 11,
									fill: '#666666'
								},
								grid: { stroke: 'rgba(221, 221, 221, 0.8)', strokeWidth: 0.5 },
								axis: { stroke: 'transparent', strokeWidth: 0.5 }
							}}
							tickFormat={x => x + '%'}
						/>
						<VictoryBar
							style={{ data: { fill: '#EAF8ED' } }}
							data={data}
							cornerRadius={8}
							x="quarter"
							y="earnings"
						/>
						<VictoryLine
							style={{ data: { stroke: '#09AC32', strokeWidth: 3 } }}
							interpolation="natural"
							data={data}
							x="quarter"
							y="earnings"
						/>
					</VictoryChart>
				</AnimatedParallax>
			</View>
		)
	}
}
