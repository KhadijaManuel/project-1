<template>
 <!-- <div class="grid-text-centre">
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <h1>John Doe</h1>
                    <p>Architect & Engineer</p>
                    <p>We love that guy</p>
                </div>
                <div class="flip-card-back">
                    1
                </div>
            </div>
        </div>

        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <h1>Jane Smith</h1>
                    <p>Designer & Developer</p>
                    <p>Creative and innovative</p>
                </div>
                <div class="flip-card-back">
                    2
                </div>
            </div>
        </div>

        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <h1>Mike Johnson</h1>
                    <p>Project Manager</p>
                    <p>Keeps everything organized</p>
                </div>
                <div class="flip-card-back">
                    3
                </div>
            </div>
        </div>

        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <h1>Sarah Wilson</h1>
                    <p>UX Designer</p>
                    <p>User experience expert</p>
                </div>
                <div class="flip-card-back">
                    4
                </div>
            </div>
        </div>

        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <h1>David Brown</h1>
                    <p>Data Scientist</p>
                    <p>Numbers tell stories</p>
                </div>
                <div class="flip-card-back">
                    5
                </div>
            </div>
        </div>

        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <h1>Lisa Garcia</h1>
                    <p>Marketing Lead</p>
                    <p>Spreading the word</p>
                </div>
                <div class="flip-card-back">
                    6
                </div>
            </div>
        </div>

        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <h1>Chris Lee</h1>
                    <p>Backend Developer</p>
                    <p>Server-side specialist</p>
                </div>
                <div class="flip-card-back">
                    7
                </div>
            </div>
        </div>

        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <h1>Amy Chen</h1>
                    <p>Quality Assurance</p>
                    <p>Ensuring perfection</p>
                </div>
                <div class="flip-card-back">
                    8
                </div>
            </div>
        </div>

        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <h1>Tom Anderson</h1>
                    <p>DevOps Engineer</p>
                    <p>Deployment master</p>
                </div>
                <div class="flip-card-back">
                    9
                </div>
            </div>
        </div>

        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <h1>Emma Taylor</h1>
                    <p>Product Owner</p>
                    <p>Vision and strategy</p>
                </div>
                <div class="flip-card-back">
                    10
                </div>
            </div>
        </div>
    </div> -->

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
.grid-text-centre {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .flip-card {
            background-color: transparent;
            width: 250px;
            height: 250px;
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
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
            }
            
            .flip-card {
                width: 200px;
                height: 200px;
            }
        }

</style>
