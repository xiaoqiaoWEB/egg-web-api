<template>
  <div>
    about {{a | getName}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      a: 2
    }
  }
}
</script>
