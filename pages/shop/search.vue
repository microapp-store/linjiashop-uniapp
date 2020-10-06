<template>
	<view>
		<u-navbar :custom-back="toHome">
			<view class="slot-wrap">
				<u-search placeholder="搜商品名称" v-model="listQuery.keyword" :clearabled="true" @search="search" @custom="search" @clear="clear"></u-search>
			</view>
		</u-navbar>
		<u-divider v-if="noResult">热门商品</u-divider>
		<view>
			<view class="gl-body">
				<u-row v-for="(item,index) in goodsList" :key="index">
					<u-col :span="4" class="gl-img">
						<u-image width="170rpx" height="170rpx" :src="item.img" @click="toDetail(item.id)"></u-image>
					</u-col>
					<u-col :span="8" @click="toDetail(item.id)">
						<view class="gl-name">{{item.name}}</view>
						<view class="gl-descript">{{item.descript}}</view>
						<view class="gl-price">￥{{formatPrice(item.price)}}</view>
					</u-col>
				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				noResult: true,
				goodsList: [],
				listQuery: {
					page: 1,
					limit: 20,
					keyword: ''
				},
			}
		},
		onLoad() {
			this.init();
		},
		methods: {
			init() {
				const baseApi = this.baseApi;
				this.$u.get('/goods/searchHot').then(res => {
					this.noResult = true;
					let list = res;
					for (const index in list) {
						const item = list[index];
						item.img = baseApi + '/file/getImgStream?idFile=' + item.pic;
					}
					this.goodsList = list;
				});
			},
			formatPrice(price) {
				return (price / 100).toFixed(2);
			},

			toHome() {
				this.$u.route({
					type: 'switchTab',
					url: '/pages/shop/index'
				})
			},
			search() {
				console.log("keyword", this.listQuery.keyword);

				const keyword = this.listQuery.keyword;
				if (keyword == '') {
					this.init();

				} else {

					const page = this.listQuery.page;
					const limit = this.listQuery.limit;
					const baseApi = this.baseApi;
					this.$u.get('goods/search?page=' + page + '&limit=' + limit + '&key=' + keyword).then(res => {
						let list = res.records;
						this.noResult = !list.length > 0;
						for (const index in list) {
							const item = list[index];
							item.img = baseApi + '/file/getImgStream?idFile=' + item.pic;
						}
						this.goodsList = list;
					});
				}
			},
			clear(){
				this.listQuery.keyword='';
				this.init();
			},
			toDetail(id) {
				this.$u.route({
					url: '/pages/goods/goods',
					params: {
						id: id
					}
				})
			},
		}
	}
</script>


<style scoped lang="scss">
	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		flex: 1;
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0 10rpx;
	}

	.gl-body {

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
	}
</style>
