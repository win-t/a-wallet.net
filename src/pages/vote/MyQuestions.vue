<template>
  <MainLayout>
    <VoteTopMenu current="ams01" />
    <VoteMenu current="my-questions" />
    <h1>{{ $t("votequestions.title") }}</h1>
    <QuestionList />
  </MainLayout>
</template>

<script>
import MainLayout from "../../layouts/Main.vue";
import VoteMenu from "../../components/VoteMenu.vue";
import VoteTopMenu from "../../components/VoteTopMenu.vue";
import QuestionList from "./QuestionList";
import { mapActions } from "vuex";
export default {
  components: {
    MainLayout,
    VoteMenu,
    VoteTopMenu,
    QuestionList,
  },
  data() {
    return {};
  },
  computed: {
    accountsWithPrivateKey() {
      return this.$store.state.wallet.privateAccounts.filter((a) => !!a.sk);
    },
    hasPrivate() {
      return (
        this.accountsWithPrivateKey && this.accountsWithPrivateKey.length > 0
      );
    },
  },
  mounted() {
    console.log("accountsWithPrivateKey", this.accountsWithPrivateKey);
  },
  methods: {
    ...mapActions({
      openSuccess: "toast/openSuccess",
    }),
  },
};
</script>