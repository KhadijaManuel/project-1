<template>
     <div class="dashboard-wrapper">
    <nav aria-label="Sidebar navigation">
      <div class="vertical-menu">
        <router-link to="/login" class="active">Login</router-link>
        <router-link to="/employee" class="active">Employee Details</router-link>
        <router-link to="/employee-attendance">Attend</router-link>
        <router-link to="/leave" class="active">Leave</router-link>
        <router-link to="/payroll" class="active">Payroll</router-link>
      </div>
    </nav>
    <div class="dashboard-content">
      <strong><h1>Modern Solutions</h1></strong>
      <div>
        <h4>Welcome</h4>
      </div>
      <CardComp v-if="employee" :employee="employee"/>
    </div>
  </div>

  <h1>Hello,world</h1>
</template>


<script>
import CardComp from '@/components/FlipCard.vue';
// This is a Vue.js component for the Dashboard view
// It imports a Card component and uses it within the template

export default {
    name: 'DashboardView',
    components: {
        CardComp
    },
    data() {
        return {
         employee: {
            employeeId: 1,
       employeeName: "Sibongile Nkosi",
       reviewPeriod: "2024 Q4",
       reviewer: "Lungile Moyo",
       score: 9,
       comments: "Consistently delivers high-quality work and shows leadership potential."
         },
           
        };
    },

    methods: {
        // Define any methods you need here
    },
}

</script>


<style scoped>
.dashboard-wrapper {
  display: flex;
  min-height: 100vh;
}
 
.vertical-menu {
    width: 120px;
    height: calc(100vh -60px); /* Adjust height to be below the topnav (assume topnav is ~60px) */
    background-color: #f1f1f1;
    position: fixed;
    top: 60px; /* Pushes the sidebar below the topnav */
    left: 0;
    padding-top: 10px; /* Less padding so it doesn't overlap */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-right: 1.5px solid #e0e6ed;
    box-shadow: 2px 0 12px rgba(41,128,185,0.04);
    z-index: 10;
}
 
.vertical-menu router-link {
    padding: 12px 20px;
    margin: 6px 0;
    width: 100%;
    border-radius: 6px 0 0 6px;
    color: #2980b9;
    background: none;
    font-size: 1rem;
    text-decoration: none;
    transition: background 0.18s, color 0.18s;
    display: block;
 }

 .vertical-menu router-link.router-link-exact-active {
  background: #eaf6fb;
  color: #145a86;
  font-weight: 600;
}

.vertical-menu router-link:hover {
  background: #d6ecf7;
  color: #145a86;
}

.dashboard-content {
  margin-left: 120px;
  padding: 40px 20px;
  width: 100%;
}
/* .topnav {
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
}  */


/* div[sidebar] {
    width: 120px;
    min-height: calc(100vh - 60px);
    background: #fff;
    border-right: 1.5px solid #e0e6ed;
    box-shadow: 2px 0 12px rgba(41,128,185,0.04);
    position: fixed;
    top: 0;
    left: 0;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
} */

/* div[sidebar] a,
div[sidebar] router-link {
    padding: 12px 20px;
    margin: 6px 0;
    width: 100%;
    border-radius: 6px 0 0 6px;
    color: #2980b9;
    background: none;
    font-size: 1rem;
    text-decoration: none;
    transition: background 0.18s, color 0.18s;
    display: block;
}

div[sidebar] a.active,
div[sidebar] router-link.router-link-exact-active {
    background: #eaf6fb;
    color: #145a86;
    font-weight: 600;
}

div[sidebar] a:hover,
div[sidebar] router-link:hover {
    background: #d6ecf7;
    color: #145a86;
}  */

</style>