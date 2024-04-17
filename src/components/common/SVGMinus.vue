<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#cc0000"
  >
    <g
      id="SVGRepo_bgCarrier"
      stroke-width="0"
    />
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <path
        opacity="0.1"
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        fill="#cc0000"
      />
      <path
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="#cc0000"
        stroke-width="2"
      />
      <path
        d="M9 12H15"
        stroke="#cc0000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
</template>
<script>
export default {
  name: 'SVGMinus',
  props: {
    height: {
      type: String,
      default: '100px',
    },
    width: {
      type: String,
      default: '100px',
    },
  },
}
</script>
