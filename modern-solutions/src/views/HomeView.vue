<template>
    <div class="bg-image">
        <form action="/action_page.php" method="post">
            <div class="bg-text">
                <h1>Login Page</h1>
                <p>Please enter your credentials to login.</p>
            </div>
        </form>
    </div>


    <body>
        <form>
            <div>
                <label for="username">Username:</label>
                <input v-model="userEmail" type="text" id="userEmail" placeholder="email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input v-model="password" type="password" id="password" placeholder="password" required> <br>
                <br>
                <button type="submit"><router-link to="/dashboard">Login</router-link></button>

            </div>


        </form>
    </body>
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
        // @ts-ignore
        validateForm() {
            const userEmail = document.getElementById('userEmail').value;
            const password = document.getElementById('password').value;
        },
        handleLogin() {
            // Handle login logic here
            this.error = [];
            //authentication logic here 
            if (!this.userEmail && !this.password) {
                // Redirect to dashboard or perform successful login actions
                this.error.push('Please enter your email and password');
                // Redirect to dashboard or perform successful login actions
            } else {
                // Handle login failure

                alert('Login successful');
                this.$router.push('/dashboard');
            }
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