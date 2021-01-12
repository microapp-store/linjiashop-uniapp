<template>
	<view class="wrap">
		<view class="order_detail">
			<view class="top">
				<view class="address_detail">
					{{order.consigneeAddress}}
					<br>
				</view>
				<view class="footer_btn">
					<u-button size="mini" type="info" @click="contact"> 联系客服</u-button>
					<u-button size="mini" type="primary" @click="payment" v-show="order.statusName=='待付款'">立即付款</u-button>
					<u-button size="mini" type="success" @click="confirmReceive" v-show="order.statusName=='已发货'">确认收货</u-button>
				</view>
			</view>
			<view class="content">
				<view class="title">
					{{'订单编号: ' + order.orderSn}}
				</view>
				<view class="list">
					<view class="item" v-for="(item,index) in order.items" :key="index">
						<u-row gutter="16">

							<u-col :span="3">
								<u-image width="100%" height="150rpx" :src="imgUrl+item.goods.pic"></u-image>
							</u-col>
							<u-col :span="9" @click="toGoods(item.goods.id)">
								<view class="gl-name">{{item.goods.name}}</view>
								<view class="gl-descript">{{item.goods.descript}}</view>
								<view class="gl-price">
									<u-row>
										<u-col offset="6" :span="3" text-align="right">
											￥{{formatPrice(item.price)}}
										</u-col>
										<u-col :span="3" text-align="right">
											x{{item.count}}
										</u-col>
									</u-row>
								</view>

							</u-col>
						</u-row>
					</view>
				</view>
				<view class="total">合计: {{formatPrice(order.totalPrice)}}</view>

			</view>
			<view>
				<u-cell-group title="订单信息">
					<u-cell-item title="订单编号" :value="order.orderSn" :arrow="false"></u-cell-item>
					<u-cell-item title="创建时间" :value="order.createTime" :arrow="false"></u-cell-item>
				</u-cell-group>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.baseApi + '/file/getImgStream?idFile=',
				order: {
					orderSn: '',
					consigneeAddress: '',
					address: {
						name: ''
					}
				}
			}
		},
		onLoad(option) {
			this.order.orderSn = option.orderSn
			this.getData()
		},
		methods: {
			getData() {
				this.$u.get('user/order/' + this.order.orderSn).then(res => {
					this.order = res
				})
			},
			formatPrice(price) {
				return (price / 100).toFixed(2);
			},
			toGoods(id) {
				this.$router.push({
					path: '/goods/' + id
				})
			},
			payment() {
				this.$u.route({
					url: '/pages/order/payment/payment',
					params: {
						orderSn: this.order.orderSn,
						totalPrice: this.order.totalPrice
					}
				})
				 
			},
			confirmReceive(){
				this.$u.post('user/order/confirm/' + this.order.orderSn).then(res => {
					this.order = res
				})
			},
			contact(){
				this.$u.toast('敬请期待')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order_detail {
		margin: 30rpx;

		.top {
			.address_detail {
				padding: 5px;
			}

			.footer_btn {
				text-align: right;

				.u-btn {
					margin-left: 20rpx;
				}
			}
		}

		.content {
			margin-top: 40rpx;

			.total {
				text-align: right;
				padding: 10px;
			}

			.list {
				.item {
					margin-top: 20rpx;

					.gl-name {
						font-size: 26rpx;
					}

					.gl-descript {
						margin-top: 14rpx;
						font-size: 20rpx;
					}

					.gl-price {
						margin-top: 26rpx;
						font-size: 24rpx; 
					}
				}
			}
			.total{
				
			}
		}



	}
</style>
