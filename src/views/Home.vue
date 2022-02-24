<template>
  <div>
		<img src="https://placekitten.com/375/200" class="banner-img" />
		<SearchContainer class="search-box" />
	</div>
</template>

<script setup lang="ts">
	import SearchContainer from '@/components/Home/SearchContainer.vue'
</script>

<style lang="less">
	.banner-img {
		width: 100%;
		height: 200px;
	}
	.search-box {
		margin: -60px 15px 0;
		z-index: 5;
	}
</style>
