<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand><img class="logoimage" src="../assets/images/logo.png"></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-if="!currentUser.isAdmin" to="/new-order" exact exact-active-class="active">New Order</b-nav-item>
        <b-nav-item v-on:click="openOrderHistory(1)" exact exact-active-class="active">Order History</b-nav-item>
        <b-nav-item v-if="currentUser.isAdmin"  v-on:click="openOrderHistory(2)" exact exact-active-class="active">Monthly Report</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em>{{ currentUser.userName }}</em>
          </template>
          <b-dropdown-item @click="logout()" >Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template> 

<script>
    export default {
        name: 'Navigation',
        data() {
            return {
              user: ""
            };
        },
        computed: {
        currentUser () {
            return this.$store.state.currentUser
          }
        },
        methods: {
           openOrderHistory(mode) 
           {
              this.$router.push("/order-history?q=" + mode);
           },
           logout() 
           {
                    this.$store.commit("setAuthentication", false);
                    this.$store.commit("setCurrentUser", null);
                    this.$router.replace({ name: "login" });
                
            }
        }
}
</script>