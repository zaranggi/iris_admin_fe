<template>
  <v-app-bar
    class="main-header"
    height="45"
    fixed
    style="background: linear-gradient(90deg, rgba(0,76,85,0.6782912994299282) 0%, rgba(0,161,140,1) 40%, rgba(0,205,169,1) 100%);" dark>
    <v-btn icon class="mx-1" @click.stop="TOGGLE_DRAWER">
      <template v-if="DRAWER_STATE">
        <v-icon  style="font-size: 28px">mdi-arrow-left</v-icon>
      </template>
      <template v-else>
        <v-icon style="font-size: 28px">mdi-menu</v-icon>
      </template>
    </v-btn>
    <v-toolbar-title>
      <span class="logo-icon">
        <v-img
            lazy-src="../../assets/logo.png"
            max-height="150"
            max-width="200"
            src="../../assets/logo.png"
          ></v-img>         
      </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    
    <v-menu
      min-width="180"
      offset-y
      bottom
      left
      nudge-bottom="10">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mr-0"
            icon
            v-bind="attrs"
            v-on="on">
            <v-icon
              style="font-size: 28px"
              color="amber accent-4">mdi-account</v-icon>
            </v-btn>
        </template>
        <v-list >
          
          <div class="subtitle-2 grey--text text--darken-2 font-weight-bold px-4">{{ this.users }}</div>
          
          <div class="d-flex justify-center my-3">
            <v-btn
              width="50%"
              medium
              color="red"
              class="text-capitalize"
              @click="logout">Sign Out
            </v-btn>
          </div>
        </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import {mapActions, mapState} from 'vuex' 

  export default {
    name: 'Header',
    
    data: () => ({
      
    }),
    computed: {
      ...mapState(['drawer']),
      DRAWER_STATE :{
        get() {
          return this.drawer
        },
      },
      users() {
        let dataUser = this.$store.getters.dataUsers
        if ( Object.keys(dataUser).length !== 0 ) {
          let dataUser = this.$store.getters.dataUsers;
          let h = dataUser.nama.toLowerCase();
          return h.replace(/^./, h[0].toUpperCase());
        } else {
          return "";
        }
    },
    },
    methods: {
      ...mapActions([ 'TOGGLE_DRAWER' ]),
      logout() {
        this.$store.dispatch("logout").then(() => this.$router.push("/login"));
      },
    }
  };
</script>

<style src="./Header.scss" lang="scss"></style>
