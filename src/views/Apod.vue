<template>
  <div>
    <app-bar></app-bar>
    <v-main>
      <v-row>
        <v-col cols="6" class="mx-auto">
          <v-date-picker
            v-model="date"
            v-bind:max="today"
            color="green lighten-1"
            header-color="primary"
            @click:date="getInfo"
          ></v-date-picker>
        </v-col>
        <v-col cols="6" class="mx-auto">
          <v-card class="mx-auto" max-width="400">
            <v-img
              v-if="apod.media_type == 'image'"
              class="white--text align-end"
              height="200px"
              :src="apod.url"
            >
              <v-card-title>{{ apod.title }}</v-card-title>
            </v-img>
            <iframe v-else width="320" height="240" :src="apod.url"></iframe>
            <v-card-subtitle class="pb-0">{{ apod.date }}</v-card-subtitle>
            <v-card-text class="text--primary">
              <div>{{ apod.explanation }}</div>
            </v-card-text>
            <v-card-actions> </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      today: new Date().toISOString().substr(0, 10),
      date: new Date().toISOString().substr(0, 10)
    };
  },
  computed: {
    ...mapState(["apod"])
  },
  components: {
    AppBar
  },
  methods: {
    ...mapActions(["getApod"]),
    getInfo() {
      this.getApod(this.date);
    }
  }
};
</script>

<style>
</style>