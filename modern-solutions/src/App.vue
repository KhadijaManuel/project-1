<template>
  
  <div class="topnav">
    <router-link to="/">HomeView</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/dashboard">Dashboard</router-link>
    <router-link to="/employees">Employee</router-link>
    <router-link to="/payroll">Payroll</router-link>
    <router-link to="/leave">Leave</router-link>
    <input type="text" placeholder="Search..">
  </div>
  <router-view />
</template>

<script>

import FlipCard from './components/FlipCard.vue'
import EmployeesCards from './components/EmployeesCards.vue'

export default {
  components: {
    FlipCard,
    EmployeesCards
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.topnav {
    overflow: hidden;
    background-color: #333;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
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

</style>
