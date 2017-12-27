<template>
    <div class="counter-component">
      <div class="counter-btn" 
        @click="minus"> - </div>
      <div class="counter-show">
        <input type="text" v-model="num" @keyup="fixNum" @focus="selectText($event)">
      </div>
      <div class="counter-btn" @click="add"> + </div>
    </div>
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 20
    }
  },
  data () {
    return {
      num: 1 
    }
  },
  watch: {
    num () {
      if(this.num === this.toRange(this.num)) {
        // if this.num has been fixed to the right range
        this.$emit('on-change',this.num)      
      }
    }
  },
  methods: {
    add () {
      if (this.num < this.max) {
        this.num++
      }
    },
    minus () {
      if (this.num > this.min) {
        this.num--
      }
    },
    toRange () {
      let fix = Number(String(this.num).replace(/\D/g,''))
      return Math.max(this.min, Math.min(this.max, fix))
    },
    fixNum () {
      this.num = this.toRange(this.num)
    },
    selectText (event) {
      if (typeof event.currentTarget.select === 'function') {
        event.currentTarget.select()      
      }
    }
  }
}
</script>

<style scoped>
.counter-component{
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
}
.counter-show{
  float: left;  
}
.counter-show input{
  border: none;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  height: 23px;
  line-height: 23px;
  width: 30px;
  outline: none;
  text-indent: 4px;
}
.counter-btn{
  border: 1px solid #e3e3e3;
  float: left;
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  cursor: pointer;
}
.counter-btn:hover{
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>
