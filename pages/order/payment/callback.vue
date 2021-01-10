<template>
	<view class="wrap">
		<view class="top">
			<u-icon name="checkmark-circle-fill" color="#19be6b" size="120" v-if="isSuccess && result!='查询中'"></u-icon>
			<u-icon name="error-circle-fill" color="#fa3534" size="120" v-if="!isSuccess && result!='查询中'"></u-icon>
			<view>{{result}}</view>
		</view>
		<view class="content" v-if="result!=='查询中'">
			<u-button type="primary" @click="finish">确定</u-button> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderSn: '',
				isSuccess: undefined,
				result: '查询中'
			}
		},
		onLoad(option) {
			this.orderSn = option.orderSn
			this.init()
		},
		methods: {
			init() {
				this.$u.get('pay/queryResult/' + this.orderSn).then(res => { 
					if (res == true) {
						this.result = "支付成功"
						this.isSuccess = true
					} else {
						this.isSuccess = false
						this.result = "支付失败"
					}
				})
			},
			finish(){ 
				this.$u.route({
					url: '/pages/order/detail',
					params: {
						orderSn: this.orderSn
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		.top {
			text-align: center;
			margin:60rpx;
		}
		.content{
			padding:60rpx;
		}
	}
</style>
