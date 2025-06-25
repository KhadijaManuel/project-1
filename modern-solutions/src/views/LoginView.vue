<template>
     <body>
        <form>
            <div>
                <label for="username-Email">User Email:</label>
                <input type="text" id="user-Email" placeholder="Email" required>
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

<script>
 
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