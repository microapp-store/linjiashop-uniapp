<template>
	<view class="wrap">
		<view class="u-m-t-5">
			<u-cell-group>
				<u-cell-item icon="map" :title="addr.name+' '+addr.tel" @click="chooseAddr"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="list">
			<view class="item" v-for="(item,index) in cartList" :key="index">
				<u-row gutter="16">

					<u-col :span="3">
						<u-image width="100%" height="150rpx" :src="imgUrl+item.goods.pic"></u-image>
					</u-col>
					<u-col :span="9" @click="toGoods(item.goods.id)">
						<view class="gl-name">{{item.goods.name}}</view>
						<view class="gl-descript">{{item.goods.descript}}</view>
						<view class="gl-price">
							<u-row>
								<u-col :span="6">
									￥{{formatPrice(item.goods.price)}}
								</u-col>
								<u-col :span="6">
									x{{item.count}}
								</u-col>
							</u-row>
						</view>

					</u-col>
				</u-row>
			</view>
		</view>

		<view class="navigation">
			<view class="left">

				<view class="item total-price">
					合计: ￥{{formatPrice(totalPrice)}}
				</view>

			</view>
			<view class="right">
				<u-button type="error" shape="circle" @click="submit">提交订单</u-button>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.baseApi + '/file/getImgStream?idFile=',
				ids: '',
				addr: {
					name: '',
					tel: ''
				},
				chooseAddrId: undefined,
				cartList: []
			}
		},
		computed: {
			totalPrice() {
				return this.cartList.reduce((total, item) => total + (parseFloat(item.goods.price) * item.count), 0)

			}
		},
		onShow() {
			let chooseAddrId = uni.getStorageSync('chooseAddrId')
			if (chooseAddrId && chooseAddrId !== this.chooseAddrId) {
				this.chooseAddrId = chooseAddrId
				this.init()
			}
		},
		onLoad(option) {
			this.ids = option.ids
			uni.setStorageSync('idCarts', option.ids)
			console.log("idCarts from cache", uni.getStorageSync('idCarts'))
			this.init();
		},
		methods: {
			init() {
				const baseApi = this.baseApi
				let url = 'user/order/prepareCheckout?idCarts=' + this.ids
				if (this.chooseAddrId) {
					url += '&chosenAddressId=' + this.chooseAddrId
				}
				this.$u.get(url).then(res => {
					let addr = res.addr;
					if (!this.addr || !this.addr.name) {
						this.addr.name = '请选择收获地址'
					} else {
						this.addr = res.addr
					}
					let cartList = res.list
					for (const index in cartList) {
						let cart = cartList[index]

					}
					this.cartList = cartList
				});
			},
			formatPrice(price) {
				return (price / 100).toFixed(2)
			},
			chooseAddr() {
				this.$u.route({
					url: '/pages/address/list',
					params: {
						choose: true
					}
				})
			},
			submit() {
				if (!this.addr || !this.addr.tel || this.addr.tel == '') {
					this.$u.toast('请选择收货地址')
					return
				}
				let idCarts = ''
				for (var i in this.cartList) {
					idCarts += this.cartList[i].id + ','
				}
				const params = {
					idAddress: this.chooseAddrId,
					idCarts: idCarts
				}
				this.$u.post('user/order/save?idAddress=' + this.chooseAddrId + '&idCarts=' + idCarts).then(res => {
					const order = res
					uni.setStorageSync('chooseAddrId', undefined)
					uni.getStorageSync('idCarts', undefined)
					this.$u.route({
						url: '/pages/order/payment/payment',
						params: {
							orderSn: order.orderSn,
							totalPrice: order.totalPrice
						}
					})
				});

			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 0rpx 20rpx;

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
					color: #FA3534;
				}
			}
		}

		.navigation {
			width: 100%;
			display: flex;
			position: fixed;
			bottom: 0;
			margin-top: 100rpx;
			border: solid 2rpx #f2f2f2;
			background-color: #ffffff;
			padding: 16rpx 0;
			justify-content: space-between;

			.left {
				display: flex;
				font-size: 20rpx;

				.item {
					margin: 0 8rpx;
				}

				.total-price {
					font-size: 30rpx;
					color: red;
					padding-top: 20rpx;
				}
			}

			.right {
				display: flex;
				font-size: 28rpx;
				align-items: center;
				margin-right: 60rpx;

			}
		}
	}
</style>
