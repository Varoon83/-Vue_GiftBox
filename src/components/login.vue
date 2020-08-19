<template>  
<div class="wrapper">
  <div class="holder">
    <div class="detailBox">
      <div class="container-fluid h-100">
    <div class="row justify-content-center align-items-center h-100">
        <div class="col col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <form @submit.prevent="submit">
                <h2 class="subheader">Sign in</h2>
                <div class="form-group">
                    <div :class="{ 'hasError': $v.input.username.$error }">
                    <input class="form-control form-control-lg"  v-model="input.username" p placeholder="User Name" type="text">
                    </div>
                </div>
                <div class="form-group">
                    <div :class="{ 'hasError': $v.input.password.$error }">
                    <input class="form-control form-control-lg" v-model="input.password" placeholder="Password" type="password">
                    </div>
                </div>
                <div class="form-group">
                    <button type="button" v-on:click="submit()" class="btn btn-info btn-lg btn-block">Sign In</button>
                </div>
                <div class="form-group sign-up">
                    <button type="button" v-on:click="signup()" class="btn btn-link signupButton">Sign up</button>
                </div>
            </form>
        </div>
    </div>
</div>
    </div>
  </div>
</div>
</template>

<script>
    import { required } from "vuelidate/lib/validators";
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                },
                users: [],
                currentUser : ""
            }
        },
        validations: {
            input: {
            username: { required },
            password: { required }
            }
        },
        methods: {
                getUsers: function(){
                    this.$http.get('http://localhost:3000/users')
                    .then(res => {
                        this.users = res.data
                        this.authenticateUser();
                    })
                    .catch(err => console.error(err));
                },
                signup : function() {
                    this.$router.replace({ name: "sign-up" });
                },
                submit : function() {
                        /* eslint-disable no-debugger */
                        // debugger;
                        this.$v.input.$touch();
                        if(this.$v.input.$error) return
                        this.getUsers()
                },
                authenticateUser: function() {
                    var userValid = false;  
                    this.users.forEach(u => {
                            if (this.input.username == u.userName 
                                    && this.input.password == u.password)
                            {
                               userValid = true;
                               this.currentUser = u;
                               return;
                            }
                        });
                    
                    
                    if(userValid) {
                        this.$store.commit("setAuthentication", true);
                        this.$store.commit("setCurrentUser", this.currentUser);
                        if (this.currentUser.isAdmin) {
                            this.$router.push("/order-history?q=1");
                            //this.$router.replace({ name: "/order-history?q=1" });
                        }
                        else {
                            this.$router.push("new-order");
                            // this.$router.replace({ name: "new-order" });
                        }
                        
                    } else {
                        console.log("The username and / or password is incorrect");
                        this.$toasted.error("The username and / or password is incorrect");
                    }
                  }
            }
   }
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>