<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false"
				 swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in orders[0]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.orderSn }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.statusName }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.items" :key="index">
									<view class="left" @click="toGoods(item.goods.id)">
										<image :src="imgUrl+item.goods.pic" mode="aspectFill"></image>
									</view>
									<view class="content" @click="toGoods(item.goods.id)">
										<view class="title u-line-2">{{ item.goods.name }} </view>
										<view class="type">{{ item.title }}</view>
										<view class="delivery-time">付款后5天内发货</view>
									</view>
									<view class="right">
										<view class="price">
											￥{{ formatPrice(item.price) }}
										</view>
										<view class="number">x{{ item.count }}</view>
									</view>
								</view>
								<view class="total">
									共{{ totalNum(res.items) }}件商品 合计:
									<text class="total-price">
										￥{{ totalPrice(res.items) }}

									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<view class="logistics btn" @click="cancel(res.orderSn)">取消订单</view>
									<view class="evaluate btn" @click="pay(res.orderSn,totalPrice(res.items)*100)">立即付款</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in orders[1]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.orderSn }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.statusName }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.items" :key="index">
									<view class="left" @click="toGoods(item.goods.id)">
										<image :src="imgUrl+item.goods.pic" mode="aspectFill"></image>
									</view>
									<view class="content" @click="toGoods(item.goods.id)">
										<view class="title u-line-2">{{ item.goods.name }} </view>
										<view class="type">{{ item.title }}</view>
										<view class="delivery-time">付款后5天内发货</view>
									</view>
									<view class="right">
										<view class="price">
											￥{{ formatPrice(item.price) }}
										</view>
										<view class="number">x{{ item.count }}</view>
									</view>
								</view>
								<view class="total">
									共{{ totalNum(res.items) }}件商品 合计:
									<text class="total-price">
										￥{{ totalPrice(res.items) }}

									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<view class="evaluate btn">提醒发货</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in  orders[2]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.orderSn }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.statusName }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.items" :key="index">
									<view class="left" @click="toGoods(item.goods.id)">
										<image :src="imgUrl+item.goods.pic" mode="aspectFill"></image>
									</view>
									<view class="content" @click="toGoods(item.goods.id)">
										<view class="title u-line-2">{{ item.goods.name }} </view>
										<view class="type">{{ item.title }}</view>
										<view class="delivery-time">付款后5天内发货</view>
									</view>
									<view class="right">
										<view class="price">
											￥{{ formatPrice(item.price) }}
										</view>
										<view class="number">x{{ item.count }}</view>
									</view>
								</view>
								<view class="total">
									共{{ totalNum(res.items) }}件商品 合计:
									<text class="total-price">
										￥{{ totalPrice(res.items) }}

									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<view class="logistics btn" @click="expressInfo(res.orderSn)">查看物流</view>
									<view class="evaluate btn" @click="confirm(res.orderSn)">确认收货</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[2]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in  orders[3]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.orderSn }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.statusName }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.items" :key="index">
									<view class="left" @click="toGoods(item.goods.id)">
										<image :src="imgUrl+item.goods.pic" mode="aspectFill"></image>
									</view>
									<view class="content" @click="toGoods(item.goods.id)">
										<view class="title u-line-2">{{ item.goods.name }} </view>
										<view class="type">{{ item.title }}</view>
										<view class="delivery-time">付款后5天内发货</view>
									</view>
									<view class="right">
										<view class="price">
											￥{{ formatPrice(item.price) }}
										</view>
										<view class="number">x{{ item.count }}</view>
									</view>
								</view>
								<view class="total">
									共{{ totalNum(res.items) }}件商品 合计:
									<text class="total-price">
										￥{{ totalPrice(res.items) }}

									</text>
								</view>
								<view class="bottom">
									<view class="more">
										<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
									</view>
									<view class="evaluate btn">评价</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[3]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {			 
				imgUrl: this.baseApi + '/file/getImgStream?idFile=',
				orders: [
					[],
					[],
					[],
					[]
				],
				listQuery: {
					page: 1,
					limit: 20
				},
				list: [{
						name: '待付款'
					},
					{
						name: '待发货'
					},
					{
						name: '待收货'
					},
					{
						name: '待评价'
					}
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore'],
			};
		},
		onLoad() {
			//待付款
			this.getOrders(1);
			//待发货
			this.getOrders(2);
			//已发货
			this.getOrders(3);
			//已完成
			this.getOrders(4);
		},
		computed: {
			// 价格小数
			priceDecimal() {
				return val => {
					if (val !== parseInt(val)) {
						return val.slice(-2);
					} else {
						return '00';
					}
				};
			},
			// 价格整数
			priceInt() {
				return val => {
					if (val !== parseInt(val)) return val.split('.')[0];
					else return val;
				};
			}

		},
		methods: {
			reachBottom() {
				const current = this.current;
				if (this.loadStatus[current] == 'nomore') {
					return;
				}
				this.listQuery.page++;
				this.getOrders(current + 1);
			},
			getOrders(status) {
				const page = this.listQuery.page;
				const limit = this.listQuery.limit;
				this.orders[status - 1] = new Array();
				this.loadStatus.splice(status - 1, 1, "loading");
				this.$u.get('user/order/getOrders?page=' + page + '&limit=' + limit + '&status=' + status).then(res => {
					let orderList = res.records;
					for (let index in orderList) {
						let order = orderList[index];
						order.title = '' + order.createTime;
						order.descript = '' + order.orderSn;
						this.orders[status - 1].push(order);
					}
					if (orderList.length < limit) {
						this.loadStatus.splice(status - 1, 1, "nomore");
					}else{
						this.loadStatus.splice(status - 1, 1, "more");
					}

				});
			},
			formatPrice(val) {
				return (val / 100).toFixed(2);
			},
			// 总价
			totalPrice(item) {
				let price = 0;
				item.map(val => {
					price += val.price;
				});
				return this.formatPrice(price);
			},
			// 总件数
			totalNum(item) {
				let num = 0;
				if (item) {
					item.map(val => {
						if (val.number) {
							num += val.number
						}
						if (val.count) {
							num += val.count
						}
					});
				}
				return num;
			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			toHome() {
				this.$u.route({
					type: 'switchTab',
					url: '/pages/shop/index'
				})
			},
			toGoods(id) {
				this.$u.route({
					url: '/pages/goods/goods',
					params: {
						id: id
					}
				})
			},
			cancel(orderNo){
				this.$u.post('user/order/cancel/'+orderNo).then( res => {
					this.getOrders(1);
				});
			},
			expressInfo(orderNo){
				console.log('查看物流信息',orderNo);
				this.$u.route({
					url: '/pages/order/express',
					params: {
						orderSn: orderNo
					}
				})
			},
			confirm(orderNo){
				console.log('确认收货',orderNo)
				this.$u.post('user/order/confirm/'+orderNo).then( res => {
					this.getOrders(3);
				});
			},
			pay(orderNo,totalPrice){
				this.$u.route({
					url: '/pages/order/payment/payment',
					params: {
						orderSn: orderNo,
						totalPrice: totalPrice
					}
				})
			}
		}
	};
</script>

<style>
	/* #ifndef H5 */
	page {
		height: 100%;
		background-color: #f2f2f2;
	}

	/* #endif */
</style>

<style lang="scss" scoped>
	.order {
		width:98%;
		background-color: #ffffff;
		margin: 1%;
		border-radius: 10rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}

			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
</style>
