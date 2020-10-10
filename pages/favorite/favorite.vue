<template>
	<view class="wrap">
		<u-navbar :custom-back="back" title="喜欢的商品">

			<view class="navbar-right" slot="right">
				<view class="link-text" @click="onClickRight">
					{{rightText}}
				</view>
			</view>
		</u-navbar>
		<view class="gl-body">
			<u-row v-for="(item,index) in favList" :key="index">
				<u-col :span="1" v-if="showEdit">
					<u-checkbox @change="changeCheckBox" v-model="item.checked" shape="circle"></u-checkbox>
				</u-col>
				<u-col :span="4" class="gl-img">
					<u-image width="170rpx" height="170rpx" :src="item.goods.img" @click="toDetail(item.goods.id)"></u-image>
				</u-col>
				<u-col :span="showEdit?7:8" @click="toDetail(item.goods.id)">
					<view class="gl-name">{{item.goods.name}}</view>
					<view class="gl-descript">{{item.goods.descript}}</view>
					<view class="gl-price">￥{{formatPrice(item.goods.price)}}</view>
				</u-col>
			</u-row>
		</view>
		<view class="navigation" v-if="showEdit">
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
				favList: [],
				rightText: '管理',
				showEdit: false,
				delDisabled: true,
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
					for (var index in favList) {
						const item = favList[index];
						item.checked = false;
						item.goods.img = baseApi + '/file/getImgStream?idFile=' + item.goods.pic;
					}
					this.favList = favList;
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
				if (this.checkedAll) {
					this.delDisabled = true;
					for (var i in this.favList) {
						this.favList[i].checked = false;
					}
				} else {
					this.delDisabled = false;
					for (var i in this.favList) {
						this.favList[i].checked = true;
					}
				}
				this.checkedAll = !this.checkedAll; 
			},
			del(){
				let idChechkedArr = new Array();
				for(const i in this.favList){
					if(this.favList[i].checked){
						idChechkedArr.push(this.favList[i].id);
					}
				}
				if(idChechkedArr.length == 0){
					this.$u.toast('请选择要移出收藏的商品');
					return ;
				}
				console.log('ids',idChechkedArr);
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
</style>
