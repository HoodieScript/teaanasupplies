<template>
  <section class="contact">
    <div class="container-fluid header-msg">
      <h1 class="text-center font-weight-bold">
        We love to hear your <strong> Questions </strong> &
        <strong> Feedback</strong>
      </h1>
    </div>
    <div class="content-info">
      <div class="d-flex justify-content-center">
        <div class="row">
          <div class="col-lg-6">
            <img class="img im-fluid" src="../assets/Images/TeaAna2.png" />
          </div>
          <div
            class="col-lg-6 form my-auto mx-auto d-flex justify-content-center"
          >
            <form
              method="post"
              @submit.prevent="contactUs"
              class="w-75 align-content-center"
            >
              <h2 class="text-center">Any thoughts? Message us</h2>
              <div class="form-group">
                <input
                  type="email"
                  class="form-control"
                  id="Email"
                  aria-describedby="Email Address"
                  placeholder="Email Address"
                  required
                  v-model="email"
                />
              </div>
              <div class="form-group">
                <textarea
                  name="feedback"
                  class="form-control"
                  rows="7"
                  placeholder="Compose a message here..."
                  required
                  v-model="message"
                ></textarea>
              </div>

              <input
                v-if="savebtn"
                type="submit"
                class="btn btn-sm float-right pl-3 pr-3 text-white"
                style="background-color: #028476; border-radius: 20px"
                value="Send"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  data() {
    return {
      email: "",
      message: "",
      savebtn: true,
    };
  },
  methods: {
    contactUs: async function () {
      const data = await axios.post("https://api.tea-ana.com/v1/auth/contact", {
        email: this.email,
        message: this.message,
      });
      console.log(data);
      this.clear();
      swal(
        "Message sent!",
        "Thank you for letting us know your concern!",
        "success"
      );
    },
    clear: function () {
      (this.savebtn = true), (this.email = ""), (this.message = "");
    },
  },
};
</script>
