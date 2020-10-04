<template>
	<view>
		<u-swiper :list="goods.thumb" height="800"></u-swiper>
		<view class="content">
			<view class="title">{{ goods.name }}</view>
			<view class="desc">{{ goods.descript }}</view>
			<view class="price">{{ formatPrice(goods.price) }}</view>
			<u-row gutter="16" class="express">
				<u-col :span="6">运费：免运费</u-col>
				<u-col :span="6">剩余：{{goods.stock}}</u-col>
			</u-row>
		</view>
		<view class="detail">
			<u-parse :html="goods.detail"></u-parse>
		</view>
		<view class="navigation">
			<view class="left">

				<view class="item" @click="toHome">
					<u-icon name="home" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">主页</view>
				</view>
				<view class="item" @click="like">
					<u-icon name="heart" :size="40" :color="$u.color[likeColor]"></u-icon>
					<view class="text u-line-1">收藏</view>
				</view>
				<view class="item car" @click="toCart">
					<u-badge class="car-num" :count="cartCount" type="error" :offset="[-3, -6]"></u-badge>
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1">加入购物车</view>
				<view class="buy btn u-line-1">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ifLike: false,
				likeColor: 'black',
				cartCount: '',
				showSku: false,
				sku: {
					tree: [],

					list: [],
					price: '0', // 默认价格（单位元）
					stock_num: 20, // 商品总库存
					collection_id: 0, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
					none_sku: false, // 是否无规格商品
					hide_stock: false // 是否隐藏剩余库存
				},
				offline: false,
				goods: {
					id: '',
					name: '',
					price: 0,
					express: '免运费',
					remain: 0,
					thumb: []
				}
			}
		},
		onLoad(option) {
			this.goods.id = option.id;
			this.init();
		},
		methods: {
			init() {
				const baseApi = this.baseApi;
				this.$u.get('goods/' + this.goods.id).then(res => {
					let goods = res.goods
					this.offline = !goods.isOnSale
					let sku = res.sku
					sku.price = (sku.price / 100).toFixed(2)
					this.sku = sku
					goods.thumb = new Array()
					goods.picture = baseApi + '/file/getImgStream?idFile=' + goods.pic
					const gallery = goods.gallery.split(',')
					for (var index in gallery) {
						goods.thumb.push(baseApi + '/file/getImgStream?idFile=' + gallery[index])
					}
					this.goods = goods
				});
				const user = this.vuex_user;
				console.log('user', user);
				if (user.mobile) {
					this.$u.get('user/cart/count').then(res => {
						this.cartCount = res === 0 ? '' : res
					});
					this.$u.get('user/favorite/ifLike/' + this.goods.id).then(res => {
						if (res === true) {
							this.likeColor = 'error'
							this.ifLike = true

						}
					});
				}
			},
			toHome() {
				this.$u.route({
					type: 'switchTab',
					url: '/pages/shop/index'
				})
			},
			toCart(){
				this.$u.route({
					type: 'switchTab',
					url: '/pages/shop/cart'
				})
			},
			formatPrice() {
				return '¥' + (this.goods.price / 100).toFixed(2)
			},
			like() {
				if (this.ifLike === false) {
					this.$u.post('user/favorite/add/'+this.goods.id).then(res => {
						this.$u.toast('收藏成功')
						this.ifLike = true
						this.likeColor = 'error'
					})
				} else {
					this.$u.post('user/favorite/dislike/'+this.goods.id).then(res => {
						this.$u.toast('取消收藏成功')
						this.ifLike = false
						this.likeColor = ''
					})

				}
			},
		}
	}
</script>


<style lang="scss" scoped>
	.content {
		padding: 30rpx;

		.title {
			font-size: 32rpx;
		}

		.desc {
			font-size: 12px;
			color: #999999;
			letter-spacing: 0;
			line-height: 18px;
			margin: 6px 0;
		}

		.price {
			color: #FA3534;
			font-size: 24rpx;
		}

		.express {
			color: #999;
			font-size: 24rpx;
			padding: 10rpx 0rpx;
		}
	}

	.navigation {
		display: flex;
		position: fixed;
		bottom: 0;
		margin-top: 100rpx;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 0;

		.left {
			display: flex;
			font-size: 20rpx;

			.item {
				margin: 0 30rpx;

				&.car {
					text-align: center;
					position: relative;

					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}

		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;

			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}

			.cart {
				background-color: #ed3f14;
				margin-right: 30rpx;
			}

			.buy {
				background-color: #ff7900;
			}
		}
	}
</style>
