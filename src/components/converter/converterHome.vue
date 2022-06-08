<template>
  <v-app id="appConvert">
    <v-parallax
      class="parallaxConverter"
      dark
      src="../../../public/backgroundConverter.jpg"
    >
      <v-container class="containerApp pa-6">
        <h1 class="text-center mb-4">Currency Converter</h1>

        <v-container blue-grey lighten-5 d-flex align-center>
          <v-container
            class="container-two"
            d-flex
            flex-column
            align-center
            ma-2
          >
            <v-btn
              :color="color"
              blue
              darken-1
              id="swap"
              @click="switchValues()"
            >
              {{ swap }}
            </v-btn>
            <h4 id="baseValue">
              {{ formula }} {{ currency_one }} = {{ amountTwo }}
              {{ currency_two }}
            </h4>
          </v-container>
        </v-container>

        <v-container d-flex justify-center>
          <v-btn id="swap" :color="color" sm-9 @click="$router.push('/')">
            {{ comeBack }}
          </v-btn>
        </v-container>
      </v-container>
    </v-parallax>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "converterHome",

  props: {
    color: {
      type: String,
      default: "blue darken-3 white--text",
    },
  },
  data() {
    return {
      swap: "swap",
      comeBack: "come back to calculator",
      data: [],
      currency_one: "EUR",
      currency_two: "USD",
      rate: "",
      amountOne: 1,
      amountTwo: 0,
    };
  },

  computed: {
    formula() {
      return this.$store.state.formula;
    },
  },

  methods: {
    calculateResults() {
      console.log(this.formula);
      axios
        .get(`http://www.floatrates.com/daily/${this.currency_one}.json`)
        .then((response) => {
          const rate = response.data[this.currency_two.toLowerCase()].rate;
          this.rate = rate.toFixed(3);
          this.amountTwo = (Number(this.formula) * rate).toFixed(3);
        });
    },

    switchValues() {
      const temp = this.currency_one;
      this.currency_one = this.currency_two;
      this.currency_two = temp;
      this.calculateResults();
    },
  },

  mounted() {
    this.calculateResults();
  },
};
</script>


<style lang="scss">
</style>