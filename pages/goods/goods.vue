<template>
	<view class="goods-detail-wrapper">
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
					<u-icon name="home" :size="40"></u-icon>
					<view class="text u-line-1">主页</view>
				</view>
				<view class="item" @click="like">
					<u-icon name="heart" :size="40" :color="likeColor"></u-icon>
					<view class="text u-line-1">收藏</view>
				</view>
				<view class="item car" @click="toCart">
					<u-badge class="car-num" :count="cartCount" type="error" :offset="[-3, -6]"></u-badge>
					<u-icon name="shopping-cart" :size="40" ></u-icon>
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
							<view class="price">{{formatPrice(price)}}</view>
							<view class="stock">剩余<text class="stock_num">{{stock}}</text>件</view>
							<template v-if="!sku.none_sku">
								<view class="tips">{{hasSel?'已选择':'请选择'}}
									<text v-for="(item,index) in sku.tree" :key="index" style="padding-left:10rpx;">

										{{item.sel?item.v[parseInt(item.sel)].name:item.k}}
									</text>
								</view>
							</template>
						</u-col>
					</u-row>
				</view>
				<template v-if="!sku.none_sku">
					<view class="sku-list">
						<block v-for="(category,index) in sku.tree" :key="index">
							<view class="tree">
								<view class="title">{{category.k}}</view>
							</view>
							<view class="node-list">
								<u-tag class="node" :type="node.mode=='disable'?'info':'warning'" v-for="(node,index2) in category.v" :key="index2"
								 :text="node.name" :mode="node.mode=='default'?'light':(node.mode=='select'?'dark':'light')" @click="selSku(category,node)" />


							</view>
						</block>

					</view>
				</template>

				<view class="count u-flex u-row-between">
					<view>购买数量</view>
					<view>
						<u-number-box v-model="count" :max="stock"></u-number-box>
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
				stock: '',
				price: '',
				hasSel:false,
				sku: {
					tree: [],

					list: [],
					price: '0', // 默认价格（单位元）
					stock_num: 20, // 商品总库存
					collection_id: 0, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
					none_sku: false, // 是否无规格商品
					hide_stock: false, // 是否隐藏剩余库存					
					sel: {}
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
			this.goods.id = option.id
			this.init()
		},
		methods: {
			init() {
				this.getCartCount()
				const baseApi = this.baseApi;
				this.$u.get('goods/' + this.goods.id).then(res => {
					let goods = res.goods
					this.offline = !goods.isOnSale
					let sku = res.sku
					sku.price = (sku.price / 100).toFixed(2)

					if (!sku.none_sku) {
						for (var i in sku.tree) {
							for (var m in sku.tree[i].v) {
								sku.tree[i].v[m].mode = 'default';

							}
						}
					}
					this.sku = sku;
					this.stock = goods.stock;
					this.price = goods.price;
					goods.thumb = new Array()
					goods.picture = baseApi + '/file/getImgStream?idFile=' + goods.pic
					const gallery = goods.gallery.split(',')
					for (var index in gallery) {
						goods.thumb.push(baseApi + '/file/getImgStream?idFile=' + gallery[index])
					}
					this.goods = goods
					if(res.favorite === true){
						this.likeColor = 'error'
						this.ifLike = true
					}
				});
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
			formatPrice(price) {
				return '¥' + (price / 100).toFixed(2)
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
				console.log('actionType', this.actionType);
				this.showSku = true;
			},
			buy() {
				let idSku = '';
				if (!this.sku.none_sku) {
					idSku = this.sku.sel.id;
					if(!idSku){
						this.$u.toast('请选择商品规格')
						return ;
					}
				}
				const params = {
					idGoods: this.goods.id,
					count: this.count,
					idSku: idSku
				}

				this.$u.post('user/cart/add/', params).then(res => {
					this.showSku = false;
					if ('cart' == this.actionType) {
						this.$u.toast('成功加入购物车');
						this.init()

					} else {
						this.$u.route({
							type: 'switchTab',
							url: '/pages/shop/cart'
						})

					}
				})


			},
			//todo 商品规格选择算法待优化
			selSku(category, node) {
				if (node.mode == 'disable') {
					return;
				}
				this.hasSel = true;
				let selItem = {};
				const skuDataId = node.id;
				const categoryks = category.k_s;
				let sku = this.sku;
				let skuTree = sku.tree;
				let list = sku.list;
				let anotherArr = new Array();
				//提取当前选择的所有组合选项。
				for (const i in list) {
					const item = list[i];
					if (item[categoryks] == skuDataId) {
						anotherArr.push(item);
					}
				}

				for (const i in skuTree) {
					const ks = skuTree[i].k_s;
					for (const j in skuTree[i].v) {
						const id = skuTree[i].v[j].id;
						if (categoryks == ks) {
							//统一类规格中，设置当前选项为select，其他选项为default
							if (skuDataId == id) {
								skuTree[i].v[j].mode = 'select';
								skuTree[i].sel = j
								selItem[ks] = skuTree[i].v[j].id;
							} else {
								skuTree[i].v[j].mode = 'default';
							}
						} else {

							let disable = true;
							for (const m in anotherArr) {
								if (anotherArr[m][ks] == id) {
									disable = false;
								}
							}
							if (disable) {
								skuTree[i].v[j].mode = 'disable';
							} else {
								if (skuTree[i].v[j].mode !== 'select') {
									skuTree[i].v[j].mode = 'default';
								} else {
									skuTree[i].sel = j
									selItem[ks] = skuTree[i].v[j].id;
								}
							}
						}

					}
				}
				this.sku = {};
				sku.tree = skuTree;
				this.sku = sku;
 
				let skuSelItem;
				for (const i in list) {
					const item = list[i];
					let sel = true;
					for (const j in skuTree) {
						const key = skuTree[j].k_s;
						if (selItem[key] !== item[key]) {
							sel = false;
							break;
						}
					}
					if (sel) {
						skuSelItem = item;
						break;
					}
				}

				if (skuSelItem) {
					this.stock = skuSelItem.stock_num;
					this.price = skuSelItem.price;
					this.sku.sel = skuSelItem;
				}else{
					this.sku.sel = {};
				}
				console.log('sku', this.sku)
			},
			getCartCount(){
				this.$u.get('user/cart/count').then( res => {
					this.cartCount = res
				})
			}
		}
	}
</script>


<style lang="scss" scoped>
	.goods-detail-wrapper {
		padding-bottom: 140rpx;
	}
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
