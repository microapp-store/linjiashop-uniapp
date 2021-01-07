<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">			
			<view>
					<u-field v-model="tel" label="账号:" placeholder="输入手机号码"/>
					<u-field v-model="password" type="password" label="密码:" placeholder="输入密码"/>
			</view>
			<button @tap="submit" :style="[inputStyle]" class="getSmsCode">登录</button>
			
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
				this.$u.post('loginByPass?mobile='+this.tel+'&password='+this.password).then(res => {					
					this.$u.vuex('vuex_token', res.token);
					this.$u.vuex('vuex_user', res.user);
					console.log('user',res.user)
					if(res.user.avatar && res.user.avatar !== ''){
						console.log('avatar',this.baseApi+'/file/getImgStream?idFile='+res.user.avatar);
						this.$u.vuex('vuex_avatar',	this.baseApi+'/file/getImgStream?idFile='+res.user.avatar);
					}
					this.$u.route({
						type: 'switchTab',
						url: '/pages/user/profile'
					})
				}).catch( res => {
					console.log("err",res);
					this.$u.toast( res.data.message);
				})
			},
			loginBy(type){
				this.$u.toast('第三方账号登录开发中，敬请期待')
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
			margin: 80rpx auto 0;

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
