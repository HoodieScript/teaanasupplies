<template>
  <section class="container-fluid shop p-0">
    <div class="header-msg vh-auto w-100">
      <h1 class="text-center font-weight-bold">
        <strong>Best </strong> <strong>Deals </strong>at
        <strong>Tea ana </strong>
        <strong>Supplies Shop</strong>
      </h1>
    </div>
    <div class="container min-vh-100">
      <!--       {{ category }} {{ search }} {{ type }} {{ sort }}
 -->
      <div class="w-100 filters">
        <b-form-input
          v-model="search"
          placeholder="ex. Shaker, Jiggler"
          class="col-2 m-1 d-inline fill"
        >
        </b-form-input>
        <!-- 
        <b-form-select
          v-model="type"
          :options="options2"
          class="col-2 m-1 d-inline fill"
        ></b-form-select>
 -->
        <b-form-select
          v-model="sort"
          :options="options3"
          class="col-2 m-1 d-inline fill"
        ></b-form-select>

        <!-- <b-button variant="secondary" @click="searchProd()">Search</b-button> -->
      </div>

      <div class="row d-flex pt-5 pb-5 justify-content-center">
        <div
          v-for="supply in filter"
          :key="supply.id"
          img-alt="Image"
          img-top
          tag="article"
          style=""
          class="m-3 border-0 card items"
        >
          <label
            class="card-title p-3 text-dark text-left form-control border-0 font-weight-bold"
            >{{ supply.name }}</label
          >
          <div class="card-body">
            <img
              class="img img-fluid w-75 m-auto border-0 form-control"
              alt="Tea-ana-product"
              style="height: 200px"
              :src="path + supply.imagePath"
              fluid
            />

            <div class="order form-control border-0">
              <label class="text-dark float-left align-self-center">
                ₱{{ supply.price }}
              </label>
              <button
                id="show-btn"
                data-toggle="modal"
                data-target="#product-cart"
                class="align-self-center float-right p-0 btn btn-md"
                style="color: #5cd85c"
                @click="orderSupply(supply.id)"
              >
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade additem"
        id="product-cart"
        tabindex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content mx-auto">
            <div class="modal-header bg-light">
              <h5
                class="modal-title text-dark font-weight-bold"
                id="staticBackdropLabel"
              >
                Add to cart
              </h5>
              <button
                type="button"
                class="border-0 close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body product-data">
              <form class="row" method="post" @submit.prevent="insertOrder">
                <div class="col-lg-7 border-right">
                  <div class="input-group">
                    <input type="hidden" v-model="addorders.id" />
                    <input
                      type="text"
                      readonly
                      class="form-control text-center bg-white font-weight-bold"
                      style="color: #028476; border: none"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      v-model="addorders.name"
                    />
                  </div>
                  <figure>
                    <img
                      class="img img-fluid w-75 m-auto border-0 form-control"
                      alt="Tea-ana-product"
                      style="height: 300px; width: 200px"
                      :src="path + addorders.imagePath"
                      fluid
                    />
                  </figure>
                </div>

                <div class="col-lg-5">
                  <div class="form-group">
                    <input
                      type="number"
                      class="form-control text-center"
                      placeholder="Select Quantity"
                      min="1"
                      v-model.number="quantity"
                    />
                  </div>

                  <hr />
                  <div class="input-group">
                    <input
                      type="number"
                      readonly
                      class="form-control text-center bg-white font-weight-bold"
                      style="color: #028476"
                      placeholder="Price"
                      aria-label="Price"
                      aria-describedby="basic-addon1"
                      v-model.number="TotalValue"
                    />
                  </div>

                  <small>Price varies on selected order </small>
                  <div class="input-group mt-3">
                    <input
                      type="submit"
                      value="Add to cart"
                      class="mx-auto w-50 btn btn-sm text-white"
                      style="background-color: #028476"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";
import $ from "jquery";
export default {
  data() {
    return {
      addorders: [],

      /* data fields */
      imagePath: null,
      price: null,
      name: null,
      quantity: 1,
      /* filters */
      category: null,
      type: null,

      sort: null,
      supplies: [],
      search: "",
      pagination: [],

      //File Path
      path: "https://api.tea-ana.com/uploads/",

      query: null,
      queryData: null,
      /* 
      options2: [
        { value: null, text: "Product Type" },
        { value: "Wholesale", text: "Wholesale" },
        { value: "Retail", text: "Retail" },
      ], */
      options3: [
        { value: null, text: "Order by" },
        { value: "asc", text: "Low to High" },
        { value: "desc", text: "High to Low" },
      ],
    };
  },
  async created() {
    // fetch the data pag ka load
    this.getSupplies();
  },
  methods: {
    async getSupplies() {
      let response = await axios.get(
        `https://api.tea-ana.com/v1/supplies?select=id,name,price,type,imagePath,categoryId` //endpoint
      );
      this.supplies = response.data.data;
      console.log(this.supplies);
    },

    async orderSupply(id) {
      axios
        .get(`https://api.tea-ana.com/v1/supplies/` + id)
        .then((response) => {
          this.addorders = response.data.data;
        });
      console.log(this.addorders);
    },
    async insertOrder() {
      axios
        .post("https://api.tea-ana.com/v1/cart/supplies", {
          product_id: this.addorders.id,
          quantity: this.quantity,
        })
        .then((response) => {
          console.log(response);
          $("#product-cart").modal("hide");
          swal("Product added!", "Check your order in the Cart!", "success");
          this.getSupplies();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },

  computed: {
    filter() {
      //variable where to store filtered data
      let data = {};

      //returns all supplies if values are null
      if (
        this.search == null ||
        (this.search == "" && this.category == null && this.type == null)
      ) {
        if (this.sort == "desc") {
          return this.supplies.slice().sort((a, b) => {
            return b.price - a.price;
          });
        }
        if (this.sort == "asc") {
          return this.supplies.slice().sort((a, b) => {
            return a.price - b.price;
          });
        }
        return this.supplies;
      }

      //Filter for search
      data = this.supplies.filter((el) => {
        if (this.search != null && this.search != "") {
          console.log(1);
          return el.name.match(new RegExp(`${this.search}`, "gi"));
        }
        if (
          this.search == null ||
          (this.search == "" && this.category != null)
        ) {
          console.log(2);
          return el.categoryId == this.category;
        }

        /*   if (this.search == null ||
          (this.search == "" && this.category != null)) { */
        //return el.category_id == this.category && el.productType == this.type;
      });

      if (this.sort != null) {
        data.sort((a, b) => {
          if (this.sort == "desc") {
            return b.price - a.price;
          }
          return a.price - b.price;
        });
      }

      console.log(data);

      //returns filted data
      return data;
    },
    TotalValue() {
      let tot = this.addorders.price * this.quantity;
      return tot;
    },
  },
};
</script>



<!--SZ Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shop {
  margin-top: 69px;
}
.items {
  min-width: 250px;
  max-width: 250px;
  height: auto;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}
.filters {
  margin-top: 5%;
  margin-bottom: 5%;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
@media only screen and (max-width: 576px) {
  nav {
    position: relative;
  }
  .fill {
    max-width: 200px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (max-width: 768px) {
}
@media only screen and (max-width: 992px) {
  .fill {
    max-width: 150px;
  }
}
</style>
