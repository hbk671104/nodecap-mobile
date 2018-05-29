import { Platform } from 'react-native'

export const raised = {
	...Platform.select({
		ios: {
			shadowColor: 'rgba(0,0,0, .4)',
			shadowOffset: { height: 1, width: 1 },
			shadowOpacity: 1,
			shadowRadius: 1
		},
		android: {
			elevation: 2
		}
	})
}
