<template>

    <strong><h1>Modern Solutions</h1></strong>
    <div>
        <h4>Welcome</h4>
    </div>



    <nav>
   <div class="vertical-menu" sidebar>
    <a href="#login" class="active">Login</a> <br>
    <a href="#employee" class="active">Employee Details</a> <br>
    <a href="#attendance" class="active">Attendance</a> <br>
    <a href="#leave" class="active">Leave</a> <br>
    </div>
    </nav>

    <div></div>
</template>

<script>
 
</script>

<style>
.topnav {
    overflow: hidden;
    background-color: #333;
}

.topnav a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

.topnav a:hover {
    background-color: #ddd;
    color: black;
}

.topnav a.active {
    background-color: #4ca3af;
    color: white;
}

.topnav input[type="text"] {
    float: right;
    padding: 6px;
    margin-top: 8px;
    margin-right: 16px;
    font-size: 17px;
    border: none;
}       

@media screen and (max-width: 600px) {
    .topnav a {
        float: none;
        display: block;
        text-align: left;
        width: 100%;
        margin: 0;
        padding: 14px;
    }
    .topnave input[type=text]{
        border: 1px solid #ccc;
    }
}

div[sidebar] a {
    padding: 10px 15px;
    text-decoration: none;
    color: #333;
    display: block;
    width: 35px;
    height: 5px;
    margin: 6px 0;
}
</style>