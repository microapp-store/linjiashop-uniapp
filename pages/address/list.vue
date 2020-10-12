<template>
	<view class="wrap">
		<u-radio-group>
		<view class="item" v-for="(res, index) in addrList" :key="res.id">
			<u-row>
				<u-col :span="1" v-if="choose">
						<u-radio @change="chgRadio(res.id)" :name="res.id"></u-radio>
				</u-col>
				<u-col :span="choose==true?11:12">
					<view class="top">
						<view class="name">{{ res.name }}</view>
						<view class="phone">{{ res.tel }}</view>
						<view class="tag" v-if="res.isDefault">
							<text class="red">默认</text>
						</view>
					</view>
					<view class="bottom">
						{{res.wholeAddressInfo}}
						<u-icon name="edit-pen" :size="40" color="#999999" @click="toEditAddr(res.id)"></u-icon>
					</view>
				</u-col>
			</u-row>
		</view>
		</u-radio-group>
		<view class="addSite" @tap="toAddAddr" v-if="!choose">
			<view class="add">
				<u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon>新建收货地址
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				siteList: [],
				addrList: [],
				choose: false
			};
		},
		onLoad(e) {
			if (e.choose) {
				this.choose = true;
			}
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				this.$u.get('user/address/queryByUser').then(res => {
					this.addrList = res;
				});
			},

			toEditAddr(id) {
				console.log('id', id);
				this.$u.route({
					url: '/pages/address/address',
					params: {
						id: id
					}
				})
			},
			toAddAddr() {
				this.$u.route('/pages/address/address');
			},
			chgRadio(id){
				console.log("id",id);
				uni.setStorageSync('chooseAddrId', id);
				this.$u.route({
					type:'navigateBack',
					delta:1
				})
				return true;
				
			}
			
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 0rpx 30rpx;

		.item {
			width:100%;
			padding: 40rpx 20rpx;

			.top {
				display: flex;
				font-weight: bold;
				font-size: 34rpx;

				.phone {
					margin-left: 60rpx;
				}

				.tag {
					display: flex;
					font-weight: normal;
					align-items: center;

					text {
						display: block;
						width: 60rpx;
						height: 34rpx;
						line-height: 34rpx;
						color: #ffffff;
						font-size: 20rpx;
						border-radius: 6rpx;
						text-align: center;
						margin-left: 30rpx;
						background-color: rgb(49, 145, 253);
					}

					.red {
						background-color: red
					}
				}
			}

			.bottom {
				display: flex;
				margin-top: 20rpx;
				font-size: 28rpx;
				justify-content: space-between;
				color: #999999;
			}
		}

		.addSite {
			display: flex;
			justify-content: space-around;
			width: 600rpx;
			line-height: 100rpx;
			position: absolute;
			bottom: 30rpx;
			left: 80rpx;
			background-color: red;
			border-radius: 60rpx;
			font-size: 30rpx;

			.add {
				display: flex;
				align-items: center;
				color: #ffffff;

				.icon {
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
