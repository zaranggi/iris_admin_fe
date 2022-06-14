<template>
  <v-navigation-drawer
    app
    clipped
    v-model="DRAWER_STATE"
    :mini-variant="!DRAWER_STATE"
    :width="sidebarWidth"
    :permanent="$vuetify.breakpoint.mdAndUp"
    :temporary="$vuetify.breakpoint.smAndDown"
    :mini-variant-width="sidebarMinWidth"
    :class="{'drawer-mini': !DRAWER_STATE}">
    <!--
    <div class="v-list">
      <a class="v-list-item v-list-item--link grey--text text-sm-h6" target="_blank">IRIS Admin</a>
    </div>-->

    <v-list dense nav>
      <template >
        <v-list-item two-line class="px-4">
          <v-list-item-avatar>
            <v-img :src="require('@/assets/user.png')" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ users }}</v-list-item-title>
            <v-list-item-subtitle class="caption">{{ username }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
          <v-divider
            dark
            class="my-0"
          ></v-divider>
        <v-list-group 
          v-for="item in getItemMenu"
          :key="item.title"
          v-model="item.active"
          no-action
          color="teal darken-2"
          :active-class="`teal lighten-3`">
            <template v-slot:prependIcon>
              <v-icon size="28" color="teal darken-2"> {{ item.icon }}</v-icon>
            </template>
            <template v-slot:activator >
              <v-list-item-content >
                <v-list-item-title
                  class="grey--text--darken-2">
                    {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item 
              v-for="child in item.items"
              :key="child.title"
              :to="child.to" link
              :active-class="`lime lighten-4`"
              >
                <!--<v-list-item-action v-if="child.icon">
                  <v-icon size="">{{ child.icon }}</v-icon>
                </v-list-item-action>-->
                <v-list-item-content>
                  <v-list-item-title class="grey--text--darken-2">
                    {{ child.title }} {{ child.index }}
                  </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-group> 
      </template>
    </v-list>
    </v-navigation-drawer>
</template>

<script>
import {mapActions, mapState} from 'vuex'

  export default {
    props: {
        source: String,
    },
    data(){
      return { 
        sidebarWidth: 270,
        sidebarMinWidth: 96
      }
    },
    computed: {
      ...mapState(['drawer']),
      DRAWER_STATE: {
        get() {
          return this.drawer
        },
        set(newValue) {
          if (newValue === this.drawer) return;
          this.TOGGLE_DRAWER();
        }
      },
      
      getItemMenu() {
        return this.$store.getters.vMenu;
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
      username() {
          let dataUser = this.$store.getters.dataUsers
          if ( Object.keys(dataUser).length !== 0 ) {
            let dataUser = this.$store.getters.dataUsers;
            let h = dataUser.username.toLowerCase();
            return h.replace(/^./, h[0].toUpperCase());
          } else {
            return "";
          }
      },
      
    },
    methods: {
      ...mapActions(['TOGGLE_DRAWER']),
    },
    mounted() {
      this.$store.dispatch("getviewlistmenu")
    }
  }
</script>  
<style src="./Sidebar.scss" lang="scss"/>