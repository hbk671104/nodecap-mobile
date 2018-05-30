import { StyleSheet, Dimensions } from 'react-native'

const window = Dimensions.get('window')
export const PARALLAX_HEADER_HEIGHT = 300
export const DEVICE_WIDTH = window.width

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
		title: {
			alignSelf: 'center',
			fontSize: 17,
			color: 'white',
			fontWeight: 'bold'
		}
	},
	dropdown: {
		container: {
			flex: 1
		},
		wrapper: {
			width: DEVICE_WIDTH,
			marginTop: 10
		},
		item: {
			container: {
				height: 45,
				justifyContent: 'center',
				alignItems: 'center'
			},
			title: {
				color: '#666666',
				fontSize: 14
			}
		}
	}
}
