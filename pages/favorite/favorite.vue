<template>
	<view class="wrap">
		<u-navbar :custom-back="back" title="喜欢的商品">

			<view class="navbar-right" slot="right" v-if="favList.length!=0">
				<view class="link-text" @click="onClickRight">
					{{rightText}}
				</view>
			</view>
		</u-navbar>
		<view class="no-data" v-if="favList.length ===0 ">
			<view class="content">
				<u-icon name="heart" size="80" /><br>
				收藏列表还是空的
			</view>
			<u-button shape="circle" @click="toHome">去逛逛</u-button>
		</view>
		<view class="gl-body">
			<u-row v-for="(item,index) in favList" :key="index">
				<u-col :span="2" v-if="showEdit">
					<u-checkbox @change="changeCheckBox" v-model="checkList[index]" shape="circle"></u-checkbox>
				</u-col>
				<u-col :span="4" class="gl-img">
					<u-image width="170rpx" height="170rpx" :src="item.goods.img" @click="toDetail(item.goods.id)"></u-image>
				</u-col>
				<u-col :span="showEdit?6:8" @click="toDetail(item.goods.id)">
					<view class="gl-name">{{item.goods.name}}</view>
					<view class="gl-descript">{{item.goods.descript}}</view>
					<view class="gl-price">￥{{formatPrice(item.goods.price)}}</view>
				</u-col>
			</u-row>
		</view>
		<view class="navigation" v-if="showEdit && favList.length>0">
			<view class="left">
				<view class="item">
					<u-checkbox @change="checkAll" v-model="checkedAll" shape="circle">全选</u-checkbox>
				</view>

			</view>
			<view class="right">
				<u-button type="error" shape="circle" :disabled="delDisabled" @click="del">删除</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				test:true,
				checkList:[],
				favList: [],
				rightText: '管理',
				showEdit: false,
				delDisabled: false,
				checkedAll: false
			}
		},
		onLoad() {
			this.init();
		},
		methods: {
			init() {
				const baseApi = this.baseApi;
				this.$u.get('user/favorite/list').then(res => {
					let favList = res;
					let checkList = new Array()
					for (var index in favList) {
						const item = favList[index]; 
						checkList[index] = true
						item.goods.img = baseApi + '/file/getImgStream?idFile=' + item.goods.pic;
						
					}
					this.checkList = checkList 
					this.checkedAll = true
					this.favList = favList
				});
			},
			formatPrice(price) {
				return (price / 100).toFixed(2);
			},
			back() {
				this.$u.route({
					type: 'navigateBack',
					delta: 1
				})
			},
			onClickRight() {
				this.showEdit = !this.showEdit
				this.rightText = this.rightText === '管理' ? '完成' : '管理'
			},
			changeCheckBox(e) {
				this.delDisabled = false;
			},
			checkAll() {
				console.log('checkedAll',this.checkedAll)
				if (this.checkedAll) {
					this.delDisabled = true;
					for (var i in this.checkList) {
						this.checkList[i] = false;
					}
				} else {
					this.delDisabled = false;
					let checkList = this.checkList
					for (var i in checkList) {
						checkList[i] = true;
					}
					this.checkList = checkList
					console.log("checkList",checkList)
				}
				this.checkedAll = !this.checkedAll; 
			},
			del(){
				let idChechkedArr = new Array();
				for(const i in this.checkList){
					if(this.favList[i]){
						idChechkedArr.push(this.favList[i].id);
					}
				}
				if(idChechkedArr.length == 0){
					this.$u.toast('请选择要移出收藏的商品');
					return ;
				} 
				this.$u.post('user/favorite/dislikeBatch',idChechkedArr).then( res => {
					this.$u.toast('已取消收藏');
					this.init();
				});
			},
			toDetail(id) {
				this.$u.route({
					url: '/pages/goods/goods',
					params: {
						id: id
					}
				})
			},
			toHome() {
				this.$u.route({
					type: 'switchTab',
					url: '/pages/shop/index'
				});
			
			}
		}
	}
</script>


<style lang="scss" scoped>
	.wrap {
		padding: 0rpx 30rpx;
	}

	.gl-body {
		padding-bottom: 80rpx;
	}

	.gl-title {
		padding: 20rpx;
	}

	.gl-img {
		padding: 30rpx;
	}

	.gl-name {
		font-size: 26rpx;
	}

	.gl-descript {
		font-size: 20rpx;
	}

	.gl-price {
		font-size: 24rpx;
		color: #FA3534;
	}

	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.link-text {
		font-size: 28rpx;
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
		}

		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;
			margin-right: 60rpx;

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
</style>
