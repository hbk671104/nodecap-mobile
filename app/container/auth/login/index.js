import React, { Component } from 'react'
import {
	Text,
	View,
	ScrollView,
	Image,
	KeyboardAvoidingView
} from 'react-native'
import { createForm } from 'rc-form'
import { connect } from 'react-redux'
import { compose, withState } from 'recompose'
import AuthButton from 'component/auth/button'
import AuthInput from 'component/auth/input'
import styles from './style'

@connect(({loading}) => ({
	loading: loading.effects['login/login']
}))
@createForm()
class Login extends Component {
	handleOnSubmit = () => {
		if(this.props.loading){
			return
		}
		this.props.form.validateFields((err, value) => {
			if (!err) {
				this.props.setLoading(true)
				this.props.dispatch({
					type: 'login/login',
					payload: {
						...value
					},
					callback: () => this.props.setLoading(false)
				})
			}
		})
	}

	render() {
		const { getFieldDecorator, getFieldValue } = this.props.form
		const { loading } = this.props
		const account = getFieldValue('account')
		const password = getFieldValue('password')
		return (
			<ScrollView style={styles.container}>
				<KeyboardAvoidingView behavior="position">
					<Image style={styles.logo} source={require('asset/big_logo.png')} />
					<View style={{ marginTop: 55 }}>
						{getFieldDecorator('account', {
							rules: [{ required: true, message: '请输入邮箱账号' }]
						})(
							<AuthInput
								style={styles.input}
								title="账号"
								placeholder="请输入邮箱账号"
							/>
						)}
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入密码' }]
						})(
							<AuthInput
								style={[styles.input, { marginTop: 27 }]}
								title="密码"
								placeholder="请输入密码"
								inputProps={{ secureTextEntry: true }}
							/>
						)}
					</View>
					<AuthButton
						loading={loading}
						disabled={!account || !password}
						style={styles.button}
						onPress={this.handleOnSubmit}
					/>
				</KeyboardAvoidingView>
			</ScrollView>
		)
	}
}

export default Login
