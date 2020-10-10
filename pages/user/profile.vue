<template>
	
	<view class="wrap">
		 
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{vuex_user.nickName}}</view>
				<view class="u-font-14 u-tips-color" v-if="vuex_user.nickName !== '未登录'">小铺ID:{{vuex_user.mobile}}</view>
				<view class="u-font-14 u-tips-color" v-if="vuex_user.nickName == '未登录'" @click="toLogin">点击登录邻家小铺账号</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="list" title="我的订单" @click="openPage('/pages/order/list')"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="bell" title="收货地址"></u-cell-item>
				<u-cell-item icon="star" @click="openPage('/pages/favorite/favorite')" title="喜欢的商品"></u-cell-item>
				<u-cell-item icon="integral" title="我的积分"></u-cell-item>
				<u-cell-item icon="coupon" title="我的优惠券"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置"></u-cell-item>
				<u-cell-item icon="list" title="组件" @click="openPage('/pages/example/components')"></u-cell-item>
				<u-cell-item icon="setting" title="工具" @click="openPage('/pages/example/js')"></u-cell-item>
				<u-cell-item icon="grid-fill" title="模板" @click="openPage('/pages/example/template')"></u-cell-item>
			</u-cell-group>
		</view>
	 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'https://uviewui.com/common/logo.png',
				show:true
			}
		},
		methods: {
			openPage(url){
				this.$u.route({
					url: url
				})
			},
			toLogin(){
				this.$u.route({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>


<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
</style>
