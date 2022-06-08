<template>
  <v-container d-flex>
    <slot name="calcDisplay"></slot>
  </v-container>
</template>


<script>
export default {
  name: "calculatorDisplay",

  props: {
    formula: {
      type: String,
      default: "",
    },
    clickEventName: {
      type: String,
      default: "click",
    },
  },

  data() {
    return {};
  },
  destroyed() {
    this.$store.commit('changeFormula', this.formulaInput);
  },
  computed: {
    formulaInput: {
      get() {
        return this.formula;
      },

      set(value) {
        this.$emit('changeFormula', value)
      }
    },
  },
  methods: {
    click() {
      this.$emit(this.clickEventName, this.symbol);
    },
  },
};
</script>
