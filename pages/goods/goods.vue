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
				<view class="cart btn u-line-1" @click="showSkuPop('cart')">加入购物车</view>
				<view class="buy btn u-line-1" @click="showSkuPop('buy')">立即购买</view>
			</view>
		</view>

		<u-popup v-model="showSku" mode="bottom" :closeable="true">
			<view class="sku">
				<view class="goods">
					<u-row>
						<u-col :span="4" class="left">
							<u-image width="170rpx" height="170rpx" :src="goods.picture"></u-image>
						</u-col>
						<u-col :span="8" class="right">
							<view class="price">{{formatPrice(goods.price)}}</view>
							<view class="stock">剩余<text class="stock_num">{{goods.stock}}</text>件</view>
							<template v-if="!sku.none_sku">
								<view class="tips">请选择
									<text v-for="(item,index) in sku.tree" :key="index" style="padding-left:10rpx;">
										{{item.k}}
									</text>
								</view>
							</template>
						</u-col>
					</u-row>
				</view>
				<template v-if="!sku.none_sku">
					<view class="sku-list">
						<block v-for="(item,index) in sku.tree" :key="index">
							<view class="tree">
								<view class="title">{{item.k}}</view>
							</view>
							<view class="node-list">

								<u-tag class="node" type="warning" v-for="(node,index2) in item.v" :key="index2" :text="node.name" :mode="sku.skuData[item.k_s] && sku.skuData[item.k_s].idAttr==node.id?'dark':'light'"
								 @click="selSku(item,node)" />


							</view>
						</block>

					</view>
				</template>

				<view class="count u-flex u-row-between">
					<view>购买数量</view>
					<view>
						<u-number-box v-model="count" :max="goods.stock"></u-number-box>
					</view>
				</view>
				<view class="action">
					<u-button type="error" shape="circle" @click="buy">确定</u-button>
				</view>
			</view>
		</u-popup>

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
					hide_stock: false, // 是否隐藏剩余库存
					skuData: {
						count: 1
					}
				},
				count: 1,
				offline: false,
				goods: {
					id: '',
					name: '',
					price: 0,
					express: '免运费',
					remain: 0,
					thumb: []
				},
				actionType: 'buy'
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

					if (!sku.none_sku) {
						sku.skuData = {};
						for (var i in sku.tree) {
							sku.skuData[sku.tree[i].k_s] = {};
							sku.skuData[sku.tree[i].k_s].idAttr = sku.tree[i].v[0].id;
						}
					}
					console.log('sku', sku);
					this.sku = sku;
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
			toCart() {
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
					this.$u.post('user/favorite/add/' + this.goods.id).then(res => {
						this.$u.toast('收藏成功')
						this.ifLike = true
						this.likeColor = 'error'
					})
				} else {
					this.$u.post('user/favorite/dislike/' + this.goods.id).then(res => {
						this.$u.toast('取消收藏成功')
						this.ifLike = false
						this.likeColor = ''
					})

				}
			},
			showSkuPop(type) {
				this.actionType = type;
				console.log('actionType',this.actionType);
				this.showSku = true;
			},
			buy() {
				let idSku = '';
				for (const i in this.sku.list) {
					const item = this.sku.list[i];
					let checkRet = true;
					for (const key in this.sku.skuData) {
						if (item[key] !== this.sku.skuData[key].idAttr) {
							checkRet = false;
							break;
						}
					}
					if (checkRet) {
						idSku = item.id;
						break;
					}
				}
				console.log('用户选中的sku', idSku);
				const params = {
					idGoods: this.goods.id,
					count: this.count,
					idSku: idSku
				}

				this.$u.post('user/cart/add/', params).then(res => {
					this.showSku = false;
					if ('cart' == this.actionType) {
						this.$u.toast('成功加入购物车');
						this.init();

					} else {
						this.$u.route({
							type: 'switchTab',
							url: '/pages/shop/cart'
						})

					}
				})


			},
			selSku(categoryData, skuData) {
				console.log(categoryData);
				console.log(skuData);
				this.sku.skuData[categoryData.k_s].idAttr = skuData.id;
				console.log(this.sku.skuData);
			}
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
		width: 100%;
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

	.sku {
		padding: 24rpx 32rpx;

		.goods {
			.right {
				padding-left: 20rpx;

				.price {
					color: #FA3534;
					font-size: 34rpx;
				}

				.stock {
					margin-top: 8px;
					color: #969799;
					font-size: 12px;

					.stock_num {
						margin-right: 16rpx;
						margin-left: 16rpx;
					}
				}

				.tips {
					margin-top: 8px;
					color: #969799;
					font-size: 12px;
					line-height: 16px;
				}


			}
		}

		.sku-list {

			.tree {
				margin-top: 30rpx;

				.title {
					padding-bottom: 12px;
				}
			}

			.node-list {
				.node {
					justify-content: center;
					min-width: 80rpx;
					margin: 0 24rpx 24rpx 0;
					line-height: 24rpx;
					vertical-align: middle;
				}
			}
		}

		.count {
			padding: 24rpx 0rpx;
			overflow: hidden;
			line-height: 60rpx;
			padding-bottom: 60rpx;

		}
	}
</style>
