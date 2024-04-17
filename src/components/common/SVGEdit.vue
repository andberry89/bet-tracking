<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#ff8317"
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
        opacity="0.15"
        d="M8 16H12L18 10L14 6L8 12V16Z"
        fill="#ff8317"
      />
      <path
        d="M14 6L8 12V16H12L18 10M14 6L17 3L21 7L18 10M14 6L18 10M10 4L4 4L4 20L20 20V14"
        stroke="#ff8317"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
</template>
<script>
export default {
  name: 'SVGEdit',
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
