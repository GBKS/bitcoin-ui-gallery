<template>
	<div class="banner">
		<h1>Welcome to the Bitcoin UI Gallery</h1>
		<p>Your one-stop solution for all Bitcoin UI designs and flows.<br/>Created by <a href="https://bitcoin.design" target="_blank" rel="me">Bitcoin Design</a>. <a href="https://github.com/gbks/bitcoin-ui-gallery" target="_blank" rel="me">Contribute</a>.</p>
	</div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.banner {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5px;
	position: relative;
	padding-bottom: 25px;

	&:after {
		display: block;
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 50px;
		transform: translateX(-50%);
		border-bottom: 1px solid rgba(var(--frontRGB), 0.35);
		pointer-events: none;
	}

	h1 {
		@include mixins.r('font-size', 21, 36);
	}

	p {
		@include mixins.r('font-size', 17, 19);
		text-align: center;
	}
	
	@include mixins.media-query(medium-down) {
		
	}

	@include mixins.media-query(large) {
		
	}
}

</style>
