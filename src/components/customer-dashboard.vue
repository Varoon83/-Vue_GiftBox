<template>
    <div id="customer-dashboard">
        <Navigation></Navigation>
        <button type="button" v-on:click="placeOrder()" class="btn btn-info btn-lg btn-block">New Order</button>        
        <button type="button" v-on:click="logout()" class="btn btn-info btn-lg btn-block">Sign out</button>
    </div>
</template>

<script>
    export default {
        name: 'CustomerDashboard',
        data() {
            return {};
        },
          methods: {
           placeOrder()
           {
                
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

<style scoped>
    #customer-dashboard {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
</style>