<template>

	<view class="wrap">


		<view class="status_bar">
			<view class="top_view">

			</view>
		</view>
		<view class="top-search" @click="goSearch">
			<u-search disabled height="70" style="padding: 5rpx 30rpx;" placeholder="奥里给干了" :show-action="false"></u-search>
		</view>

		<view class="contentd">

			<u-swiper :list="list" name="v_spic" height="361" @click="swiperClick"></u-swiper>
			<u-sticky h5-nav-height="35" z-index="9999" :offset-top="height">
				<!-- 只能有一个根元素 -->
				<u-tabs name="tname" :list="allType" :current="current" @change="changeTabs"></u-tabs>
			</u-sticky>
			<view class="search-body-item flex" v-for="item in movieList" :key="item.v_id">
				<!-- <image  :src="" mode="aspectFill" lazy-load fade-show></image> -->
				<u-lazy-load class=" detail-img " :image="item.v_pic" threshold="300"></u-lazy-load>
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

		</view>
		<u-empty style="position: relative; top:100rpx" v-if="movieList.length ==0" text="没得这个类型" mode="list"></u-empty>
	</view>

</template>

<script>
	import {
		carousel,
		getAllType,
		randomByType
	} from '../../api/test.js'
	export default {
		data() {
			return {
				list: [],
				allType: [],
				current: 0,
				height: 0,
				tid: 1,
				movieList: []
			}
		},
		onPullDownRefresh() {
			this.randomByType(this.tid)

		},
		onLoad() {
			// #ifdef APP-PLUS
			this.height = plus.navigator.getStatusbarHeight() * 2 + 70;
			// #endif
			this.getCarousel();
			this.getAllType();
			this.randomByType(this.tid)



		},
		// onNavigationBarSearchInputClicked() {
		// 	uni.navigateTo({
		// 		url: `/pages/search/search`
		// 	})

		// },
		methods: {
			goToDetail(vid) {


				uni.navigateTo({
					url: `/pages/detail/detail?vid=${vid}`
				})
			},
			randomByType(type) {
				randomByType(type).then(res => {

					this.movieList = res
					uni.stopPullDownRefresh()
				})
			},
			changeTabs(index) {
				this.current = index
				this.tid = this.allType[index].tid
				this.randomByType(this.tid)
			},
			goSearch() {
				uni.navigateTo({
					url: `/pages/search/search`
				})
			},
			getCarousel() {
				carousel().then(res => {
					this.list = res
				})
			},
			getAllType() {
				getAllType().then(res => {
					console.log(res);
					this.allType = res;
				})
			},
			swiperClick(index) {
				let vid = this.list[index].v_id

				uni.navigateTo({
					url: `/pages/detail/detail?vid=${vid}`
				})

			}
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


	.wrap {}

	.top-search {
		position: fixed;
		top: var(--status-bar-height);
		z-index: 999;
		left: 0;
		right: 0;
		background-color: #FFFFFF;
	}

	.contentd {
		overflow-y: scroll;

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
</style>
