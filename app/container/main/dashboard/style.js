import { StyleSheet, Dimensions } from 'react-native'

const window = Dimensions.get('window')
export const PARALLAX_HEADER_HEIGHT = 250

export default {
	container: {
		flex: 1
	},
	background: {
		width: window.width,
		height: PARALLAX_HEADER_HEIGHT
	},
	scrollView: {
		container: {
			paddingTop: 54
		},
		sticker: {
			position: 'absolute',
			top: -48,
			left: 28,
			right: 28,
			height: 96,
			margin: 0,
			borderRadius: 2,
			borderWidth: 0,
			shadowColor: 'rgba(0, 0, 0, 0.08)',
			shadowRadius: 4,
			justifyContent: 'center',
			alignItems: 'center'
		}
	}
}
