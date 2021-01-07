<template>
	<view class="wrap">
		<view class="key-input">
			<view class="title">输入验证码</view>
			<view class="tips">验证码已发送至 {{maskMobile}}</view>
			<u-message-input :focus="true" :value="value" @change="change" @finish="finish" mode="bottomLine" :maxlength="maxlength"></u-message-input>
			<text :class="{ error: error }">验证码错误，请重新输入</text>
			<!-- <view class="captcha">
				<text :class="{ noCaptcha: show }" @tap="noCaptcha">收不到验证码点这里</text>
				<text :class="{ regain: !show }">{{ second }}秒后重新获取验证码</text>
			</view> -->
		</view>
	</view>
</template>

<script>
	import util from "@/common/util"
	export default {
		data() {
			return {
				mobile: '',
				maskMobile: '',
				maxlength: 4,
				value: '',
				second: 3,
				show: false,
				error: false
			};
		},
		computed: {},
		onLoad(option) {
			this.mobile = option.mobile
			this.maskMobile = util.maskMobile(this.mobile)
			const res = option.result
			if (res !== 'true') {
				this.$u.toast('测试环境请输入短信验证码：' + res, 3000);
			}


		},
		methods: {
			// 收不到验证码选择时的选择
			noCaptcha() {
				uni.showActionSheet({
					itemList: ['重新获取验证码', '接听语音验证码'],
					success: function(res) {

					},
					fail: function(res) {

					}
				});
			},
			// change事件侦听
			change(value) {
				// console.log('change', value);
			},
			// 输入完验证码最后一位执行
			finish(value) {
				const params = {
					mobile: this.mobile,
					smsCode: value
				}

				this.$u.post('loginOrReg?mobile=' + this.mobile + '&smsCode=' + value).then(res => {
					this.$u.vuex('vuex_token', res.token);
					this.$u.vuex('vuex_user', res.user);
					//优先展示手动上传的头像
					if (res.user.avatar && res.user.avatar !== '') {
						this.$u.vuex('vuex_avatar', this.baseApi + '/file/getImgStream?idFile=' + res.user.avatar);
					} else {
						if (res.user.wechatHeadImgUrl && res.user.wechatHeadImgUrl !== '') {
							//如果拉取到用户微信头像，则展示微信头像
							this.$u.vuex('vuex_avatar', res.user.wechatHeadImgUrl);
						}
					}

					this.$u.route({
						type: 'switchTab',
						url: '/pages/user/profile'
					})
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 80rpx;
	}

	.box {
		margin: 30rpx 0;
		font-size: 30rpx;
		color: 555;
	}

	.key-input {
		padding: 30rpx 0;

		text {
			display: none;
		}

		.error {
			display: block;
			color: red;
			font-size: 30rpx;
			margin: 20rpx 0;
		}
	}

	.title {
		font-size: 50rpx;
		color: #333;
	}

	.key-input .tips {
		font-size: 30rpx;
		color: #333;
		margin-top: 20rpx;
		margin-bottom: 60rpx;
	}

	.captcha {
		color: $u-type-warning;
		font-size: 30rpx;
		margin-top: 40rpx;

		.noCaptcha {
			display: block;
		}

		.regain {
			display: block;
		}
	}
</style>
