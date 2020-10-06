<template>
	<view class="cart">
		<view class="list">
			<view class="item" v-for="(item,index) in cartList" :key="index">
				<u-row gutter="16">
					<u-col :span="1">
						<u-checkbox @change="changeCheckBox" v-model="item.checked" shape="circle"></u-checkbox>
					</u-col>
					<u-col :span="3">
						<u-image width="100%" height="150rpx" :src="item.thumb"></u-image>
					</u-col>
					<u-col :span="8" @click="toGoods(item.goods.id)">
						<view class="gl-name">{{item.goods.name}}</view>
						<view class="gl-descript">{{item.goods.descript}}</view>
						<view class="gl-price">￥{{formatPrice(item.goods.price)}}</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<view class="no-data" v-if="isLogin && cartList.length ===0 ">
			<view class="content">
				<u-icon name="shopping-cart" size="80" /><br>
				购物车还是空的
			</view>
			<u-button shape="circle" @click="toHome">去逛逛</u-button>
		</view>
		<view class="no-data" v-if="!isLogin">
			<view class="content">
				<u-icon name="shopping-cart" size="80" /><br>
				还没有登录
			</view>
			<u-button type="primary" shape="circle" @click="toLogin">立即登录</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
				activeFooter: 2,
				checkedCartItem: [], //当前选中的购物车项目id
				allCartItem: [], // 用户所有的购物车项目id列表
				cartList: [],
				checkedAll: true,
				showEdit: false,
				rightText: '编辑'
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				const baseApi = this.baseApi;
				const token = this.vuex_token;
				this.isLogin = token;
				if (this.isLogin) {
					this.$u.get('user/cart/queryByUser').then(res => {
						let cartList = res
						for (const index in cartList) {
							let cart = cartList[index]
							cart.checked = false;
							cart.thumb = baseApi + '/file/getImgStream?idFile=' + cart.goods.pic
							this.checkedCartItem.push(cartList[index].id)
						}

						this.allCartItem = this.checkedCartItem
						this.cartList = cartList
					})
				}
			},
			toHome() {
				this.$u.route({
					type: 'switchTab',
					url: '/pages/shop/index'
				});
				
			},
			toLogin() {
				this.$u.route('/pages/login/login');
			},
			formatPrice(price) {
				return (price / 100).toFixed(2);
			},
			toGoods(id) {
				this.$u.route({
					url: '/pages/goods/goods',
					params: {
						id: id
					}
				})
			},
			changeCheckBox(e) {
				console.log('e', e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cart {
		.list {
			.item {
				margin-top:20rpx;
				.gl-name {
					font-size: 26rpx;
				}

				.gl-descript {
					margin-top:14rpx;
					font-size: 20rpx;
				}

				.gl-price {
					margin-top:26rpx;
					font-size: 24rpx;
					color: #FA3534;
				}
			}
		}

		.no-data {
			padding: 0rpx 30rpx;
			margin-top: 50%;

			.content {
				text-align: center;
				color: lightgray;
				margin-bottom: 30rpx;
			}
		}
	}
</style>
