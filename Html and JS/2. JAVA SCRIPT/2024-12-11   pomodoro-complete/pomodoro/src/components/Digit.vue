<template>
  <svg
    class="digit"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="420.5px"
    height="826px"
    viewBox="0 0 420.5 826"
    enable-background="new 0 0 420.5 826"
    xml:space="preserve"
  >
    <path
      :class="{ active: '02356789'.includes(data) }"
      class="digit-a"
      fill="#E60012"
      d="M397.167,16c0,6.627-5.373,12-12,12h-347c-6.627,0-12-5.373-12-12v-4c0-6.627,5.373-12,12-12h347
	c6.627,0,12,5.373,12,12V16z"
    />
    <path
      :class="{ active: '2345689'.includes(data) }"
      class="digit-b"
      fill="#E60012"
      d="M397.167,415c0,6.627-5.373,12-12,12h-347c-6.627,0-12-5.373-12-12v-4c0-6.627,5.373-12,12-12h347
	c6.627,0,12,5.373,12,12V415z"
    />
    <path
      :class="{ active: '0235689'.includes(data) }"
      class="digit-c"
      fill="#E60012"
      d="M397.167,814c0,6.627-5.373,12-12,12h-347c-6.627,0-12-5.373-12-12v-4c0-6.627,5.373-12,12-12h347
	c6.627,0,12,5.373,12,12V814z"
    />
    <path
      :class="{ active: '045689'.includes(data) }"
      class="digit-d"
      fill="#E60012"
      d="M16,28c6.627,0,12,5.373,12,12v347c0,6.627-5.373,12-12,12h-4c-6.627,0-12-5.373-12-12V40
	c0-6.627,5.373-12,12-12H16z"
    />
    <path
      :class="{ active: '0268'.includes(data) }"
      class="digit-e"
      fill="#E60012"
      d="M16,427c6.627,0,12,5.373,12,12v347c0,6.627-5.373,12-12,12h-4c-6.627,0-12-5.373-12-12V439
	c0-6.627,5.373-12,12-12H16z"
    />
    <path
      :class="{ active: '01234789'.includes(data) }"
      class="digit-f"
      fill="#E60012"
      d="M408.5,28c6.627,0,12,5.373,12,12v347c0,6.627-5.373,12-12,12h-4c-6.627,0-12-5.373-12-12V40
	c0-6.627,5.373-12,12-12H408.5z"
    />
    <path
      :class="{ active: '013456789'.includes(data) }"
      class="digit-g"
      fill="#E60012"
      d="M408.5,427c6.627,0,12,5.373,12,12v347c0,6.627-5.373,12-12,12h-4c-6.627,0-12-5.373-12-12V439
	c0-6.627,5.373-12,12-12H408.5z"
    />
    <circle :class="{ active: data === ':' }" fill="#E60012" cx="207" cy="213.5" r="34.498" />
    <circle :class="{ active: data === ':' }" fill="#E60012" cx="207" cy="612.5" r="34.498" />
  </svg>
</template>

<script setup>
defineProps({
  data: {
    type: String,
    default() {
      return ''
    },
  },
  color: {
    type: String,
    default() {
      return 'white'
    },
  },
})
</script>

<style scoped lang="sass">
.digit
  width: 100px
  height: 197px
  margin: 7px
path, circle
  fill: transparent
  &.active
    // v-bind 把 CSS 的值和 Vue 的變數綁定
    fill: v-bind(color)
</style>
