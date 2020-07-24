<template>
  <div>
    <app-bar></app-bar>
    <v-form>
      <v-text-field
        v-model="sol"
        single-line
        type="number"
        required
        label="Sol days"
      />
      <v-select
        v-model="rover"
        :items="rovers"
        label="Rover"
        required
      ></v-select>
      <v-btn color="success" class="mr-4" @click="getRoverInfo">
        Ver info
      </v-btn>
    </v-form>
    <div v-if="cameras">
      <div v-for="(count, camera) in camerasCount" :key="camera">
        {{ camera }} : {{ count }}
      </div>
    </div>
    <v-card
      v-for="photo in roverData.photos"
      :key="photo.id"
      class="mx-auto"
      max-width="400"
    >
      <v-img class="white--text align-end" height="200px" :src="photo.img_src">
        <v-card-title>{{ photo.camera.full_name }}</v-card-title>
      </v-img>
      <v-card-subtitle class="pb-0">{{ photo.earth_date }}</v-card-subtitle>
      <v-card-text class="text--primary">
        <div>{{ photo.id }}</div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import AppBar from "@/components/AppBar";
export default {
  data() {
    return {
      sol: "1000",
      rover: "Curiosity",
      rovers: ["Curiosity", "Spirit", "Opportunity"]
    };
  },
  computed: {
    ...mapState(["roverData"]),
    ...mapGetters(["cameras"]),
    camerasCount() {
      let summary = {};
      this.cameras.map(camera => {
        summary[camera] = (summary[camera] || 0) + 1;
      });
      return summary;
    }
  },
  methods: {
    ...mapActions(["getRoverData"]),
    getRoverInfo() {
      const payload = { sol: this.sol, rover: this.rover };
      this.getRoverData(payload);
    }
  },
  components: {
    AppBar
  }
};
</script>

<style>
</style>