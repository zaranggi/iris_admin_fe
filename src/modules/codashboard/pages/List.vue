<template>  
  <v-sheet elevation="10"> 
    <v-tabs
      v-model="tab"
      background-color="teal accent-4"
      align-with-title
      dark
    >  
      <v-tabs-slider color="yellow accent-2"></v-tabs-slider> 
       <v-tab v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab> 

    </v-tabs> 

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab"> 
            <keep-alive>
              <component v-bind:is="item.content"></component>
            </keep-alive> 
      </v-tab-item>
    </v-tabs-items>

  </v-sheet>
  
</template>

<script> 
import CompHarian from './CompHarian';
import CompBulanan from './CompBulanan';
export default {
  
  components: {
    CompHarian,
    CompBulanan
  },
  data() {
    return {
      tab: null,
      items: [
        { tab: 'Hari ini', content: 'CompHarian' },
        { tab: 'Bulanan', content: 'CompBulanan' }
      ]
    };
  }
};
</script>