<template>
  <v-app>
    <v-img :src="apod.url" min-height="100%">
      <v-card width="400px" class="mx-auto my-5">
        <v-card-title class="pb-0">
          <h1 class="mx-auto mb-5">NASA APP</h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Usuario"
              prepend-icon="mdi-account-circle"
              v-model="user"
            />
            <v-text-field
              label="Contraseña"
              :type="showPassword ? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              v-model="password"
            />
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-img>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Firebase from "firebase";
export default {
  name: "Home",
  data: () => ({
    user: "",
    password: "",
    showPassword: false
  }),
  computed: {
    ...mapState(["apod"])
  },
  methods: {
    ...mapActions(["getApod"]),
    login() {
      Firebase.auth()
        .signInWithEmailAndPassword(this.user, this.password)
        .then(() => {
          this.$router.push("/apod");
        })
        .catch(() => {
          alert("no no noooooo");
        });
    }
  },
  created() {
    this.getApod();
  }
};
</script>
