<template>
  <div>
    <b-card v-if="!nodeAddress || !validNode">
      <b-card-text>
        <b-row>
          <b-col sm="4">
            <label
              >Enter Node's address already connected to the blockchain</label
            >
          </b-col>
          <b-col sm="8">
            <b-form-input
              v-model="nodeAddress"
              placeholder="Node address' format http://0.0.0.0:5000"
              @blur="AddNode"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-card-text>
    </b-card>
    <b-card v-if="validNode || true">
      <b-card-text> 
        <b-table  :items="mempool" :fields="mempoolFields"></b-table>
      </b-card-text>
    </b-card>
  </div>
</template>
<script>

import axios from "axios";
const host = `http://localhost:5000/`;

export default {
  name: "Wallet",
  props: {},
  components:{
  },
  data() {
    return {
      nodeAddress: null,
      validNode: false,
      toastVariants: [
        "success",
        "warning",
        "danger",
        "info",
        "primary",
        "secondary",
      ],
      mempool: [],
      mempoolFields: [
          {
            key: 'timestamp',
            label: 'Transaction Timestamp',
            sortable: true
          },
          {
            key: 'sender',
            label: 'Sender',
            sortable: true
          },
          {
            key: 'reciever',
            label: 'Reciever',
            sortable: true,
          }
      ]
    };
  },
  methods: {
    MakeToast(variant = null, bodyContent) {
      this.$bvToast.toast(bodyContent, {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true,
        autoHideDelay: 10000000,
        mempool: [],
      });
    },
    GetMempool() {
      let vm = this;
      vm.mempool = [];
      axios.get(host+'getMempool').then((response)=>{
        vm.mempool = response.data.mempool;
      });
    },
    AddNode() {
      let vm = this;
      console.log(vm.nodeAddress);
      if (
        /^((http|https):\/\/)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):\d+$/.test(
          vm.nodeAddress
        )
      ) {
        const headers = { "Content-Type": "application/json" };
        axios
          .post(host + "addNode",
            {address: vm.nodeAddress,},
            { headers }
          )
          .then((response) => {
            axios.get(host + "replaceChain");
            axios.get(host + "updateMempool");
            vm.MakeToast(vm.toastVariants[0], "Node added successfully");
            vm.validNode = true;
            vm.GetMempool();
          })
          .catch((e) => {});
      }
    },
  },
  watch: {},
  mounted() {
    let vm = this;
    vm.GetMempool();
  },
};
</script>
<style lang="scss">

</style>
