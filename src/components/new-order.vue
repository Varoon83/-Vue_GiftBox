<template>  
<div>
    <div>
        <Navigation></Navigation>
    </div>
<b-container class="bv-new-order-row border border-primary">
<b-form @submit.prevent="submit">
    <b-row>
    <b-col>
         <b-form-group>
            <span class="orderDate">Date: <b> {{ this.orderDate  }} </b></span>
         </b-form-group>
    </b-col>
    </b-row>
  <b-row>
      <b-col>
     <b-form-group id="input-group-fistname" label="First Name" label-for="input-firstname">
        <div :class="{ 'hasError': $v.input.firstName.$error }">
        <b-form-input
          id="input-firstname"
          v-model="input.firstName"
          required
        ></b-form-input>
         </div>
      </b-form-group>
      </b-col>
      <b-col>
      <b-form-group id="input-group-lastname" label="Last Name" label-for="input-lastname">
        <div :class="{ 'hasError': $v.input.lastName.$error }">
        <b-form-input
          id="input-lastname"
          v-model="input.lastName"
          required
        ></b-form-input>
        </div>
      </b-form-group>
      </b-col>
  </b-row>
<b-row>
    <b-col>
      <b-form-group id="input-group-giftcardvalue" label="Gift Card Value [INR]" label-for="input-giftcardvalue">
        <div :class="{ 'hasError': $v.input.giftCardValue.$error }">  
        <b-form-input
          id="input-giftcardvalue"
          v-model="input.giftCardValue"
          required
        ></b-form-input>
        </div>
      </b-form-group>
      </b-col>
      <b-col>
      <b-form-group id="input-group-amountpayable" label="Amount Payable [5% commission inclusive]" label-for="input-amountpayable">
        <b-form-input
          id="input-amountpayable"
          v-model="amountPayable"
          readonly
        ></b-form-input>
      </b-form-group>
      </b-col>
    </b-row>
    <b-row>
    <b-col>
    <b-form-group id="input-group-mobile" label="Mobile" label-for="input-mobile">
        <div :class="{ 'hasError': $v.input.mobile.$error }">
        <b-form-input
          id="input-mobile"
          v-model="input.mobile"
          required
        ></b-form-input>
        </div>
      </b-form-group>
    </b-col>
    <b-col>
      <b-form-group id="input-group-address" label="Address" label-for="input-address">
        <div :class="{ 'hasError': $v.input.address.$error }">
        <b-form-input
          id="input-address"
          v-model="input.address"
          required
        ></b-form-input>
        </div>
      </b-form-group>
    </b-col>
    </b-row>
    <b-row>
    <b-col>
        <b-button type="button" v-on:click="placeOrder()" variant="primary">Submit</b-button>
    </b-col>
    </b-row>
</b-form>
</b-container>
</div>
</template>
<script>
    import { required, numeric, minLength } from "vuelidate/lib/validators";
    
    export default  {
        name: 'NewOrder',
        data() {
                    return initialState();
                }, 
        computed: {
                    amountPayable: function () {
                      var finalAmount = +this.input.giftCardValue;
                      finalAmount = finalAmount + (finalAmount * 5 / 100);
                      return finalAmount
                    }
                },
        validations: {
                input: {
                    firstName: { required, min: minLength(5) },
                    lastName: { required, min: minLength(5) },
                    giftCardValue: { required, numeric },
                    mobile: { required, min: minLength(5) },
                    address: { required, min: minLength(5) }
                }
            },
            methods: {
                 orderSubmissionCallback: function() {
                    this.$toasted.info("Order Sucessfull!");
                    this.$v.$reset();
                    Object.assign(this.$data, initialState());

                },
                placeOrder : function() {
                        this.$v.input.$touch();
                        if(this.$v.input.$error) return
                    // Creating a order object
                    var order = {
                        "firstName": this.input.firstName,
                        "lastName": this.input.lastName,
                        "giftCardValue": this.input.giftCardValue,
                        "amountPayable": this.amountPayable,
                        "mobile": this.input.mobile,
                        "address": this.input.address,
                        "userId": this.$store.state.currentUser.id,
                        "orderDate" : this.orderDate,
                        "status" : "New"
                    }
                    this.$http.post('http://localhost:3000/order', order)
                    .then(res=>{
                        console.log(res);
                        this.orderSubmissionCallback();
                        }, 
                        err=>{
                        console.log(err)
                        })
                }
            }
  }

  function initialState (){
                return {
                        input: {
                            firstName: '',
                            lastName: '',
                            giftCardValue: '',
                            mobile: '',
                            address: ''
                        },
                        orderDate: new Date().toJSON().slice(0,10).replace(/-/g,'/')
                    }
}
</script>