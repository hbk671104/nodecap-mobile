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
	sticker: {
		container: {
			position: 'absolute',
			top: -48,
			left: 0,
			right: 0
		},
		card: {
			margin: 0,
			height: 96,
			marginHorizontal: 27.5,
			borderRadius: 2,
			borderWidth: 0,
			shadowColor: 'rgba(0, 0, 0, 0.08)',
			shadowRadius: 4,
			justifyContent: 'center',
			alignItems: 'center'
		}
	},
	scrollView: {
		container: {
			paddingTop: 54
		}
	}
}
