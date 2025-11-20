<template>

    <strong><h1>Modern Solutions</h1></strong>
    <div>
        <h4>Welcome</h4>
    </div>
    <nav>
    <div class="vertical-menu" sidebar>
        <a href="#Login" class="active">#Login</a> <br>
        <a href="#employee" class="active">Employee Details</a> <br>
        <a href="#attendance" class="active">Attendance</a> <br>
        <a href="#leave" class="active">Leave</a> <br>
        <a href="#payroll" class="active">Payroll-</a> <br>
    </div>
    <CardComp/>
    </nav>

</template>

<script>
import CardComp from '@/components/CardComp.vue';

export default {
    name: 'DashboardView',
    components: {
        CardComp
    },
    data() {
        return {
           
        };
    },
    methods: {
        
    }
}

</script>

<style>
.vertical-menu {
    width: 120px;
    /* height: 100%; */
    /* background-color: #f1f1f1; */
    position: fixed;
    top : 0;
    left: 0;
    padding-top: 20px;
}
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
.card, .card-2 {
    width: 300px;
    height: 200px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 20px;
    display: inline-block;
}   
</style>