<template>
    <div class="chooser-component">
        <ul class="chooser-list">
          <li v-for="(item, index) in selections" 
            @click="updateChoosedIndexes(index)"
            :class="{active: isChoosed(index)}" 
          >{{ item.label }}</li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    selections: {
      type: Array,
      default: () => {
        return [{
          label: 'test',
          value: 0
        }]
      }
    }
  },
  data () {
    return {
      choosedIndexes: [0]
    }
  },
  methods: {
    updateChoosedIndexes (index) {
      // update local data
      let pos = this.choosedIndexes.indexOf(index)
      if (pos > -1) {
        this.choosedIndexes.splice(pos, 1)
      } else {
        this.choosedIndexes.push(index)
      }

      // pass the updated choosed data to father component
      let choosedArr = this.choosedIndexes.map((item) => {
        return this.selections[item]
      })
      this.$emit('on-change',choosedArr)
    },
    isChoosed (index) {
      return this.choosedIndexes.indexOf(index) > -1
    }
  }
}
</script>

<style scoped>
.chooser-component{
  position: relative;
  display: inline-block;
}
.chooser-list li{
  display: inline-block;
  border: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.chooser-list li.active{
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>