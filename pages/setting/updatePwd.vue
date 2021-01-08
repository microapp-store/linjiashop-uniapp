<template>
	<view class="wrap">
		<view class="content">
			<u-field v-model="password" type="password" label="新密码" placeholder="请填写新密码">
			</u-field>
			<u-field v-model="rePassword" type="password" label="重复密码" placeholder="请重复填写新密码">
			</u-field>
			<u-field v-model="smsCode" label="验证码" placeholder="请填写验证码">
				<u-button size="mini" slot="right" type="success" :disabled="smsCodeDisabled" @click="getSmsCode">{{codeText}}</u-button>
			</u-field>

		</view>
		<view class="u-m-t-20 u-p-20">
			<u-button @click="submit" type="warning">确定</u-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel: '',
				password: '',
				rePassword: '',
				smsCode: '',
				codeText: '发送验证码',
				smsCodeDisabled: false,
				nums:60,
				clock:undefined
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

				if (this.password != this.rePassword) {
					this.$u.toast('前后密码不一致');
					return;
				}
				this.$u.post('user/updatePassword_v2/' + this.password + '/' + this.smsCode).then(res => {
					this.$u.route({
						type: 'switchTab',
						url: '/pages/user/profile'
					})
				}).catch(res => {
					console.log("err", res);
					this.$u.toast(res.msg);
				})
			}, 
			goPage(url) {
				this.$u.route({
					url: url
				})
			},
			getSmsCode() {
				const user = this.vuex_user;
				this.$u.post('sendSmsCode?mobile=' + user.mobile).then(response => {
					this.smsCodeDisabled = true
					this.codeText = this.nums + '秒后重新获取';
					this.clock = setInterval(this.doLoop, 1000); //一秒执行一次
				})
			},
			doLoop() {
				this.nums--;
				if (this.nums > 0) {
					this.codeText = this.nums + '秒后重新获取';
				} else {
					clearInterval(this.clock); //清除js定时器
					this.codeText = '发送验证码'
					this.smsCodeDisabled = false
					this.nums = 60; //重置时间
				}
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
				padding: 30rpx 30rpx;
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

		}
	}
</style>
