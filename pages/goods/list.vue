<template>
	<view>
		<u-tabs :list="vuex_navlist" :is-scroll="false" :current="activeNav" @change="changeNav"></u-tabs>
		<u-swiper :list="banners" @click="clickBanner"></u-swiper>

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
				activeNav: 1,
				banners: [],
				originBanners: [],
				goodsList: [],
				listQuery: {
					page: 1,
					limit: 50,
					idCategory: undefined
				},
				total: 0
			}
		},
		onLoad(option) {
			this.activeNav = option.itemId;
			console.log("index", this.activeNav);
			this.init();
		},
		methods: {
			init() {
				this.getBanners(this.activeNav);
				this.getGoods(this.activeNav);
			},
			async getBanners(categoryIndex) {
				const baseApi = this.baseApi;
				let bannerList = null;
				let navList = this.vuex_navlist;
				if (navList.length == 0) {
					let ret = await this.$u.get('category/list');
					navList = ret;
					console.log("response", navList);
					navList.splice(0, 0, {
						name: '推荐',
						id: '0'
					})
					this.$u.vuex('vuex_navlist', navList);
				}
				console.log('navList', navList);
				for (const i in navList) {
					if (navList[i].id == categoryIndex) {
						bannerList = navList[i].bannerList
					}
				}
				this.originBanners = bannerList;

				let imgList = new Array()
				for (let i = 0; i < bannerList.length; i++) {
					imgList.push({
						image: baseApi + '/file/getImgStream?idFile=' + bannerList[i].idFile
					})
				}
				this.banners = imgList
			},
			changeNav(index) {
				console.log("index", index);
				this.activeNav = index;
				if (index == 0) {
					this.$u.route({
						type: 'switchTab',
						url: '/pages/shop/index'
					})
				} else {
					this.getBanners(index);
					this.getGoods(index);
				}

			},
			clickBanner(index) {
				let banners = this.originBanners;
				for (let i = 0; i < banners.length; i++) {
					if (index == i) {
						let url = ''
						let page = banners[i].page
						if (page != '') {
							if (page.indexOf('http') === 0) {
								url = page
							} else {
								url = '/pages/goods/' + banners[i].page
							}
						}
						if (banners[i].param != '' && banners[i].param != null) {
							const param = JSON.parse(banners[i].param);
							this.$u.route({
								url: url,
								params: param
							});
						}

						if (url.startsWith("http")) {
							window.location.href = url;
						}

					}
				}
			},
			getGoods(idCategory) {
				this.listQuery['idCategory'] = idCategory
				const page = this.listQuery.page;
				const limit = this.listQuery.limit;
				const baseApi = this.baseApi;
				this.$u.get('goods/queryGoods?page=' + page + '&limit=' + limit + '&idCategory=' + idCategory).then(res => {
					let list = res.records
					this.total = res.total
					for (var index in list) {
						const item = list[index]
						item.img = baseApi + '/file/getImgStream?idFile=' + item.pic
					}
					this.goodsList = list

				}).catch((err) => {
					Toast(err)
				})
			},
			formatPrice(price) {
				return (price / 100).toFixed(2);
			},
			toDetail(id){
				this.$u.route({
					url:'/pages/goods/goods',
					params:{
						id:id
					}
				})
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
