<template>  
<div>
    <div>
        <Navigation></Navigation>
    </div>
     <div>
        <b-table striped :fields="computedFields" :items="orderHistory">
            <template v-slot:cell(additionalActions)= "row">
                <b-button @click="updateStatus(row.item, row.index, $event.target)">Mark as Deliverd</b-button>
            </template>
            <template slot="bottom-row"  v-if="iscurrentUserAdmin">
                    <td/><td/><td/><td>
                    <td><b>Total Commission earned: {{totalCommission}}</b></td>
             </template>

     </b-table>
  </div>
</div>
</template>

<script>
    export default {
    name: 'OrderHistory',
    computed: {
        computedFields() {
            // If the user isn't an admin, filter out fields that require auth.
            if((!this.iscurrentUserAdmin) || (this.iscurrentUserAdmin &&  this.pageMode !=1))
            {
                // If the user not an admin, or admin on reports page, remove action buttons
                return this.fields.filter(field => !field.requiresAdmin);
            }
            else {
                return this.fields;
            }
        },
        currentUserId () {
            return this.$store.state.currentUser.id
        },
        pageMode () {
            return this.$route.query.q;    
        },
        iscurrentUserAdmin () {
            return this.$store.state.currentUser.isAdmin
        },
        itemsWithTotal() {
         return [
            this.totalCommission
        ];
  }
    },
    data() {
                {
                    return initialState();
                }
           }, 
   watch: {
    $route() {
        this.getOrders();
        if(this.pageMode ==2)
            {
                var modifiedState = initialState();
                var index = modifiedState.fields.findIndex((obj => obj.key == "name"));
                modifiedState.fields[index].label = "Name";

                Object.assign(this.$data, modifiedState);

            } else {
                 Object.assign(this.$data, initialState());
                }
           }, 
    },
    methods:{
    statusUpdateCallback: function() {
                    this.$toasted.info("Update Sucessfull!");
                    this.getOrders();
                },
    updateStatus: function(item) {
                    var order = {
                        "status": "Delivered"
                    }
                    this.$http.patch('http://localhost:3000/order/'+ item.id, order)
                    .then(res=>{
                        console.log(res);
                        this.statusUpdateCallback();
                        }, 
                        err=>{
                        console.log(err)
                        })
      },
        getOrders: function(){
            var filterCondition = "";
            var useCustomerName = false;
            var commissionEarned = 0;
            if (this.pageMode == 1 && !this.iscurrentUserAdmin)
            {
                // User is looking in his order history
                filterCondition = "?userId=" + this.currentUserId;

            }else if (this.pageMode == 1 && this.iscurrentUserAdmin) {
                // Admin is looking in to all orders which were not delivered
                filterCondition = "?status_ne=Delivered";
            } else {
                filterCondition = "?_expand=user"    
                useCustomerName = true
            }
            this.$http.get('http://localhost:3000/order' + filterCondition )
                .then(res=>{
                    this.orderHistory = res.data

                this.orderHistory.forEach(function (element) {
                    if(!useCustomerName) {
                    element.name = element.firstName + " " + element.lastName;
                    } else {
                        element.name = element.user.userName;
                    }

                    commissionEarned = commissionEarned + (element.amountPayable * 5/ 100);
                    element.commission = "INR. " + (element.amountPayable * 5/ 100) ;
                    element.amountPayable = "INR. " + element.amountPayable;
                    
                });

                this.totalCommission = commissionEarned;
                
                }, err=>{
                    console.log(err)
                })
        }
    },
    mounted:function(){
        this.getOrders()
    }
}

function initialState () {
    return {
        fields: [
          { key: 'id', label: 'Order Id' },
          { key: 'name', label: 'Recipient Name' } ,
          { key: 'orderDate', label: 'Ordered Date' } ,
          { key: 'giftCardValue', label: 'Gift Card Value' },
          { key: 'commission', label: 'Commission [5%]' },
          { key: 'status', label: 'Delivery Status' },
          { key: 'additionalActions', label: 'Action', requiresAdmin: true },
        ],
          orderHistory:[],
          totalCommission: 0,
        }
    }
</script>