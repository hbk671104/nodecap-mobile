import { StyleSheet, Dimensions } from 'react-native'

const window = Dimensions.get('window')
export const PARALLAX_HEADER_HEIGHT = 250

export default {
	container: {
		flex: 1
	},
	header: {
		background: {
			backgroundColor: '#1890FF'
		}
	}
}
