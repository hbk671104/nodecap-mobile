import React, { Component } from 'react'
import { Animated, Button, Text, View, ImageBackground } from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import NavigationBar from 'react-native-navbar'
import { compose, withState, withProps } from 'recompose'
import styles, { PARALLAX_HEADER_HEIGHT } from './style'

const AnimatedParallax = Animated.createAnimatedComponent(ParallaxScrollView)

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

	renderBackground = () => <View style={styles.header.background} />

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
					backgroundColor="#1890FF"
					showsVerticalScrollIndicator={false}
					contentBackgroundColor={'white'}
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
							useNativeDriver: true,
							listener: event => {
								const offsetY = event.nativeEvent.contentOffset.y
								setOffsetY(offsetY)
							}
						}
					)}
				>
					<Button title="登出" onPress={this.handleOnLogout} />
				</AnimatedParallax>
			</View>
		)
	}
}
