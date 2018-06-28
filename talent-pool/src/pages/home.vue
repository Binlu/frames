<template>
    <div>
    	<p>{{msg}}</p>

        <div class='wrap'>
          <div class='translate'>
            <div class='scale'></div>
          </div>
        </div>
        <div class='wrap'>
          <div class='translate'>
            <div class='scale'></div>
          </div>
        </div>
        <div class='wrap'>
          <div class='translate'>
            <div class='scale'></div>
          </div>
        </div>
        <div class='wrap'>
          <div class='translate'>
            <div class='scale'></div>
          </div>
        </div>
        <div class='wrap'>
          <div class='translate'>
            <div class='scale'></div>
          </div>
        </div>
        <div class='wrap'>
          <div class='translate'>
            <div class='scale'></div>
          </div>
        </div>
        <div class='wrap'>
          <div class='translate'>
            <div class='scale'></div>
          </div>
        </div>
        <div class='wrap'>
          <div class='translate'>
            <div class='scale'></div>
          </div>
        </div>
        <div class='wrap'>
          <div class='translate'>
            <div class='scale'></div>
          </div>
        </div>


    	<router-link to='/list'>立即进入》</router-link>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data () {
            return{msg: '欢迎来的极地人才库'}
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div.position-title{opacity: 0;}
    .wrap {
      /*bottom: 0;*/
      left: 50%;
      margin: -100px;
      position: absolute;
      /*right: 0;*/
      top: 50%;
      width: 200px;height: 200px;
    }

    .translate {
      -webkit-animation: translate 2000ms cubic-bezier(0.6, -0.28, 0.735, 0.045) infinite;
              animation: translate 2000ms cubic-bezier(0.6, -0.28, 0.735, 0.045) infinite;
      bottom: 0;
      height: 14px;
      left: 0;
      margin: auto;
      position: absolute;
      right: 0;
      top: 0;
      width: 14px;
    }

    .scale {
      -webkit-animation: scale 2000ms cubic-bezier(0.6, -0.28, 0.735, 0.045) infinite;
              animation: scale 2000ms cubic-bezier(0.6, -0.28, 0.735, 0.045) infinite;
      height: 100%;
      width: 100%;
    }

    .wrap:nth-child(1) {
      -webkit-transform: rotate(320deg);
              transform: rotate(320deg);
    }

    .wrap:nth-child(1) .translate,
    .wrap:nth-child(1) .scale {
      -webkit-animation-delay: 0ms;
              animation-delay: 0ms;
    }

    .wrap:nth-child(1) .scale {
      background: #ccff66;
    }

    .wrap:nth-child(2) {
      -webkit-transform: rotate(280deg);
              transform: rotate(280deg);
    }

    .wrap:nth-child(2) .translate,
    .wrap:nth-child(2) .scale {
      -webkit-animation-delay: -222.2222222222ms;
              animation-delay: -222.2222222222ms;
    }

    .wrap:nth-child(2) .scale {
      background: #66ffcc;
    }

    .wrap:nth-child(3) {
      -webkit-transform: rotate(240deg);
              transform: rotate(240deg);
    }

    .wrap:nth-child(3) .translate,
    .wrap:nth-child(3) .scale {
      -webkit-animation-delay: -444.4444444444ms;
              animation-delay: -444.4444444444ms;
    }

    .wrap:nth-child(3) .scale {
      background: #6666ff;
    }

    .wrap:nth-child(4) {
      -webkit-transform: rotate(200deg);
              transform: rotate(200deg);
    }

    .wrap:nth-child(4) .translate,
    .wrap:nth-child(4) .scale {
      -webkit-animation-delay: -666.6666666667ms;
              animation-delay: -666.6666666667ms;
    }

    .wrap:nth-child(4) .scale {
      background: #ff66cc;
    }

    .wrap:nth-child(5) {
      -webkit-transform: rotate(160deg);
              transform: rotate(160deg);
    }

    .wrap:nth-child(5) .translate,
    .wrap:nth-child(5) .scale {
      -webkit-animation-delay: -888.8888888889ms;
              animation-delay: -888.8888888889ms;
    }

    .wrap:nth-child(5) .scale {
      background: #ffcc66;
    }

    .wrap:nth-child(6) {
      -webkit-transform: rotate(120deg);
              transform: rotate(120deg);
    }

    .wrap:nth-child(6) .translate,
    .wrap:nth-child(6) .scale {
      -webkit-animation-delay: -1111.1111111111ms;
              animation-delay: -1111.1111111111ms;
    }

    .wrap:nth-child(6) .scale {
      background: #66ff66;
    }

    .wrap:nth-child(7) {
      -webkit-transform: rotate(80deg);
              transform: rotate(80deg);
    }

    .wrap:nth-child(7) .translate,
    .wrap:nth-child(7) .scale {
      -webkit-animation-delay: -1333.3333333333ms;
              animation-delay: -1333.3333333333ms;
    }

    .wrap:nth-child(7) .scale {
      background: #66ccff;
    }

    .wrap:nth-child(8) {
      -webkit-transform: rotate(40deg);
              transform: rotate(40deg);
    }

    .wrap:nth-child(8) .translate,
    .wrap:nth-child(8) .scale {
      -webkit-animation-delay: -1555.5555555556ms;
              animation-delay: -1555.5555555556ms;
    }

    .wrap:nth-child(8) .scale {
      background: #cc66ff;
    }

    .wrap:nth-child(9) {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
    }

    .wrap:nth-child(9) .translate,
    .wrap:nth-child(9) .scale {
      -webkit-animation-delay: -1777.7777777778ms;
              animation-delay: -1777.7777777778ms;
    }

    .wrap:nth-child(9) .scale {
      background: #ff6666;
    }

    @-webkit-keyframes translate {
      0% {
        -webkit-transform: translate3d(-600%, 0, 0);
                transform: translate3d(-600%, 0, 0);
      }
      50% {
        -webkit-transform: translate3d(600%, 0, 0);
                transform: translate3d(600%, 0, 0);
      }
      100% {
        -webkit-transform: translate3d(-600%, 0, 0);
                transform: translate3d(-600%, 0, 0);
      }
    }

    @keyframes translate {
      0% {
        -webkit-transform: translate3d(-600%, 0, 0);
                transform: translate3d(-600%, 0, 0);
      }
      50% {
        -webkit-transform: translate3d(600%, 0, 0);
                transform: translate3d(600%, 0, 0);
      }
      100% {
        -webkit-transform: translate3d(-600%, 0, 0);
                transform: translate3d(-600%, 0, 0);
      }
    }
    @-webkit-keyframes scale {
      0% {
        -webkit-transform: translateZ(0) scale(0.75, 1);
                transform: translateZ(0) scale(0.75, 1);
      }
      25% {
        -webkit-transform: translateZ(0) scale(1.5, 0.5);
                transform: translateZ(0) scale(1.5, 0.5);
      }
      50% {
        -webkit-transform: translateZ(0) scale(0.75, 1);
                transform: translateZ(0) scale(0.75, 1);
      }
      75% {
        -webkit-transform: translateZ(0) scale(1.5, 0.5);
                transform: translateZ(0) scale(1.5, 0.5);
      }
      100% {
        -webkit-transform: translateZ(0) scale(0.75, 1);
                transform: translateZ(0) scale(0.75, 1);
      }
    }
    @keyframes scale {
      0% {
        -webkit-transform: translateZ(0) scale(0.75, 1);
                transform: translateZ(0) scale(0.75, 1);
      }
      25% {
        -webkit-transform: translateZ(0) scale(1.5, 0.5);
                transform: translateZ(0) scale(1.5, 0.5);
      }
      50% {
        -webkit-transform: translateZ(0) scale(0.75, 1);
                transform: translateZ(0) scale(0.75, 1);
      }
      75% {
        -webkit-transform: translateZ(0) scale(1.5, 0.5);
                transform: translateZ(0) scale(1.5, 0.5);
      }
      100% {
        -webkit-transform: translateZ(0) scale(0.75, 1);
                transform: translateZ(0) scale(0.75, 1);
      }
    }

</style>
