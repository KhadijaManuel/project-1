<template>
    <div class="bg-image">
        <div class="bg-text">
            <h1>Login</h1>
            <p>Please enter your credentials to login</p>

        </div>
    


        <form @submit.prevent="handleLogin">
            <div>
                <label for="userEmail">Username:</label>
                <input v-model="userEmail" type="text" id="userEmail" placeholder="email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input v-model="password" type="password" id="password" placeholder="password" required> <br>
                <br>
                <div v-if="error.lenth">
                    <p style="color: black;" v-for="err in error" :key="err">{{ err }}</p>
                </div>
                <button type="submit">Login</button>
            </div>


        </form>
    </div>
</template>

<script>

export default {
    name: 'HomeView',
    data() {
        return {
            userEmail: '',
            password: '',
            error: []

        };
    },

    methods: {
        handleLogin(){
            this.error = [];
            if (!this.userEmail || !this.password){
                this.error.push('Please enter your email and password');
                return;
            }

            alert('Login successful')
            this.$router.push('/dashboard')
        }
    }


}

</script>

<style>
form {
    width: 300px;
    margin: 0 auto;
}

div {
    margin-bottom: 15px;
}

div label {
    display: block;
    margin-bottom: 5px;
}
</style>