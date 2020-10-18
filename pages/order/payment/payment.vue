<template>
	<view class="wrap">
		<u-cell-group>
			<u-cell-item icon="bag" title="订单编号" :arrow="false" :value="orderSn"></u-cell-item>
			<u-cell-item icon="rmb" title="应付金额" :arrow="false" :value="totalPriceFmt"></u-cell-item>
		</u-cell-group>
		<u-radio-group v-model="payType">
			<view class="item" v-for="(res, index) in payWayList" :key="res.name">
				<u-row>
					<u-col :span="11">
						<view class="top">
							<view class="name">
								<u-image mode="widthFix" width="200rpx" :src="res.img"></u-image>
							</view>
						</view>
					</u-col>
					<u-col :span="1">
						<u-radio :name="res.name"></u-radio>
					</u-col>
				</u-row>
			</view>
		</u-radio-group>
		
		<u-button type="primary" @click="submit">立即支付</u-button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderSn: '',
				totalPrice: '',
				payType: 'wxpay',
				payWayList: [{
						name: 'wxpay',
						text: '微信支付',
						img: '/static/img/wxpay.png'
					},
					{
						name: 'alipay',
						text: '支付宝',
						img: '/static/img/alipay.png'
					}
				]
			}
		},
		computed: {
			totalPriceFmt() {
				return '¥' + (this.totalPrice / 100).toFixed(2)
			}
		},
		onLoad(option) {
			this.orderSn = option.orderSn;
			this.totalPrice = option.totalPrice;
		},
		methods: { 
			submit(){
				console.log('payType',this.payType);
				this.$u.toast(this.payType+'支付完善中'); 
			}
		}
	}
</script>


<style lang="scss" scoped>
	.wrap {
		padding: 0rpx 30rpx;

		.item {
			width: 100%;
			padding: 20rpx 10rpx;
 
		}



	}
</style>
