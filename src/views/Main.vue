<template>
  <div class="main">
    <div
      class="booking"
      @click="goToBooking"
    >
      预 约 图 书
    </div>
    <div
      class="borrowing"
      @click="goToBorrowing"
    >
      借 阅 图 书
    </div>
    <div
      class="manageBook"
      v-show="userInfo.isAdmin"
      @click="goTomanageBook"
    >
      管 理 图 书
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "mainWinodw",
  data() {
    return {};
  },
  methods: {
    goToBooking() {
      this.$router.push("/booking");
    },
    goToBorrowing() {
      this.$router.push("/borrow");
    },
    goTomanageBook() {
      this.$router.push("/manage");
    },
  },
  computed: {
    ...mapState(["userInfo"]),
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  .booking {
    width: 15vw;
    height: 10vh;
    line-height: 10vh;
    cursor: pointer;
    background-color: rgb(131, 205, 255);
  }
  .borrowing {
    color: white;
    width: 15vw;
    height: 10vh;
    line-height: 10vh;
    cursor: pointer;
    background-color: rgb(53, 53, 53);
  }
  .manageBook {
    color: white;
    width: 15vw;
    height: 10vh;
    line-height: 10vh;
    cursor: pointer;
    background-color: rgb(255, 137, 137);
  }
}
</style>
