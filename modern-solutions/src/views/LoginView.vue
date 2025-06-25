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
                <input type="text" id="username" placeholder="username" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="passwo6rd" placeholder="password" required> <br>
                <br>
               <button type="submit"><router-link to="/dashboard">Login</router-link></button>
            
                
            </div>
           
            
        </form>
    </body>
</template>

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