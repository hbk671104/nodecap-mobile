import { StyleSheet, Dimensions } from 'react-native'

const window = Dimensions.get('window')
export const PARALLAX_HEADER_HEIGHT = 300

export default {
	container: {
		flex: 1
	},
	background: {
		width: window.width,
		height: PARALLAX_HEADER_HEIGHT
	},
	foreground: {
		// width: window.width,
		height: PARALLAX_HEADER_HEIGHT
	},
	scrollView: {
		container: {
			paddingTop: 48,
			paddingBottom: 40
		}
	},
	dashboardGroup: {
		marginTop: 31
	},
	roiChart: {
		marginTop: 45
	},
	navbar: {
		container: {
			height: 44 + 20,
			justifyContent: 'flex-end'
			// borderBottomWidth: StyleSheet.hairlineWidth,
			// borderBottomColor: '#666666'
		},
		wrapper: {
			height: 44,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center'
		},
		title: {
			fontSize: 17,
			color: 'white',
			fontWeight: 'bold'
		}
	}
}
