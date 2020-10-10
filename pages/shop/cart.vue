<template>
	<view class="wrap">
		<u-navbar :custom-back="back" title="购物车">

			<view class="navbar-right" slot="right">
				<view class="link-text" @click="onClickRight">
					{{rightText}}
				</view>
			</view>
		</u-navbar>
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
						<view class="gl-price">
							<u-row>
								<u-col :span="6">
										￥{{formatPrice(item.goods.price)}}
								</u-col>
								<u-col :span="6">
									<u-number-box v-model="item.count" :min="1" :max="item.goods.stock"  ></u-number-box>
								</u-col>
							</u-row>							
							</view>
						 
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
		
		<view class="navigation"  >
			<view class="left">
				<view class="item">
					<u-checkbox @change="checkAll" v-model="checkedAll" shape="circle">全选</u-checkbox>
				</view>
				<view class="item total-price">
					合计: ￥{{formatPrice(totalPrice)}}
				</view>
		
			</view>
			<view class="right">
				<u-button type="error" shape="circle"   @click="submit" >{{rightText=='编辑'?'结算':'删除'}}</u-button>
			</view>
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
		computed:{
			totalPrice(){
				  return this.cartList.reduce((total, item) => total + (item.checked==true ? (parseFloat(item.goods.price)*item.count) : 0), 0)
      
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
							cart.checked = true;
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
			back() {
				this.$u.route({
					type: 'navigateBack',
					delta: 1
				})
			},
			onClickRight() {
				this.showEdit = !this.showEdit
				this.rightText = this.rightText === '编辑' ? '完成' : '编辑'
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
			},
			countChange(e){
				
				console.log('e', e);
			},
			checkAll() {
				if (this.checkedAll) { 
					for (var i in this.cartList) {
						this.cartList[i].checked = false;
					}
				} else { 
					for (var i in this.cartList) {
						this.cartList[i].checked = true;
					}
				}
				this.checkedAll = !this.checkedAll; 
			},
			submit(){
				let idArr = new Array();
				for(const i in this.cartList){
					if(this.cartList[i].checked){
						idArr.push(this.cartList[i].id);
					}
				}
				if(idArr.length == 0 ){
					this.$u.toast('请选择要处理的商品');
					return ;
				}
				if(this.rightText=='编辑'){
					//结算
					console.log('结算',idArr);
				}
				if(this.rightText == '完成'){
					//将商品移出购物车
					this.$u.delete('user/cart',idArr).then( res => {
						this.$u.toast('成功移出商品');
						this.init();
					});
					console.log('将商品移出购物车',idArr);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 0rpx 30rpx;
		.navbar-right {
			margin-right: 24rpx;
			display: flex;
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
		
		.navigation {
			width: 100%;
			display: flex;
			position: fixed;
			bottom: 10;
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
				.total-price{
						font-size: 30rpx;
						color:red;
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
