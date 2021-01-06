<template>
  <section class="row p-0 container-fluid">
    <div class="profile-info col-lg-3">
      <form class="p-5" v-if="account != null">
        <p class="text-center font-weight-bold">Account</p>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            readonly
            placeholder="Email Address"
            v-model="account.email"
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            readonly
            placeholder="Name"
            v-model="account.name"
          />
        </div>
        <div class="form-group">
          <input
            type="number"
            class="form-control"
            readonly
            placeholder="Contact Number"
            v-model="account.phone"
          />
        </div>

        <div class="float-right">
          <!-- <button
            class="btn btn-sm text-white pl-3 pr-3"
            data-toggle="modal"
            data-target="#EditProfilemodal"
            style="background-color: #028476; border-radius: 20px"
          >
            Edit
          </button> -->
        </div>
      </form>
    </div>

    <div class="record bg-white border-left col-lg-9">
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-link col-lg-8">
          <a
            href="#firsttab"
            class="nav-item text-dark font-weight-bold active"
            role="tab"
            data-toggle="tab"
          >
            <label style="color: #5cd85c">My</label>
            <label>Order</label>
          </a>
        </li>

        <li class="col-lg-4">
          <input
            type="text"
            v-model="search"
            class="form-control"
            placeholder="ex. S0-KVMF1234PLKO345"
          />
        </li>
      </ul>

      <div class="tab-content">
        <div class="tab-pane table-responsive p-0 active" id="firsttab">
          <div class="scrollable overflow-auto">
            <table class="table sticky table-borderless text-center">
              <thead class="col-lg-12">
                <tr>
                  <th scope="col">Order No.</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody v-for="(activeorder, idx) in normalfilter" :key="idx">
                <tr class="mt-2 shadow-sm" style="border-radius: 20px">
                  <td>{{ activeorder.uid }}</td>
                  <td>{{ activeorder.total }}</td>
                  <td>{{ activeorder.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
//allows cookies
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      pastorders: [],
      activeorders: null,
      account: null,

      email: null,
      name: null,
      password: null,
      phone: null,

      uid: null,
      address: null,
      paymentMethod: null,
      status: null,
      total: null,

      search: "",
    };
  },
  async created() {
    // fetch the data pag ka load
    this.getProfile();
    this.getActiveOrders();
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

    getActiveOrders: async function () {
      let response = await axios.get(
        "https://api.tea-ana.com/v1/auth/profile/supplies",
        {
          withCredentials: true,
        }
      );
      this.activeorders = response.data.user;
      console.log(this.activeorders);
    },
  },
  computed: {
    normalfilter: function () {
      return this.account.supply_orders.filter((activeorder) => {
        return activeorder.uid.match(new RegExp(`${this.search}`, "gi"));
      });
    },
    TotalValue: function () {
      let total = this.addorders.price * this.quantity;
      return total;
    },
    SumAddons() {
      return this.addons.reduce((acc, addon) => {
        return acc + parseInt(addon.price);
      }, 0);
    },
  },
};
</script>
<style scoped>
.profile-info,
.record {
  padding-top: 120px;
}

.scrollable {
  height: 60vh;
}

.scrollable table.sticky th {
  position: sticky;
  top: 0;
  background-color: white;
}
.scrollable table {
  table-layout: fixed;
}

tr td {
  padding-top: 3%;
  padding-bottom: 3%;
}

a.active {
  border-bottom: 1px solid #444;
}
.scrollable::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #444;
  border-radius: 10px;
  background-color: #f5f5f5;
  position: absolute;
}

.scrollable::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

.scrollable::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #444;
}
</style>