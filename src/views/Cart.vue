  <template>
  <div>
    <Navbar />
    <CartList />
    <Footer />
    <TermsandConditions />
    <RefundPolicy />
    <PrivacyPolicy />
  </div>
</template>
  <script>
import CartList from "@/components/Cartlist.vue";
import Footer from "@/components/Navfooter.vue";
import Navbar from "@/components/Navbar.vue";
import PrivacyPolicy from "@/components/PrivacyPolicy.vue";
import RefundPolicy from "@/components/RefundPolicy.vue";
import TermsandConditions from "@/components/TermsCondition.vue";

export default {
  components: {
    Navbar,
    CartList,
    Footer,
    TermsandConditions,
    RefundPolicy,
    PrivacyPolicy,
  },
};
</script>
  <style scoped>
.cart {
  margin-top: 50px;
}
</style>
