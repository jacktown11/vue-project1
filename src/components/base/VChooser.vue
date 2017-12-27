<template>
    <div class="chooser-component">
        <ul class="chooser-list">
        	<li v-for="(item, index) in selections" 
        		@click="updateChoosed(index)" 
        		:class="{active: index === choosedIndex}">
        		{{item.label}}
        	</li>
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
    	choosedIndex: 0
    }
  },
  methods: {
  	updateChoosed (index) {
  		this.choosedIndex = index
  		this.$emit('on-change',this.selections[this.choosedIndex])
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
	margin: 5px;
	border-radius: 3px;
	text-align: center;
	cursor: pointer;
}
.chooser-list li.active{
	background-color: #4fc08d;
	background: #4fc08d;
	color: #fff;
}
</style>