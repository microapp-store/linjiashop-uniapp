<template>
	<view class="wrap">
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="camera" title="头像" @click="openPage('/pages/setting/updateAvatar')" >
					<u-image  slot="right-icon" width="100rpx" height="100rpx" :src="user.wechatHeadImgUrl"></u-image>
				</u-cell-item>
				<u-cell-item icon="account" title="姓名" @click="updateNickName" :value="user.nickName" :arrow="false"></u-cell-item>
				<u-cell-item :icon="user.genderIcon?user.genderIcon:'man'" title="性别" @click="updateGender" :value="user.genderStr"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="lock" title="修改密码" @click="openPage('/pages/setting/updatePwd')"></u-cell-item>
				<u-cell-item icon="phone" title="更换手机" @click="openPage('/pages/setting/updateMobile')" :value="user.mobile"></u-cell-item>

			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="info-circle" title="关于邻家小铺" @click="openPage('/pages/setting/about')"></u-cell-item>
				<u-cell-item icon="file-text" title="在线文档" @click="toDoc"></u-cell-item>

			</u-cell-group>
		</view>
		<view class="bottom u-m-b-80">
			<u-button @click="logout">退出</u-button>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
				user: {
					genderIcon:'man',
				}
			}
		},
		onLoad() {
			this.user.imgUrl = this.vuex_defAvatar;
			this.init();
		},
		methods: {
			init() {
				const user = this.vuex_user;
				console.log('user', user);
				if (user.nickName !== '未登录') {
					console.log('用户已登录');
					if (user.gender == 'female') {
						user.genderStr = '女';
						user.genderIcon = 'woman';
					}

					if (user.gender == 'male') {
						user.genderStr = '男';
						
						user.genderIcon = 'man';
					}
					
					this.user = user;
					
				} else {
					console.log('未登录');
					this.user = user;
				}
				if(!this.user.wechatHeadImgUrl){
					this.user.wechatHeadImgUrl = this.vuex_defAvatar;
				}
				console.log('user2',this.user);
			},
			openPage(url) {
				if(this.user.nickName=='未登录'){
					this.$u.route('/pages/login/login');
					return ;
				}
				this.$u.route({
					url: url
				})
			},
			updateNickName(){
				
			},
			updateGender(){
				
			},
			logout() {
				this.$u.vuex('vuex_token', '');
				this.$u.vuex('vuex_user', {
					nickName: '未登录'
				});
				this.$u.route('/pages/login/login')
			},
			toDoc(){
				this.$u.route('/pages/setting/document')
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #ededed;
	}

	.wrap {
		.bottom {
			position: fixed;
			bottom: 0;
			width: 100%;
		}
	}
</style>
