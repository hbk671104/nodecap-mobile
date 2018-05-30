import React, { Component } from 'react'
import { Animated, Button, Text, View, Image } from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import NavigationBar from 'react-native-navbar'
import { Card } from 'react-native-elements'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, withState, withProps } from 'recompose'

import Header from './partials/header'
import ProfitSwiper from './partials/profitSwiper'
import ReturnRateChart from './partials/returnRateChart'
import DashboardGroup from './partials/group'
import InvestNumber from './partials/investNumber'
import ProjectItem from './partials/projectItem'
import Investment from './partials/investment'
import styles, { PARALLAX_HEADER_HEIGHT } from './style'

@connect(({ dashboard, fund }) => ({
	dashboard: dashboard.data,
	funds: fund.funds
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
	constructor(props) {
		super(props)
		const funds = R.pathOr([], ['funds'])(this.props)
		const firstFund = R.path([0])(funds)

		this.state = {
			currentFund: firstFund,
			currencies: ['CNY']
		}
	}
	componentWillMount() {
		const funds = R.pathOr([], ['funds'])(this.props)
		const firstFundId = R.path([0, 'id'])(funds)
		this.props.dispatch({
			type: 'dashboard/fetch',
			payload: firstFundId
		})
	}

	componentWillReceiveProps(nextProps, nextContext) {
		const firstFund = R.path(['funds', 0])(nextProps)
		if (!this.state.currentFund && nextProps.funds) {
			this.setState({
				currentFund: firstFund
			})
		}
	}

	getDashboardData = id => {
		this.props.dispatch({
			type: 'dashboard/fetch',
			payload: id
		})
		this.setState({
			currentFund: R.find(R.propEq('id', id))(this.props.funds)
		})
	}

	handleOnScroll = ({ nativeEvent: { contentOffset } }) => {
		const { setOffsetY } = this.props
		setOffsetY(contentOffset.y)
	}

	renderBackground = () => (
		<Image
			style={styles.background}
			source={require('asset/dashboard_bg.png')}
		/>
	)

	renderForeground = () => (
		<Header
			style={styles.foreground}
			{...this.props}
			currentFund={this.state.currentFund}
			onSelect={id => this.getDashboardData(id)}
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
		const { scrollY, setOffsetY, dashboard } = this.props
		const roiRankCount = R.length(R.path(['ROIRank'])(dashboard))
		return (
			<View style={styles.container}>
				<ParallaxScrollView
					contentContainerStyle={styles.scrollView.container}
					outputScaleValue={10}
					showsVerticalScrollIndicator={false}
					parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
					renderForeground={this.renderForeground}
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
							listener: this.handleOnScroll
						}
					)}
				>
					<ProfitSwiper
						total={R.path(['totalProfits', 'count'])(dashboard)}
						daily={R.path(['dailyProfits', 'count'])(dashboard)}
						weekly={R.path(['weeklyProfits', 'count'])(dashboard)}
					/>
					<ReturnRateChart style={styles.roiChart} {...this.props} />
					<DashboardGroup title="已投项目数量" icon="yitouxiangmu">
						<InvestNumber data={dashboard.portfolio} />
					</DashboardGroup>
					<DashboardGroup
						style={styles.dashboardGroup}
						title="投资金额"
						icon="touzijine"
					>
						<Investment data={dashboard.investment} />
					</DashboardGroup>
					{roiRankCount > 0 && (
						<DashboardGroup
							style={styles.dashboardGroup}
							title={`投资回报率 TOP ${roiRankCount}`}
							icon="TOP"
						>
							{dashboard.ROIRank.map((r, i) => (
								<ProjectItem key={i} index={i} data={r} />
							))}
						</DashboardGroup>
					)}
				</ParallaxScrollView>
			</View>
		)
	}
}
