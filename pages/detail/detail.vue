<template>
	<view>

		<view ref="bgimg" class="top" :style="{background:`url(${detail.v_pic})`}"></view>
		<view class='detail-mask'></view>
		  <view class='detail-info'>
		    <image :src="detail.v_pic" class='detail-img' mode="aspectFill"></image>
		    <view class='detail'>
		      <view class='detail-nm'>{{detail.v_name}}</view>
		      <view class="vactor">主演：{{detail.v_actor}}</view>
		      <view class='sc'>{{detail.v_score}}分</view>
		      <view>{{detail.v_publisharea}}</view>
		      <view>导演：{{detail.v_director}}</view>
			   <view>年代：{{detail.v_publishyear}}</view>
		    </view>
		  </view>
		  <view class='desc'><rich-text :nodes="detail.body"></rich-text></view>
		  <view class="flex flex-wrap flex-pack-start">
			  <u-tag style="flex:0 0 30% ;margin: 12rpx;text-align: center;" v-for="item in m3u8List" :key="item.url" :text="item.name" type="success" @click="tagClick(item.url)" />
			  
		  </view>
		  
		 
	</view>
</template>


<script>
	import {
		getDetailsByVid,
		getUrlsByVid
	} from '../../api/test.js'
	export default {
		data() {
			return {
				detail: {},
				m3u8List:[]
			}
		},
		methods: {
			tagClick(url){
				console.log(url)
				uni.navigateTo({
						url: `/pages/video/video?src=${url}`
				})
			},
			DetailsByVid(vid) {
				getDetailsByVid(vid).then(res => {
					this.detail = res[0];
					let bgi = res[0].v_pic;


				})
			},
			getUrls(vid){
				getUrlsByVid(vid).then(res => {
					this.m3u8List = res.m3u8List				
				
				})
			}
		},
		onLoad(o) {

			this.DetailsByVid(o.vid)
            this.getUrls(o.vid)
		}
	}
</script>

<style lang="scss">
	.top {
		position: relative;
		top: 0;
		height: 400rpx;
		width: 750rpx;
		-webkit-filter: blur(40rpx);
		filter: blur(40rpx);
		opacity: 0.7;

	}

	.detail-mask {
		position: absolute;
		width: 100%;
		height: 400rpx;
		background-color: #333;
		top: 0;
		left: 0;
		z-index: -1;
	}

	
	.detail-info {
	  display: flex;
	  position: absolute;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 400rpx;
	  padding: 20rpx;
	}
	
	.detail {
	  flex-grow: 1;
	  line-height: 60rpx;
	  
	 
	   
	
	}
	
	.detail view {
	  color: #fff;
	  font-size: 24rpx;
	  
	}
	
	.detail .detail-nm {
	  font-size: 40rpx;
	  font-weight: 700;
	  width: 450rpx !important;
	  overflow: hidden; // 溢出隐藏
	  text-overflow: ellipsis; // 显示省略号
	  white-space: nowrap; // 不换行
	}
	
	.detail .sc {
	  color: #fc0;
	  font-size: 36rpx;
	  font-weight: 700;
	}
	.detail-img {
	  width: 280rpx !important;
	  height: 100%;
	  margin-right: 24rpx;
	}
	.vactor{
		 width: 450rpx !important;
		overflow: hidden; // 溢出隐藏
		text-overflow: ellipsis; // 显示省略号
		white-space: nowrap; // 不换行
		 
		
	}	
	.desc {
	  padding: 20rpx;
	  color: #555;
	  font-size: 24rpx;
	}
</style>
