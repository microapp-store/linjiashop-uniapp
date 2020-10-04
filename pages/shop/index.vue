<template>
	<view>
		<u-tabs :list="navList" :is-scroll="false" :current="activeNav" @change="changeNav"></u-tabs>
		<u-row gutter="16">
			<u-col style="padding:0px;" v-for="(topic,index) in topicList" :key="index" :span="(index+3)%3===0?6:3">

				<u-image width="100%" height="180rpx" :src="topic.img" @click="toTopic(topic.id)"></u-image>
			</u-col>
		</u-row>
		<view>
			<view class="gl-title">热门推荐</view>
			<view class="gl-body">
				<u-row v-for="(item,index) in hotList" :key="index">
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

		<view>
			<view class="gl-title">新品推荐</view>
			<view class="gl-body">
				<u-row v-for="(item,index) in newList" :key="index">
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
				navList: [],
				activeNav: 0,
				newList: [],
				hotList: [],
				topicList: []
			}
		},
		onLoad() {
			this.init()
		},
		onShow(){
			this.activeNav=0;
		},
		methods: {
			init() {
				this.$u.get('category/list').then(res => {
					let navList = res
					navList.splice(0, 0, {
						name: '推荐',
						id: '0'
					})
					this.navList = navList;
					this.$u.vuex('vuex_navlist', navList);
				});
				this.queryGoods();
				this.queryTopic();
			},
			changeNav(index) {
				console.log("index", index);
				this.activeNav = index;
				if (index > 0) {
					this.$u.route({
						url: '/pages/goods/list',
						params: {
							itemId: index
						}
					});
				}
			},
			queryGoods() {
				const baseApi = this.baseApi;
				this.$u.get('goods/searchNew').then(res => {
					let list = res
					for (const index in list) {
						const item = list[index]
						item.img = baseApi + '/file/getImgStream?idFile=' + item.pic
					}
					this.newList = list
				});
				this.$u.get('/goods/searchHot').then(res => {
					let list = res;
					for (const index in list) {
						const item = list[index];
						item.img = baseApi + '/file/getImgStream?idFile=' + item.pic;
					}
					this.hotList = list;
				});

			},
			queryTopic() {
				const baseApi = this.baseApi;
				this.$u.get('topic/list').then(res => {
					let list = res;
					for (const index in list) {
						const item = list[index];
						item.img = baseApi + '/file/getImgStream?idFile=' + item.article.img;
					}
					this.topicList = list;
				})
			},
			toTopic(id) {
				this.$u.route({
					url: '/pages/topic/detail',
					params: {
						id: id
					}
				})
			},
			toDetail(id) {
				this.$u.route({
					url: '/pages/goods/goods',
					params: {
						id: id
					}
				})
			},
			formatPrice(price) {
				return (price / 100).toFixed(2);
			}
		}

	}
</script>

<style>
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
	}
</style>
