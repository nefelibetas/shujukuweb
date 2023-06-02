<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>

export default {
  name: "AboutView",
  data() {
    return {
      booknum: {
        pageSize: 50,
        currentPage: 1,
      },
    };
  },
  created() {
    this.projectlist(this.booknum)
  },
  methods: {
    projectlist: function (booknum) {
      this.axios
        .get("/api/manage/queryAll", {
          params: { pageSize: booknum.pageSize, currentPage:booknum.currentPage },
        })
        .then((resp) => {
          console.log(resp.data);
        });
    },
  },
};
</script>
