<template>
   <div class="slide-show" @mouseover="stopAutoRun" @mouseleave="startAutoRun">
    <div class="slide-img">
        <a :href="slides[nowIndex].href"
          >
          <transition name="slide-trans">
            <img v-if="isShow" :src="slides[nowIndex].src"> 
          </transition>
          <transition name="slide-trans-old">
            <img v-if="!isShow" :src="slides[nowIndex].src">        
          </transition>
       </a>
    </div>
    <h2>{{slides[nowIndex].title}}</h2>
    <ul class="slide-pages">
      <li @click="goto(prevSlide)">&lt;</li>
      <li v-for="(item,index) in slides">
        <span @click="goto(index)" :class="{on: index === nowIndex}">{{index+1}}</span>
      </li>
      <li @click="goto(nextSlide)">&gt;</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default: []
    },
    looptime: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      isShow: true,
      nowIndex: 0,
      intervalId: 0
    }
  },
  computed: {
    prevSlide () {
      if (this.nowIndex === 0) {
        return this.slides.length - 1
      } else {
        return this.nowIndex - 1
      }
    },
    nextSlide () {
      if (this.nowIndex === this.slides.length - 1) {
        return 0
      } else {
        return this.nowIndex + 1
      }
    }
  },
  methods: {
    goto (index) {
      this.isShow = false
      setTimeout(() => {
        this.isShow = true
        this.nowIndex = index
      }, 10)
    },
    startAutoRun () {
      this.intervalId = setInterval(() => {
        this.goto(this.nextSlide)
      }, this.looptime)
    },
    stopAutoRun () {
      clearInterval(this.intervalId)
    }
  },
  mounted () {
    this.startAutoRun()
  }
}
</script>

<style scoped>
.slide-trans-enter-active {
  transition: all 0.5s;
}
.slide-trans-enter {
  transform: translateX(900px);
}
.slide-trans-old-leave-active {
  transition: all 0.5s;
  transform: translateX(-900px);
}
.slide-show {
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 500px;
  overflow: hidden;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  height: 30px;
  line-height: 30px;
  text-align: left;
  padding-left: 15px;
}
.slide-img {
  /*transform: translateX(10px);*/
  width: 100%;
}
.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
  user-select: none;
}
.slide-pages li .on {
  text-decoration: underline;
}
</style>
