<template>
<!-- <v-item>
   <slot name="calcBotton"></slot>
</v-item> -->
  <v-flex pa-2 :class="{ xs3: symbol !== '=' }">
        <v-btn :color="color" block large @click="click">
          {{ symbol }}
        </v-btn>
      </v-flex>
</template>

<script>
export default {
  name: "calculatorButton",

  props: {
    symbol: {
      default: "",
    },
    color: {
      type: String,
      default: "grey",
    },
    clickEventName: {
      type: String,
      default: "click",
    },
  },

  methods: {
    click() {
      this.$emit(this.clickEventName, this.symbol);
    },
  },
 
};
</script>
