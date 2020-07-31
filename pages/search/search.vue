<template>
	<view>
		<view class="status_bar">
			<view class="top_view">
			</view>
		</view>
		<view class="top-search">
			<u-search height="70" style="padding: 5rpx 30rpx;" placeholder="奥里给干了" @search="search" @change="searchChange"  focus :show-action="false"></u-search>
		</view>
		<view class="guess-view">
			<view class="guess-item" v-for="(item,index) in searchGuessList" :key="index" @click="clickGuessItem(item.v_name)">
				{{item.v_name}}
			</view>
		</view>
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
				fun: null,
				searchGuessList: [],
				index:1
			};
		},
		methods: {
			search(e) {
				uni.navigateTo({
					url: `/pages/searchDetail/searchDetail?name=${e}`
				})
			},
			clickGuessItem(name) {
				uni.navigateTo({
					url: `/pages/searchDetail/searchDetail?name=${name}`
				})
				
			},
			searchGuess(name) {
				searchGuess(name).then(res => {
					
					this.searchGuessList = res
				})
			},
			debounce(fn, wait) {
				if (this.fun !== null) {
					clearTimeout(this.fun)
				}
				this.fun = setTimeout(fn, wait)

			},
			searchChange(e) {

				let that = this
				this.debounce(
					function() {
						that.value = e
					}, 500);
			}
		},
		watch: {
			value(newValue, oldValue) {
				console.log(newValue)
				if (typeof newValue === 'string') {
					if (newValue.trim().length !== 0) {
						this.searchGuess(newValue)
					}
				}
			}
		},
		onNavigationBarButtonTap() {
			console.log(this.value)
		},
		onNavigationBarSearchInputChanged(e) {


		},
		onNavigationBarSearchInputConfirmed() {
			console.log(this.value)
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
		background-color: #FFFFFF;
	}

	.guess-view {}

	.guess-item {
		height: 80rpx;
		text-align: left;
		line-height: 80rpx;
		width: 750rpx;
		padding-left: 50rpx;
		border-bottom: 1rpx solid rgba(191, 191, 191, 0.2);
	}
</style>
