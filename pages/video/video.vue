<template>
	<view>
		<video id="myVideo" :src=src style="width: 750rpx;"
		 ></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
              src:''
			};
		},
		onLoad(o) {
			this.src  = o.src
		}
	}
</script>

<style lang="scss">

</style>
