  <template>
  <div>
    <Navbar />
    <CartList />
    <Footer />
  </div>
</template>
  <script>
import CartList from "@/components/Cartlist.vue";
import Footer from "@/components/Navfooter.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar,
    CartList,
    Footer,
  },
};
</script>
  <style scoped>
.cart {
  margin-top: 50px;
}
</style>
