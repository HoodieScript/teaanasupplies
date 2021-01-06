<template>
  <div>
    <Navbar />
    <Supply />
    <Contact />
    <Footer />
    <PrivacyPolicy />
    <RefundPolicy />
    <TermsandConditions />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Supply from "@/components/Supplylist.vue";
import Contact from "@/components/Contact.vue";
import Footer from "@/components/Navfooter.vue";
import PrivacyPolicy from "@/components/PrivacyPolicy.vue";
import RefundPolicy from "@/components/RefundPolicy.vue";
import TermsandConditions from "@/components/TermsCondition.vue";
import $ from "jquery";
export default {
  mounted() {
    function smooth_scroll_to(elem) {
      var offset = 1500;

      offset = $(elem).offset().top - 60;

      $("html, body").animate(
        {
          scrollTop: offset,
        },
        500,
        "swing"
      );
    }

    $(".nav ul li a").click(function (e) {
      e.preventDefault();
      var elem = $(this).attr("href");
      smooth_scroll_to(elem);
    });
  },
  components: {
    Navbar,
    Supply,

    Contact,
    Footer,
    PrivacyPolicy,
    RefundPolicy,
    TermsandConditions,
  },
};
</script>
<style scoped>
@import "../assets/CSS/web.css";
</style>
