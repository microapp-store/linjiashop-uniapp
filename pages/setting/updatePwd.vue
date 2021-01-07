<template>
	<view class="wrap">
		<view class="content"> 		 
			<u-field v-model="password" label="新密码" placeholder="请填写新密码">
			</u-field>
			<u-field v-model="rePassword" label="重复密码" placeholder="请重复填写新密码">
			</u-field>
			<u-field v-model="smsCode" label="验证码" placeholder="请填写验证码">
				<u-button size="mini" slot="right" type="success" @click="getSmsCode">{{codeText}}</u-button>
			</u-field>

		</view>
		<view class="u-m-t-20 u-p-20">
			<u-button @click="submit" type="warning" >确定</u-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel: '',
				password: '',
				rePassword:'',
				smsCode: '',
				codeText: '发送验证码'
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

				if (this.password!=this.rePassword) {
					this.$u.toast('前后密码不一致');
					return;
				}
				this.$u.post('sendSmsCode?mobile=' + this.tel).then(res => {
					this.$u.route({
						url: '/pages/login/smsCode',
						params: {
							mobile: this.tel,
							result: res
						}
					})
				}).catch(res => {
					console.log("err", res);
					this.$u.toast(res.data.message);
				})
			},
			loginBy(type) {
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
			margin: 50rpx 50rpx;
			 
			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				padding:30rpx 30rpx;
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}
 
		} 
	}
</style>
