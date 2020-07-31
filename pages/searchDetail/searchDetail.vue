<template>
	<view>
		<view class="status_bar">
			<view class="top_view">
			</view>
		</view>
		<view class="top-search" @click="goSearch">
			<u-search height="70" style="padding: 5rpx 30rpx;" disabled v-model="value" @search="search" :show-action="false"></u-search>
		</view>
		<scroll-view scroll-y class="ssssss" @scrolltolower="search" id="height" :style="'height:' + height + 'px ;' ">
			 <u-empty style="position: relative; top:100rpx" v-if="movieList.length ==0" text="找不到影片" mode="search "></u-empty>
			<view class="search-body-item flex" v-for="item in movieList" :key="item.v_id">
				<image class=" detail-img " :src="item.v_pic" mode="aspectFill"></image>
				<view class=" movie-name flex flex-v flex-pack-start">
					<view class="text">
						{{item.v_name}}
					</view>
					<view style="font-size: 30rpx;">
						豆瓣评分：{{item.v_score}}
					</view>
					<view style="font-size: 20rpx;" v-if="item.v_note">
						<u-tag :text="item.v_note" type="success" size="mine" />
					</view>
					<view>
						<u-rate disabled :value="item.v_score/2"></u-rate>
					</view>
				</view>

				<u-button type="success" style="margin-top: 100rpx;" @click="goToDetail(item.v_id)">详情</u-button>

			</view>
		</scroll-view>
		
		
		<!-- 	<view class="search-body">

		</view> -->
	</view>
</template>

<script>
	import {
		searchGuess,
		search
	} from '../../api/test.js'
	export default {
		data() {
			return {
				value: '',
				index: 0,
				movieList: [],
				height: 0
			};
		},


		methods: {
			goSearch() {
				uni.navigateBack()
			},
			search() {

				if (this.movieList.length % 18 === 0 && this.movieList.length != 0) {
					this.index = this.index + 1
				} else if (this.movieList.length > 0) {
					return

				}
				search(this.value, this.index).then(res => {
					this.movieList.push(...res)
				})
			},
			goToDetail(vid) {


				uni.navigateTo({
					url: `/pages/detail/detail?vid=${vid}`
				})
			}


		},
		onLoad(e) {
			this.value = e.name;
			console.log(e.name);
			this.search()
			let that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.height = res.windowHeight
				}
			});
		}


	}
</script>

<style lang="scss">
	.status_bar {

		height: calc(75rpx + var(--status-bar-height));
		width: 100%;
		background-color: #F8F8F8;
	}

	.top_view {
		height: calc(75rpx + var(--status-bar-height));
		width: 100%;
		position: fixed;
		background-color: #F8F8F8;
		top: 0;
		z-index: 999;
	}

	.top-search {
		position: fixed;
		top: var(--status-bar-height);
		z-index: 999;
		left: 0;
		right: 0;

	}

	.search-body-item {
		height: 300rpx;
		border-bottom: 1rpx solid rgba(191, 191, 191, 0.5);
		border-top: 1rpx solid rgba(191, 191, 191, 0.5);
	}

	.detail-img {
		height: 100%;
		width: 200rpx;
		margin-right: 24rpx;
	}

	.movie-name {
		color: #666;
		font-size: 40rpx;
		font-weight: bolder;
		width: 350rpx;

		.text {
			overflow: hidden; // 溢出隐藏
			text-overflow: ellipsis; // 显示省略号
			white-space: nowrap; // 不换行
		}

		view {
			padding: 10rpx 0;
		}
	}

	.ssssss {

		box-sizing: border-box;
	}
</style>
