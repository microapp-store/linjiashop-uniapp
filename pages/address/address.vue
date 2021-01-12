<template>
	<view class="wrap">
		<view class="top">
			<view class="item">
				<view class="left">收货人</view>
				<input type="text" placeholder-class="line" placeholder="请填写收货人姓名" v-model="address.name" />
			</view>
			<view class="item">
				<view class="left">手机号码</view>
				<input type="text" placeholder-class="line" placeholder="请填写收货人手机号" v-model="address.tel" />
			</view>
			<view class="item" @tap="showRegionPicker">
				<view class="left">所在地区</view>
				<input disabled type="text" placeholder-class="line" placeholder="省市区县、乡镇等" v-model="addressShowValue" />
			</view>
			<view class="item address">
				<view class="left">详细地址</view>
				<textarea type="text" placeholder-class="line" placeholder="街道、楼牌等" v-model="address.addressDetail" />
				</view>
			
		</view>
		<view class="bottom">			 
			<view class="default">
				<view class="left">
					<view class="set">设置默认地址</view>
					<view class="tips">提醒：每次下单会默认推荐该地址</view>
				</view>
				<view class="right"><u-switch v-model="address.isDefault" @change = "changeDefault"></u-switch></view>
			</view>
			
		</view>
		<u-button type="error" shape="circle" @click="save">保存</u-button>
		<br>
		<u-button type="default" shape="circle" v-if="id!=''" @click="del">删除</u-button>
		<u-picker mode="region" ref="uPicker" v-model="show" :area-code="defaultRegion" @confirm="confirmArea" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			choose:true,
			show: false,
			id:'',
			address:{isDefault:false},
			defaultRegion:['','','']
		};
	},
	computed:{
		addressShowValue(){			
			if(this.address.province){
			return this.address.province+' '+this.address.city+' '+this.address.district;
			}
		}
	},
	onLoad(option){
		this.id = option.id 
		if(option.choose){
			this.choose = option.choose
		}
		if(this.id){
			this.init()
		}else{
			this.id = ''
			//显示默认的地区
			this.defaultRegion = ["11", "1101", "110101"]
		}
	},
	methods: {
		init(){
			this.$u.get('user/address/'+this.id).then( res => {
				const code1 = res.areaCode.substr(0,2)
				const code2 = res.areaCode.substr(0,4)
				const code3 = res.areaCode
				this.defaultRegion = [code1,code2,code3]
				this.address = res
			});
		},
		setDefault() {},
		showRegionPicker() {
			this.show = true
		},
		confirmArea(e){
			this.address.areaCode = e.area.value
			//设置选择器默认值
			this.defaultRegion = [e.province.value,e.city.value,e.area.value]
			//设置输入框值
			this.address =   Object.assign({},this.address)
			this.address.province = e.province.label
			this.address.city = e.city.label
			this.address.district = e.area.label
		},
		changeDefault(e){
			if(this.address.id){
				this.$u.post('user/address/'+this.address.id+'/'+e).then( res => {
					this.$u.toast(e?'设置默认地址':'取消默认地址')
				})
			}
		},
		save(){
			this.$u.post('user/address/save',this.address).then( res => {
				if(this.choose){
					let idCarts = uni.getStorageSync('idCarts')
					if (idCarts && idCarts !== '') {
						uni.setStorageSync('chooseAddrId', res.id);
						 this.$u.route({
						 	url:'/pages/checkout/checkout',
						 	params:{
						 		ids:idCarts
						 	}
						 })
					}else{
						this.$u.route('/pages/address/list')
					}
					
				}else{
					this.$u.route('/pages/address/list')
				}
			})
		},
		del(){
			this.$u.delete('user/address/'+this.address.id).then( res => {
				this.$u.route('/pages/address/list')
			})
		}
	}
};
</script>

<style lang="scss" scoped>
 
.wrap { 
	padding:0rpx 30rpx;
	.top { 
		padding: 22rpx;
		.item {
			display: flex;
			font-size: 32rpx;
			line-height: 100rpx;
			align-items: center;
			border-bottom: solid 2rpx $u-border-color;
			.left {
				width: 180rpx;
			}
			input {
				text-align: left;
			}
		}
		
		.address {
			padding: 20rpx 0;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
		}
		.site-clipboard {
			padding-right: 40rpx;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
			.clipboard {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				color: $u-tips-color;
				height: 80rpx;
				.icon {
					margin-top: 6rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.bottom {
		margin-top: 20rpx;
		padding: 40rpx;
		padding-right: 0;
		background-color: #ffffff;
		font-size: 28rpx;
		.tag {
			display: flex;
			.left {
				width: 160rpx;
			}
			.right {
				display: flex;
				flex-wrap: wrap;
				.tags {
					width: 140rpx;
					padding: 16rpx 8rpx;
					border: solid 2rpx $u-border-color;
					text-align: center;
					border-radius: 50rpx;
					margin: 0 10rpx 20rpx;
					display: flex;
					font-size: 28rpx;
					align-items: center;
					justify-content: center;
					color: $u-content-color;
					line-height: 1;
				}
				.plus {
					//padding: 10rpx 0;
				}
			}
		}
		.default {
			margin-top: 50rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: solid 2rpx $u-border-color;
			line-height: 64rpx;
			.tips {
				font-size: 24rpx;
			}
			.right {
			}
		}
	}
}
</style>
