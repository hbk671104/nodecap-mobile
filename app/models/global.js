import axios from 'axios'
import * as R from 'ramda'
import { getConstants, getAllPermissions } from '../services/api'

export default {
	namespace: 'global',

	state: {
		collapsed: false,
		title: 'Nodus 管理系统',
		company: {
			name: 'Node Capital'
		},
		constants: null,
		projectTags: [],
		financeStage: [],
		permissions: []
	},

	effects: {
		*startup(_, { put, call, all }) {
			try {
				const res = yield [call(getConstants)]

				yield all([
					put({
						type: 'getConstants',
						payload: res[0].data
					})
				])
			} catch (e) {
				console.log(e)
			}
		},
		*initial({ callback }, { select, put, call, all, take }) {
			const token = yield select(state => state.login.token)
			if (token) {
				axios.defaults.headers.common.Authorization = `Bearer ${token}`
			}
			try {
				const res = yield call(getAllPermissions)
				yield put({
					type: 'getPermissions',
					payload: res.data
				})

				yield put({
					type: 'fund/fetch'
				})

				yield take('fund/fetch/@@end')
				// const funds = yield select(state => state.fund.funds)
				// const firstFundId = R.path([0, 'id'])(funds)
				// yield put({
				// 	type: 'dashboard/fetch',
				// 	payload: firstFundId
				// })
			} catch (e) {
				console.log(e)
			}
		}
	},

	reducers: {
		changeLayoutCollapsed(state, { payload }) {
			return {
				...state,
				collapsed: payload
			}
		},
		getConstants(state, { payload }) {
			return {
				...state,
				constants: payload
			}
		},
		getPermissions(state, { payload }) {
			return {
				...state,
				permissions: payload
			}
		},
		getFinanceStage(state, { payload }) {
			return {
				...state,
				financeStage: payload
			}
		},
		getProjectTags(state, { payload }) {
			return {
				...state,
				projectTags: payload
			}
		}
	}
}
