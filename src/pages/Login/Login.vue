<template>
  <v-app>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="7" class="main-part d-none d-md-none d-lg-flex">
          <div class="d-flex">
            <v-img src="@/assets/logo.png" contain></v-img>
            <p>Indomaret Reporting Information System</p>
          </div>
        </v-col>
        <v-col cols="12" lg="5" class="login-part d-flex align-center justify-center">
          <v-row no-gutters class="align-start">
            <v-col cols="12" class="login-part d-flex align-center justify-center flex-column">
              <div class="login-wrapper pt-md-4 pt-0">
                <v-tabs grow>
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab :href="`#tab-login`">
                    IRIS | Administrator
                  </v-tab> 

                  <v-tab-item :value="'tab-login'" >
                    <v-form>
                      <v-container>
                        <v-row class="flex-column"> 
                          <v-form  ref="form">
                            <v-col>
                              <v-text-field
                                ref="username"
                                v-model="username"
                                :rules="[() => !!username || 'This field is required']"
                                placeholder="User name"
                                required
                              ></v-text-field>
                              <v-text-field
                                  ref="password"
                                  v-model="password"
                                  :rules="[() => !!password || 'This field is required']"
                                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                  :type="showPassword ? 'text' : 'password'"
                                  placeholder="Password"
                                  required
                                  @keydown.enter="login"
                                  @click:append="showPassword = !showPassword"
                              ></v-text-field>

                            </v-col>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                  class="text-capitalize"
                                  large
                                  color="primary"
                                  @click="login"
                              >
                                Login</v-btn>
                            </v-col>
                          </v-form>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>


                </v-tabs>
              </div>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-footer>
                <div class="primary--text">©2022 <a class="text-decoration-none">IRIS Admin</a>, All rights reserved.</div>
              </v-footer>
            </v-col>
          </v-row>
        </v-col>
         <v-snackbar v-model="snackbar" :timeout="timeout" top>
                {{ errorMessages }}

                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                  >
                    close
                  </v-btn>
                </template>
              </v-snackbar>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

  export default {
    name: 'Login',
    data: function () {
      return {
        username: "",
        password: "",
        errorMessages: "Incorrect login info",
        snackbar: false,
        color: "general",
        showPassword: false,
        timeout: 1000,
      };
    },
    methods: {
      login() {
        if(this.$refs.form.validate()){
          let username = this.username;
          let password = this.password;
          this.$store
            .dispatch("login", { username: username, password: password })
            .then(() => this.$router.push("/"))
            .catch((err) => {
              console.log(err);
              this.errorMessages = err.message;
              this.snackbar = true;
            });
        }else{
            this.errorMessages = "Username / Password tidak boleh kosong";
            this.snackbar = true;
        }
        
      },
    },
    metaInfo() {
      return {
        title: "Super Secret | Login",
      };
    },
  }

</script>

<style src="./Login.scss" lang="scss"/>
