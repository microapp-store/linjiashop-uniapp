<template>
	<view class="wrap">

		<view class="base">
			<view class="title">{{expressInfo.expressCompany}}</view>
			<view class="item"> 快递单号：{{expressInfo.shippingSn}}</view>
			<view class="item"> 收货地址：{{order.consigneeAddress}}</view>
		</view>

		<view class="list">
			<u-time-line v-for="(item, index) in expressInfo.infoList" :key="index">
				<u-time-line-item>
					<template v-slot:content>
						<view class="u-order-title" v-if="index==0">{{expressInfo.stateStr}}</view>
						<view class="u-order-desc">
							{{ item.AcceptStation }}
						</view>
						<view class="u-order-time">
							{{ item.AcceptTime }}
						</view>
					</template>
				</u-time-line-item>
			</u-time-line>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order: {
					orderSn: '',
					address: {
						name: ''
					}
				},
				expressInfo: {}
			}
		},
		onLoad(option) {
			this.order.orderSn = option.orderSn;
			this.init();
		},
		methods: {
			init() {
				this.$u.get('user/order/getExpressInfo/' + this.order.orderSn).then(res => {
					this.order = res.order;
					this.expressInfo = res.expressInfo;
					console.log('expressInfo', this.expressInfo);
					console.log('order', this.order);
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	.base {
		background-color: #FFFFFF;
		padding: 20rpx;
		margin-bottom:30rpx;
		.title {
			color: #F59A23;
			font-size: 30rpx;
		}

		.item {
			padding-top: 10rpx;
		}
	}

	.list {
		background-color: #FFFFFF;
		padding: 30rpx;
	}

	.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}

	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}

	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}

	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
</style>
