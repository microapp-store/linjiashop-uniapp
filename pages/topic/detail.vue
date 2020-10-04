<template>
	<view>
		<view class="title">{{item.article.title}}</view>
		<view class="u-content">
			<u-parse :html="item.article.content"></u-parse>
		</view>
		<view class="gl">
			<u-row gutter="16" >
				<u-col v-for="(item,index) in goodsList" :key="index" :span="6" text-align="center" class="i-item" @click="toGoods(item.id)">
					<view class=" u-flex u-row-center">
						<u-image width="100%" height="200rpx" :src="item.img" ></u-image>
					</view>
					<view class="i-title">{{item.name}}</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				item: {
					article: {
						title: ''
					}
				},
				goodsList: []
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.init();
		},
		methods: {
			init() {
				const baseApi = this.baseApi;
				this.$u.get('topic/' + this.id).then(res => {
					this.item = res
					let goodsList = res.goodsList
					for (const i in goodsList) {
						goodsList[i].img = baseApi + '/file/getImgStream?idFile=' + goodsList[i].pic
					}
					this.goodsList = goodsList
				});
			},
			toGoods(id) {
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

<style>
	.title {
		font-size: 28rpx;
		font-weight: bold;
		text-align: center;
	}
	.i-item{
		margin-top:30rpx;
	}
	.i-title {
		margin-top:10rpx;
		font-size:24rpx;
		padding:20rpx;
		background-color: #979595;
	}
</style>
