<template>
    <div class="card">
        <img src="https://i.pinimg.com/736x/03/d7/3e/03d73e18739816c9a7c51ef755e0e695.jpg" alt="Attendance chart">
        <div class="container">
            <h3><b>Attendance</b></h3>
            <p>Employee Attendance</p>
        </div>
    </div>

    <div class="card-2">
        <img src="https://i.pinimg.com/736x/7e/e2/f7/7ee2f7921af177235c4e55027530d9a5.jpg" alt="Salary chart">
        <div class="container">
            <h3><b>Payroll</b></h3>
            <p>Employee Salaries</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardComp',
    props: {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    methods: {
        openModal(card) {
            this.$emit('open-modal', card);
        }
    }
}
</script>

<style>

.card, .card-2 {
    width: 300px;
    height: 300px;
    margin: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    transition: transform 0.3s;
}

.card img, .card-2 img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}
.container {
    padding: 20px;
    text-align: center;
}

.card:hover, .card-2:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>