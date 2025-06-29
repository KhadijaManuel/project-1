<template>

    <EmployeesCards />

</template>

<script>
import EmployeesCards from './EmployeesCards.vue'

export default {
  name: 'FlipCard',
  components: {
    EmployeesCards
  }
}
</script>

<style>
/* .grid-text-centre {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            column-gap: 20px;
            row-gap: 40;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        } */
.grid-text-centre {
    margin-left: 130px; /* Add space for the sidebar (sidebar is 120px wide + 10px gap) */
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 20px;
    row-gap: 60px;
    padding: 20px;
    max-width: 1200px;
    margin-top: 40px;
}

        .flip-card {
            background-color: transparent;
            width: 150px;
            height: 150px;
            perspective: 1000px;
            margin: 0 auto;
        }

        .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.6s;
            transform-style: preserve-3d;
        }

        .flip-card:hover .flip-card-inner {
            transform: rotateY(180deg);
        }

        .flip-card-front, .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .flip-card-front {
            background-color: #2980b9;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .flip-card-back {
            background-color: #bbb;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            color: white;
            transform: rotateY(180deg);
        }

        .flip-card-front h1 {
            margin: 0 0 10px 0;
            font-size: 24px;
        }

        .flip-card-front p {
            margin: 5px 0;
            font-size: 16px;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
            .grid-text-centre {
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 15px;
            }
            
            .flip-card {
                width: 120px;
                height: 120px;
            }
        }

</style>
