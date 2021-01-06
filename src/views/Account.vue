<template>
  <div v-if="account != null">
    <Navbar />
    <Profile />
  </div>
  <div class="vh-100 d-flex align-items-center" v-else-if="account == null">
    <div class="text-center container">
      <h1>required user to access the page</h1>
    </div>
  </div>
</template>
<script>
import Profile from "../components/Profile.vue";
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import swal from "sweetalert";
import $ from "jquery";
export default {
  components: {
    Profile,

    Navbar,
  },
  data() {
    return {
      componentKey: 0,
      account: null,
    };
  },
  async created() {
    this.getProfile();
  },
  methods: {
    getProfile: async function () {
      try {
        let response = await axios.get(
          "https://api.tea-ana.com/v1/auth/profile/supplies",
          {
            withCredentials: true,
          }
        );
        this.account = response.data.user;
      } catch (error) {
        console.error(error);
      }
    },
    login: async function () {
      axios
        .post(
          "https://api.tea-ana.com/v1/auth/login",
          {
            email: this.email,
            password: this.password,
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response.data.data);
          $("#Loginmodal").modal("hide");
          swal("Account Signed-in!", "You can now order products!", "success");
          this.getProfile();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
};
</script>
