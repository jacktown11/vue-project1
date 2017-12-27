<template>
	<div>	
		<my-dialog :isShow="isShowCheckDialog" @on-close="closeCheckDialog">
		  请检查你的支付状态！<br>
		  <div class="button" @click="checkOrder">
		    支付成功
		  </div>
		  <div class="button" @click="handleFailPay">
		    支付失败
		  </div>
		</my-dialog>
		<my-dialog :isShow="isShowSucceedDialog" @on-close="toOrderListPage">
		  购买成功！
		</my-dialog>
		<my-dialog :isShow="isShowFailDialog" @on-close="toOrderListPage">
		  购买失败！
		</my-dialog>			
	</div>
</template>

<script>
import MyDialog from './base/MyDialog'

export default {
	components: {
		MyDialog
	},
	props: {
		isShowCheckDialog: {
			type: Boolean,
			default: false
		},
		orderId: {
			type: [String, Number]
		}
	},
	data () {
		return {
			isShowSucceedDialog: false,
			isShowFailDialog: false
		}
	},
	methods: {
		closeCheckDialog () {
			this.$emit('on-close-check')
		},
		handleFailPay () {
			this.closeCheckDialog()
			this.isShowFailDialog = true
		},
		closeSucceedDialog () {
			this.isShowSucceedDialog = false
		},
		closeFailDialog () {
			this.isShowFailDialog = false
		},
		checkOrder () {
			this.$http.post('/api/checkOrder', this.orderId)
			.then((res) => {
				this.closeCheckDialog()
					this.isShowSucceedDialog = true				
			}, (err) => {
				this.closeCheckDialog()
				this.isShowFailDialog = true
			})
		},
		toOrderListPage () {
			this.closeSucceedDialog()
			this.closeFailDialog()
			this.$router.push('/orderlist')
		}
	}
}
</script>

<style scoped>
	
</style>