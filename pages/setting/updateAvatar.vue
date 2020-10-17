<template>
	<view class="wrap">
		<view class="u-flex u-row-center">
			<u-avatar :src="pic" size="140"></u-avatar>

		</view>
		<view class="u-flex u-row-center u-margin-top-20 ">
			<u-upload :action="action" :deletable="false" :disabled="disabled" max-count="1" :custom-btn="true" :header="header" @on-success="uploadSuccess" @on-error="uploadError" >
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="camera" size="50"></u-icon>
				</view>
			</u-upload>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				disabled:false,
				header: {
					Authorization: ''
				},
				action: '',
				pic: ''
			}
		},
		onLoad() {
			this.pic = this.vuex_avatar;
			this.header.Authorization = this.vuex_token;
			this.action = this.baseApi + '/user/uploadAvatar'; 
		},
		methods: {
			uploadSuccess(data) {
				const avatar =this.baseApi+'/file/getImgStream?idFile='+data.data.realFileName;
				this.$u.vuex('vuex_avatar',avatar);
				this.pic =avatar;
				this.disabled = true;
			},
			uploadError() {
				this.$u.toast('上传头像失败');
			}
		}
	}
</script>

<style lang="scss" scoped> 
</style>
