<template>
  <!-- eslint-disable -->
  <div class="con">
    <div class="loader-2 center">
      <span></span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.con {
  display: flex;
  justify-content: center;
  align-items: center;
}
*,
::after,
::before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.loader-2 {
  position: relative;
  display: block;
  height: 100px;
  width: 100px;
  -webkit-animation: loader-2-1 3s linear infinite;
  animation: loader-2-1 3s linear infinite;
}
@-webkit-keyframes loader-2-1 {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes loader-2-1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loader-2 span {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  height: 100px;
  width: 100px;
  clip: rect(50px, 100px, 100px, 0);
  -webkit-animation: loader-2-2 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
  animation: loader-2-2 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
}
@-webkit-keyframes loader-2-2 {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes loader-2-2 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loader-2 span::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  height: 100px;
  width: 100px;
  border: 3px solid transparent;
  border-top: 3px solid #fff;
  border-radius: 50%;
  -webkit-animation: loader-2-3 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
  animation: loader-2-3 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
}
@-webkit-keyframes loader-2-3 {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes loader-2-3 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loader-2 span::after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  height: 100px;
  width: 100px;
  border: 3px solid #a0c601;
  border-radius: 50%;
}
</style>
