<template>
  <v-layout>
    <v-container d-flex text-right>
      <v-layout row wrap>
        <slot>
            
        </slot>

        <calculatorDisplay
          v-bind:formula="formula"
          @changeFormula="changeFormula"
        >
          <template v-slot:calcDisplay>
            <v-flex xs12 class="mb-1 mt-15">
              <v-text-field solo readonly v-model="formula"> </v-text-field>
            </v-flex>
          </template>
        </calculatorDisplay>

        <calculatorButton
          v-for="button in buttons"
          :click-event-name="clickEventName"
          :key="button.id"
          :color="button.colorSymbol"
          :symbol="button.valueSymbol"
          @calculator-button-click="processButtonClick"
        >
          <!-- <template v-slot:calcBotton>
        </template> -->
        </calculatorButton>

        <slot name="alongBtn"></slot>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import calculatorButton from "@/components/calculator/calculatorButton.vue";
import calculatorDisplay from "@/components/calculator/calculatorDisplay.vue";

/* eslint-disable */
let buttons = [
  {
    valueSymbol: 7,
    colorSymbol: "",
  },
  {
    valueSymbol: 8,
    colorSymbol: "",
  },
  {
    valueSymbol: 9,
    colorSymbol: "",
  },
  {
    valueSymbol: "÷",
    colorSymbol: "blue-grey lighten-4",
  },
  {
    valueSymbol: 4,
    colorSymbol: "",
  },
  {
    valueSymbol: 5,
    colorSymbol: "",
  },
  {
    valueSymbol: 6,
    colorSymbol: "",
  },
  {
    valueSymbol: "x",
    colorSymbol: "blue-grey lighten-4",
  },
  {
    valueSymbol: 1,
    colorSymbol: "",
  },
  {
    valueSymbol: 2,
    colorSymbol: "",
  },
  {
    valueSymbol: 3,
    colorSymbol: "",
  },
  {
    valueSymbol: "-",
    colorSymbol: "blue-grey lighten-4",
  },
  {
    valueSymbol: 0,
    colorSymbol: "",
  },
  {
    valueSymbol: ".",
    colorSymbol: "",
  },
  {
    valueSymbol: "=",
    colorSymbol: "blue darken-3 white--text",
  },
  {
    valueSymbol: "+",
    colorSymbol: "blue-grey lighten-4",
  },
  {
    valueSymbol: "AC",
    colorSymbol: "",
  },
  {
    valueSymbol: "CE",
    colorSymbol: "",
  },
];

export default {
  name: "calculatorBody",
  props: {},
  components: {
    calculatorButton,
    calculatorDisplay,
  },

  data() {
    return {
      buttons: buttons,
      clickEventName: "calculator-button-click",
      isLoading: false,
      symbol: "",
      formula: "0",
    };
  },

  methods: {
    // changeFormula(value) {
    //   this.formula = value;
    // },

    processButtonClick(symbol) {
      let validFormula;
      switch (symbol) {
        case "AC":
          return this.setFormula("0");
        case "CE":
          validFormula = this.formula.slice(0, this.formula.length - 1);
          if (validFormula.length === 0) validFormula = "0";
          return this.setFormula(validFormula);
        case "=":
          validFormula = this.formula.replace(/\÷/g, "/").replace(/\x/g, "*");
          return this.setFormula(eval(validFormula) + "");
        default:
          if (this.validateEntry(this.formula, symbol))
            return this.setFormula(this.formula + symbol);
      }
    },
    setFormula(formula) {
      // Should not start with 0
      this.formula = formula.replace(/^[0]*([^0]+)$/, "$1");
    },
    validateEntry(formula, symbol) {
      let expectedFormula = formula + symbol;
      let pattern = "";
      switch (symbol) {
        case ".":
          // More than one .
          if (expectedFormula.match(/\.[\d]*\./)) return false;
          break;
        case "+":
        case "x":
        case "÷":
          // Should not start
          if (expectedFormula === "0" + symbol) return false;

          // Consecutive operators
          pattern = new RegExp(`[\\+\\-\\÷\\x][\\` + symbol + `]`);
          if (expectedFormula.match(pattern)) return false;
          break;
        case "-":
          // -- not allowed, x- or ÷- are ok
          if (expectedFormula.match(/\-\-/)) return false;
          break;
      }
      return true;
    },
  },
  mounted() {
    // Support keyboard entry
    window.addEventListener("keyup", (event) => {
      if (event.key.match(/^[\d\+\-\.\=]$/))
        return this.processButtonClick(event.key);
      if (event.key === "*") return this.processButtonClick("x");
      if (event.key === "/") return this.processButtonClick("÷");
      if (event.key === "Delete") return this.processButtonClick("AC");
      if (event.key === "Backspace") return this.processButtonClick("CE");
      if (event.key === "Enter") return this.processButtonClick("=");
    });
  },
};
</script>
