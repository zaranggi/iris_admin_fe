<template>
  <v-app style="background: #1b98e0">
    <!-- <v-app> -->
    <v-main>
      <v-container fill-height fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12 rounded-lg" color="#e8f1f2">
              <div class="d-flex flex-column justify-center align-center">
                <v-card-title primary-title> IRIS | Administrator</v-card-title>
              <v-card-subtitle>
                Indomaret Reporting Information System
              </v-card-subtitle>
              </div>
              <v-card-text class="pa-4">
                <v-form ref="form" class="mx-2" lazy-validation>
                  <v-text-field
                    dense
                    outlined
                    ref="username"
                    v-model="username"
                    :rules="[() => !!username || 'This field is required']"
                    placeholder="User name"
                    required
                  />
                  <v-text-field
                    dense
                    outlined
                    ref="password"
                    v-model="password"
                    :rules="[() => !!password || 'This field is required']"
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Password"
                    required
                    @keydown.enter="login"
                    @click:append="showPassword = !showPassword"
                  />
                </v-form>
              </v-card-text>
              <v-divider />
              <v-card-actions class="pt-4 pb-4 pl-6 pr-6" color="#fffbfc">
                <v-btn
                  dark
                  block
                  align-center
                  justify-center
                  color="#006494"
                  @click="login"
                  >Login
                </v-btn>
              </v-card-actions>
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
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
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
          
          this.errorMessages = "Username / Password Anda salah";
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
};
</script>
