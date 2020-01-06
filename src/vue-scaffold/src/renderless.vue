<template>
        <div>
		<timer v-slot:boo={i}> start from 100：{{i+100}}</timer><br>
        <timer v-slot:boo={i}> start from   0：{{i}}</timer></div>
</template>

<script>
const timer = {
  render() {
    return this.$scopedSlots.boo({
      i: this.i
    });
  },
  data() {
    return {
      i: 0
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.i++;
    }, 1000);
  }
};

export default {
  components: { timer }
};
</script>