<template>
	<view class="wrap">
		<view style="text-align: center;">
			<image class="logo" src="/static/img/logo.jpg" mode="widthFix"></image>
			<view class="version">alpha2020</view>
			<view class="bottom">
				<view>版权信息</view>
				<view>本项目遵循MIT开源协议，意味着您无需支付任何费用，也无需授权，即可将linjiashop-uniapp应用到您的产品中</view>

			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.logo {
		margin-top:50rpx;
		width: 300rpx;
		height: 300rpx;
	}

	.version {
		margin-top: 30rpx;
		color: $u-light-color
	}

	.bottom {
		position: absolute;
		bottom: 100rpx;
		width: 100%;
		line-height: 2;
		color: $u-light-color;
	}
</style>
