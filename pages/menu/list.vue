<template>
	<view class="u-wrap">
		<view class="u-search-box">
			<view class="u-search-inner">
				<u-icon name="search" color="#909399" :size="28"></u-icon>
				<u-input class="u-search-text" type="text" height="50" @click="toSearch" />
			</view>
		</view>
		<view class="u-body-wrap">
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
			<u-loadmore :status="status" :load-text="loadText" style="margin-top:30rpx;" />

		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				idCategory: undefined,
				goodsList: [],
				listQuery: {
					page: 1,
					limit: 20,
					idCategory: undefined
				},
				total: 0,
				status: 'loadmore',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '没有更多了'
				}
			}
		},
		onLoad(option) {
			this.idCategory = option.idCategory
			this.init()
		},
		onReachBottom() {
			this.listQuery.page = this.listQuery.page + 1
			this.getGoods(this.idCategory)
		},
		methods: {
			init() {
				this.getGoods(this.idCategory)
			},
			toSearch() {
				this.$u.route({
					url: '/pages/shop/search'
				})
			},

			getGoods(idCategory) {
				this.status = 'loading'
				this.listQuery['idCategory'] = idCategory
				const page = this.listQuery.page
				const limit = this.listQuery.limit
				const baseApi = this.baseApi;
				this.$u.get('goods/queryGoods?page=' + page + '&limit=' + limit + '&idCategory=' + idCategory).then(res => {
					let list = res.records
					this.total = res.total
					if (list.length < limit) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore'
					}
					for (var index in list) {
						const item = list[index]
						item.img = baseApi + '/file/getImgStream?idFile=' + item.pic
						this.goodsList.push(item)
					}

				}).catch((err) => {
					Toast(err)
				})
			},
			formatPrice(price) {
				return (price / 100).toFixed(2)
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
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 10rpx 30rpx;
	}


	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 24rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
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
</style>
