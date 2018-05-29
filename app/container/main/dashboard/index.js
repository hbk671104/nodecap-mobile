import React, { Component } from 'react'
import { Animated, Button, Text, View, Image } from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import NavigationBar from 'react-native-navbar'
import { Card } from 'react-native-elements'
import { connect } from 'react-redux'
import { compose, withState, withProps } from 'recompose'
import styles, { PARALLAX_HEADER_HEIGHT } from './style'

const AnimatedParallax = Animated.createAnimatedComponent(ParallaxScrollView)

@connect(({ dashboard, fund }) => ({
  dashboard: dashboard.data,
  funds: fund.funds,
}))
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
					<Card containerStyle={styles.sticker}>
						<Text>哦哦哦拉拉拉</Text>
					</Card>
					{/* <Button title="登出" onPress={this.handleOnLogout} /> */}
				</AnimatedParallax>
			</View>
		)
	}
}
