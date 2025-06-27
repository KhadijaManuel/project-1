<template>

    <strong><h1>Modern Solutions</h1></strong>
    <div>
        <h4>Welcome</h4>
    </div>
    <nav>
    <div class="vertical-menu" sidebar>
        <a href="#Login" class="active">Login</a> <br>
        <a href="#employee" class="active">Employee Details</a> <br>
        <router-link to="/employee-attendance">Attend</router-link> <br>
        <a href="#leave" class="active">Leave</a> <br>
        <a href="#payroll" class="active">Payroll</a> <br>
    </div>
    <CardComp v-if="employee" :employee="employee"/>
    </nav>

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
    //      {
    //   employeeId: 2,
    //   employeeName": "Lungile Moyo",
    //   reviewPeriod": "2024 Q4",
    //   reviewer": "Thabo Molefe",
    //   score": 8,
    //   comments": "Excellent management skills and team support."
    // },
    // {
    //   "employeeId": 3,
    //   "employeeName": "Thabo Molefe",
    //   "reviewPeriod": "2024 Q4",
    //   "reviewer": "Sibongile Nkosi",
    //   "score": 8,
    //   "comments": "Pays attention to detail and meets deadlines."
    // },
    // {
    //   "employeeId": 4,
    //   "employeeName": "Keshav Naidoo",
    //   "reviewPeriod": "2024 Q4",
    //   "reviewer": "Zanele Khumalo",
    //   "score": 7,
    //   "comments": "Good sales performance, can improve on follow-ups."
    // },
    // {
    //   "employeeId": 5,
    //   "employeeName": "Zanele Khumalo",
    //   "reviewPeriod": "2024 Q4",
    //   "reviewer": "Keshav Naidoo",
    //   "score": 8,
    //   "comments": "Creative marketing ideas and strong teamwork."
    // },
    // {
    //   "employeeId": 6,
    //   "employeeName": "Sipho Zulu",
    //   "reviewPeriod": "2024 Q4",
    //   "reviewer": "Naledi Moeketsi",
    //   "score": 7,
    //   "comments": "Strong design skills and attention to user experience."
    // },
    // {
    //   "employeeId": 7,
    //   "employeeName": "Naledi Moeketsi",
    //   "reviewPeriod": "2024 Q4",
    //   "reviewer": "Sipho Zulu",
    //   "score": 8,
    //   "comments": "Excellent at automating processes and ensuring system reliability."
    // },
    // {
    //   "employeeId": 8,
    //   "employeeName": "Farai Gumbo",
    //   "reviewPeriod": "2024 Q4",
    //   "reviewer": "Zanele Khumalo",
    //   "score": 7,
    //   "comments": "Creative content ideas and good collaboration with marketing."
    // },
    // {
    //   employeeId: 9,
    //   employeeName: "Karabo Dlamini",
    //   reviewPeriod: "2024 Q4",
    //   reviewer: "Fatima Patel",
    //   score: 8,
    //   comments: "Accurate financial reporting and strong analytical skills."
    // },
    // {
    //   employeeId: 10,
    //   employeeName: "Fatima Patel",
    //   reviewPeriod: "2024 Q4",
    //   reviewer: "Karabo Dlamini",
    //   score: 9,
    //   comments: "Excellent customer support leadership and problem-solving."
    // }
         
           
        };
    },

    methods: {
        // Define any methods you need here
    },
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

</style>