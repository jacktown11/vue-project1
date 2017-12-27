import Vue from 'vue'

const state = {
	orderList: [],
	params: {}
}
const getters = {
	getOrderList: (state) => state.orderList 
}
const actions = {
	fetchOrderList ({commit, state}) {
		Vue.http.post('/api/getOrderList',this.params)
		.then((res) => {
			commit('updateOrderList',res.data.orderList)
		}, (err) => {

		})
	}	
}
const mutations = {
	updateOrderList (state, payload) {
		state.orderList = payload
	},
	updateParams (state, payload) {
		state.params = payload
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}