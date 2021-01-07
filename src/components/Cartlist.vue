<template >
  <section class="container-fluid">
    <div class="cart row border">
      <div class="col-lg-8 p-4 row">
        <div class="col-lg-6">
          <h1 class="text-left mb-3 font-weight-bold">
            <label>Your</label> <label>Cart</label>
          </h1>
        </div>
        <div class="col-lg-6">
          <input
            type="text"
            class="form-control"
            v-model="search"
            placeholder="ex. Sealer Machine"
          />
        </div>
        <div
          class="modal fade"
          id="updatecart"
          tabindex="-1"
          aria-labelledby="updatecart"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="newAddons">Update Order</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form
                  class="row"
                  method="post"
                  @submit.prevent="updateCart(eachofcart.id)"
                >
                  <!--    <div class="form-group">
                    <img
                      class="img img-fluid w-75 m-auto border-0 form-control"
                      alt="Tea-ana-product"
                      style="height: auto"
                      :src="path + eachofcart.supply.imagePath"
                      fluid
                    />
                  </div> -->
                  <!--   <div class="form-group text-left">
                    <small class="pb-3">Product Name</small>
                    <input
                      type="text"
                      class="form-control"
                      v-model="eachofcart.name"
                    />
                  </div> -->
                  <!--                   <div class="form-group text-left">
                    <small class="pb-3">Product Price</small>
                    <input
                      type="text"
                      class="form-control"
                      v-model="eachofcart.price"
                    />
                  </div>
 -->
                  <div class="form-group text-left">
                    <small class="pb-3">Product Quantity</small>
                    <input
                      type="number"
                      class="form-control"
                      v-model.number="eachofcart.quantity"
                    />
                  </div>

                  <div class="form-group">
                    <input
                      type="submit"
                      class="btn btn-sm float-right pl-3 pr-3 text-white"
                      style="background-color: #028476; border-radius: 20px"
                      value="update"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="scrollable-2 overflow-auto">
          <table class="table mycart sticky table-borderless text-center">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody v-for="(cartlist, idx) in normalfilter" :key="idx">
              <tr class="mt-2 shadow-sm" style="border-radius: 20px">
                <td>
                  <img
                    class="img img-fluid w-75 m-auto border-0 form-control"
                    alt="Tea-ana-product"
                    style="height: 120px; width: 200px"
                    :src="path + cartlist.supply.imagePath"
                    fluid
                  />
                </td>
                <td>{{ cartlist.supply.name }}</td>
                <td>{{ cartlist.supply.price }}</td>
                <td>{{ cartlist.quantity }}</td>
                <td>
                  <button
                    class="btn"
                    data-toggle="modal"
                    data-target="#updatecart"
                    @click="eachCart(cartlist.id)"
                  >
                    <i class="far fa-edit"></i>
                  </button>
                  <button class="btn" @click="Deletecart(cartlist.id)">
                    <i class="far fa-times-circle"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-lg-4 minvh-100 form p-4">
        <h1 class="text-dark">Payment</h1>
        <form class="p-4" @submit.prevent="Paymentsubmit()">
          <div class="form-group text-left mb-3">
            <p class="text-dark">Shipping Address</p>
            <small class="text-secondary"
              >Note: Place your current Address / Landmark</small
            >
            <textarea
              class="form-control"
              name="feedback"
              rows="5"
              placeholder="State your address here..."
              required
              v-model="address"
            ></textarea>
          </div>
          <div class="form-group text-left">
            <p class="text-dark">Payment Method</p>

            <select
              class="form-control custom-select"
              v-model="paymentMethod"
              required
            >
              <option value="Cash">Cash</option>
              <option value="Paymaya">Paymaya</option>
              <option value="G-cash">G-cash</option>
            </select>
            <small>Note: Send an exact amount of payment</small>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span
                  class="input-group-text bg-transparent border-0 font-weight-bold"
                  id="basic-addon1"
                  >Total</span
                >
              </div>
              <input
                type="number"
                class="border-0 text-right form-control bg-white number"
                readonly
                placeholder="0.00"
                aria-label="Username"
                aria-describedby="basic-addon1"
                v-model.number="totalItem"
              />
            </div>
            <div class="input-group mb-3" v-if="totalItem > 0">
              <input
                type="submit"
                value="Check out"
                class="btn btn-sm mx-auto w-50 border-0 text-white"
                style="background-color: #028476"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
import $ from "jquery";
axios.defaults.withCredentials = true;
/* import $ from "jquery"; */
export default {
  data() {
    return {
      path: "https://api.tea-ana.com/uploads/",
      cartlists: [],
      eachofcart: [],
      /* data fields */
      imagePath: null,
      qty: null,
      name: null,
      price: null,
      quantity: null,
      account: null,
      /* payment info */
      address: null,
      paymentMethod: null,
      total: null,

      search: "",
    };
  },
  async created() {
    setInterval(
      function () {
        this.getSuppliescart();
      }.bind(this),
      1000
    );
  },
  methods: {
    getProfile: async function () {
      try {
        const res = await axios.get("https://api.tea-ana.com/v1/auth/profile", {
          withCredentials: true,
        });
        this.account = res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getSuppliescart() {
      let response = await axios.get(
        `https://api.tea-ana.com/v1/cart/supplies` //endpoint
      );
      this.cartlists = response.data.cart;
    },

    Deletecart: async function (id) {
      axios
        .delete(`https://api.tea-ana.com/v1/cart/supplies/item/` + id)
        .then((res) => {
          console.log(res);
          swal("Record Delete!", "New changes are applied!", "success");
          this.getSuppliescart();
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async eachCart(id) {
      axios
        .get(`https://api.tea-ana.com/v1/cart/supplies/item/` + id)
        .then((response) => {
          this.eachofcart = response.data.cart;
        });
      console.log(this.eachofcart);
    },
    updateCart: async function (id) {
      axios
        .put(`https://api.tea-ana.com/v1/cart/supplies/item/` + id, {
          quantity: this.eachofcart.quantity,
        })
        .then((response) => {
          console.log(response);
          $("#updatecart").modal("hide");
          swal("Order Updated!", "New changes are applied!", "success");
          this.getSuppliescart();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    Paymentsubmit: async function () {
      axios
        .post("https://api.tea-ana.com/v1/orders/supplies", {
          address: this.address,
          paymentmMethod: this.paymentMethod,
          total: this.totalItem,
        })
        .then((response) => {
          console.log(response);
          $("#product-cart").modal("hide");
          swal(
            "Thank you!",
            "Waiting for Order Confirmation. Please see your order in your Profile !",
            "success"
          );
          this.getSuppliescart();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
  computed: {
    normalfilter: function () {
      return this.cartlists.filter((cartlist) => {
        return cartlist.supply.name.match(new RegExp(`${this.search}`, "gi"));
      });
    },
    totalItem: function () {
      let sum = 0;
      this.cartlists.forEach(function (cartlist) {
        sum +=
          parseFloat(cartlist.supply.price) * parseFloat(cartlist.quantity);
      });

      return sum;
    },
  },

  mounted() {},
};
</script>

<style>
.table-image th,
td {
  vertical-align: middle;
}

table td:nth-child(2),
td:nth-child(3),
td:nth-child(4) {
}
.cart {
  padding-top: 120px;
}

.payments {
  border-bottom: 2px solid grey;
}

.cart h1 label:nth-child(odd) {
  color: #5cd85c;
}
.cart h1 label:nth-child(even) {
  color: #028476;
}
.scrollable-2::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #444;
  border-radius: 10px;
  background-color: #f5f5f5;
  position: absolute;
}

.scrollable-2::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

.scrollable-2::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #444;
}
@media only screen and (max-width: 992px) {
  table.mycart td:nth-child(1),
  th:nth-child(1) {
    display: none !important;
  }
  table td {
    font-size: 10px;
  }
  table td button {
    font-size: 10px;
  }
  table.thead.tr.mycart th:nth-child(1) {
    display: none !important;
  }
}
.scrollable-2 {
  height: 60vh;
}

.scrollable-2 table.sticky th {
  position: sticky;
  top: 0;
  background-color: white;
}
.scrollable-2 table {
  table-layout: fixed;
}
tr td {
  padding-top: 3%;
  padding-bottom: 3%;
  vertical-align: middle;
  align-self: center;
  align-content: center;
  align-items: center;
}
.table > tbody > tr > td {
  vertical-align: middle;
}
</style>
