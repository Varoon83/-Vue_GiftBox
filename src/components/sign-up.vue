<template>  
<div class="wrapper">
  <div class="holder">
    <div class="detailBox">
      <div class="container-fluid h-100">
    <div class="row justify-content-center align-items-center h-100">
        <div class="col col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <form @submit.prevent="submit">
                <h2>Sign up</h2>
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
                    <div :class="{ 'hasError': $v.input.confirmpassword.$error }">
                    <input class="form-control form-control-lg" v-model="input.confirmpassword" placeholder="Confirm Password" type="password">
                    </div>
                </div>
                <div class="form-group">
                    <div :class="{ 'hasError': $v.input.email.$error }">
                    <input class="form-control form-control-lg" v-model="input.email" placeholder="Email" type="email">
                </div>
                </div>
                <div class="form-group">
                    <button type="button" v-on:click="register()" class="btn btn-info btn-lg btn-block">Register</button>
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
    import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
    export default {
        name: 'SignUp',
        data() {
            return {
                input: {
                    username: "",
                    password: "",
                    confirmpassword: "",
                    email: ""
                },
                users: []
            }
        },
        validations: {
            input: {
            username: { required, min: minLength(5) },
            password: { required,min: minLength(5) },
            confirmpassword: { sameAsPassword: sameAs('password') },
            email: { required, email }
            }
        },
        methods: {
                getUsers: function(){
                    this.$http.get('http://localhost:3000/users')
                    .then(res => {
                        this.users = res.data
                        this.verifyCredentials();
                    })
                    .catch(err => console.error(err));
                },
                register : function() {
                        this.$v.input.$touch();
                        if(this.$v.input.$error) return
                        this.getUsers()
                },
                registrationCallback: function() {
                       this.$toasted.info("Registration Sucessfull!",{
                            message: 'message string',
                            type: 'error',
                            action : {
                                text : 'Take me to login page!',
                                onClick : (e, toastObject) => {
                                    toastObject.goAway(0);
                                    this.$router.push({path: "/login"})
                                }
                            }
                        });
                },
                createNewUser: function() {
                    // Getting the last used user id
                    var lastUsedUserId = this.users[this.users.length -1].id;
                    // Creating a user object
                    var user = {
                        "id": ++ lastUsedUserId,
                        "userName": this.input.username,
                        "password": this.input.password,
                        "email": this.input.email,
                        "isAdmin": 0
                    }

                    this.$http.post('http://localhost:3000/users', user)
                    .then(res=>{
                        console.log(res);
                        this.registrationCallback();
                        }, 
                        err=>{
                        console.log(err)
                        })
                },
                verifyCredentials: function() {
                    var userExists = false;  
                    this.users.forEach(u => {
                            if (this.input.username == u.userName)
                            {
                               userExists = true;
                               return;
                            }
                        });
                    
                    if(!userExists) {
                        this.createNewUser();
                    } else {
                        this.$toasted.error("The username already taken!",{
                            message: 'message string',
                            type: 'error',
                            action : {
                                text : 'Choose a new username',
                                onClick : (e, toastObject) => {
                                    toastObject.goAway(0);
                                }
                            }
                        });
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