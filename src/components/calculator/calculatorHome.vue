<template>
  <v-app id="appMain" app>
    <v-main>
      <calculatorBody >

        <v-item> 
            <h1 class="">Calculator</h1>
          </v-item>
       

        <template v-slot:alongBtn>
          <v-flex pa-2 :class="{ xs3: symbol !== '=' }">
            <v-btn block large @click="$router.push('converter')">
              {{ $store.state.toggle_one }}
            </v-btn>
          </v-flex>
        </template>

      </calculatorBody>
    </v-main>
  </v-app>
</template>

<script>
import calculatorBody from "@/components/calculator/calculatorBody.vue";
export default {
  name: "App",
  components: {
    calculatorBody,
  },
  data: () => ({}),
};
</script>
