<template>
	<view class="wrap">
		<view class="content">
			<view class="title">密码登录</view>
			<u-form-item>
			<u-input   type="number" v-model="tel" placeholder="请输入手机号/账号" />
			</u-form-item>
			<u-form-item>
			<u-input   type="password" v-model="password" placeholder="请输入密码" />
			</u-form-item>
			<button @tap="submit" :style="[inputStyle]" class="getSmsCode">登录</button>
			<view class="alternative">
				<view class="password" @click="goPage('/pages/login/login')">手机号登录</view>
				<view class="issue">遇到问题</view>
			</view>
		</view>
		<view class="bottom">
			<view class="hint">
				登录代表同意
				<text class="link" @click="goPage('/pages/login/userProtocol')">邻家小铺用户协议</text>、
				<text class="link" @click="goPage('/pages/login/privateProtocol')">隐私政策，</text>
				并授权使用您的邻家小铺账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel: '',
				password: ''
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				if (this.tel && this.tel.length == 11 && this.tel.startsWith('1')) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		methods: {
			submit() {

				if (!(this.tel && this.tel.length == 11 && this.tel.startsWith('1'))) {
					this.$u.toast('请输入正确手机号');
					return;
				}
				this.$u.post('loginByPass?mobile=' + this.tel + '&password=' + this.password).then(res => {
					this.$u.vuex('vuex_token', res.token);
					this.$u.vuex('vuex_user', res.user);
					console.log('user', res.user)
					if (res.user.avatar && res.user.avatar !== '') {
						console.log('avatar', this.baseApi + '/file/getImgStream?idFile=' + res.user.avatar);
						this.$u.vuex('vuex_avatar', this.baseApi + '/file/getImgStream?idFile=' + res.user.avatar);
					}
					this.$u.route({
						type: 'switchTab',
						url: '/pages/user/profile'
					})
				}).catch(res => {
					console.log("err", res);
					this.$u.toast(res.data.message);
				})
			},
			goPage(url) {
				this.$u.route({
					url: url
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 0rpx auto;
			padding-top: 80rpx;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getSmsCode {
				margin-top: 30rpx;
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.bottom {
			position: absolute;
			bottom: 120rpx;

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}

	}
</style>
