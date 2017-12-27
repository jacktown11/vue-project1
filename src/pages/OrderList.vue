<template>
  <div class="order-wrap">
    <h3>您的产品</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
        <v-selection :selections="products" @on-change="updatePruductType"></v-selection>
      </div>

      <div class="order-list-option datepicker-cmp">
        开始日期：
        <v-date-picker v-model="params.startDate"></v-date-picker>
      </div>

      <div class="order-list-option datepicker-cmp">
        结束日期：
        <v-date-picker v-model="params.endDate"></v-date-picker>         
      </div>

      <div class="order-list-option">
        关键词：
        <input type="text" v-model.lazy="params.queryStr" class="order-query">
      </div>
    </div>
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="item in tableHeads" 
              @click="sortBy(item)" 
              :class="{active: item.isActive}">{{item.label}}</th>
        </tr> 
        <tr v-for="item in shownOrders">
          <td v-for="col in tableHeads">{{item[col.key]}}</td>
        </tr>
      </table>
    </div>
    <ul class="page-divide">
      <li @click="goToPage(1)">首页</li>
      <li @click="goToPrevPage()">&lt;&lt;</li>
      <li v-for="page in maxPage" 
          :class="{active: page === nowPage}" 
          @click="goToPage(page)">{{page}}</li>
      <li  @click="goToNextPage()">&gt;&gt;</li>
      <li  @click="goToPage(maxPage)">尾页</li>
    </ul>
  </div>
</template>

<script>
import VSelection from '../components/base/VSelection'
import VDatePicker from 'vue-datepicker-local'

export default {
  components: {
    VSelection,
    VDatePicker
  },
  data () {
    return {
      params: {
        product: {},
        startDate: new Date(),
        endDate: new Date(),
        queryStr: ''        
      },
      products: [
        {
          label: '数据统计',
          value: 0
        },
        {
          label: '数据预测',
          value: 1
        },
        {
          label: '流量分析',
          value: 2
        },
        {
          label: '广告发布',
          value: 3
        }
      ],
      tableHeads: [
        {
          label: '订单号',
          key: 'orderId'
        },
        {
          label: '购买产品',
          key: 'product'
        },
        {
          label: '版本类型',
          key: 'version'
        },
        {
          label: '有效时间',
          key: 'period'
        },
        {
          label: '购买日期',
          key: 'date'
        },
        {

          label: '数量',
          key: 'buyNum'
        },
        {

          label: '总价',
          key: 'amount'
        }
      ],
      resultOrders: [],
      sortKey: '',
      sortType: 'asc',
      nowPage: 1,
      eachPageCount: 5
    }
  },
  watch: {
    params: {
      handler () {
        this.newQuery()        
      },
      deep: true
    }
  },
  computed: {
    maxPage () {
      return Math.ceil(this.resultOrders.length / this.eachPageCount)
    },
    shownOrders () {
      let start = (this.nowPage-1) * this.eachPageCount
      return this.resultOrders.slice(start, start + this.eachPageCount)
    }
  },
  methods: {
    updatePruductType (value) {
      this.product = value
    },
    newQuery () {
      // reset for showing new data
      this.nowPage = 1
      this.tableHeads.forEach((item) => {
        item.isActive = false
      })

      // request new data
      let reqPara = {
        productType: this.params.product.value,
        startDate: this.params.startDate,
        endDate: this.params.startDate,
        queryStr: this.params.queryStr
      }
      this.$http.post('/api/getOrderList')
      .then((res) => {
        this.resultOrders = res.data.orderList
      }, (err) => {
        console.log(err)
      })
    },
    sortBy (headItem) {
      let key = headItem.key

      // let the selected column's head highlighted
      this.tableHeads.forEach((item) => {
        item.isActive = false
      })
      headItem.isActive = true

      //sort the resultOrders by the headItem
      if(this.sortKey !== key){
        // new sort column, defaultly use increase sort
        this.sortKey = key
        let sortType = this.sortType = 'asc'

        this.resultOrders = this.resultOrders.sort((a, b) => {
          let compare,
              tmpA = String(a[key]),
              tmpB = String(b[key])
          switch (key) {
            case 'period':
              tmpA = ((tmpA.indexOf('年') > -1)?100:1) * Number(tmpA.replace(/\D/g, ''))
              tmpB = ((tmpB.indexOf('年') > -1)?100:1) * Number(tmpB.replace(/\D/g, ''))
              compare = tmpA - tmpB
              break
            case 'date': 
              tmpA = tmpA.split('-').map((item) => {
                return ('0' + item).slice(-2)
              }).join('')
              tmpB = tmpB.split('-').map((item) => {
                return ('0' + item).slice(-2)
              }).join('')
              compare = Number(tmpA) - Number(tmpB) 
              break
            case 'buyNum':
              compare = Number(tmpA) - Number(tmpB)
              break
            case 'amount':
              compare = Number(tmpA.replace(/\D/g, '')) - 
                        Number(tmpB.replace(/\D/g, ''))
              break
            default: 
              compare = String(a[key]).localeCompare(String(b[key]))
              break
          }
          return sortType === 'asc' ? compare : -compare
        })
      } else {
        // old sort column, reverse the list
        this.sortType = this.sortType === 'asc'? 'desc' : 'asc'
        this.resultOrders = this.resultOrders.reverse()
      }
    },
    goToPage (page) {
      this.nowPage = page
    },
    goToPrevPage () {
      if (this.nowPage !== 1) {
        this.goToPage(this.nowPage - 1)
      }
    },
    goToNextPage () {
      if (this.nowPage !== this.maxPage) {
        this.goToPage(this.nowPage + 1)
      }
    }
  },
  mounted () {
    this.params.product = this.products[0]
    this.newQuery()
  }
}
</script>

<style scoped>
.order-wrap{
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3{
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query{
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option{
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child{
  padding-left: 0;
}
.order-list-table{
  margin-top: 20px;
}
.order-list-table table{
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th{
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th{
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}
.order-list-table th.active{
  background: #35495e;
}
.page-divide{
  list-style-type: none;
  margin-top: 8px;
}
.page-divide li{
  display: inline-block;
  width: 36px;
  height: 25px;
  margin: 4px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  text-align: center;
  background: #fff;
  cursor: pointer;
  user-select: none;
}
.page-divide li.active{
  border: 1px solid #4fc08d;
  background-color: #6fc08d;
}
.datepicker-cmp /deep/ .datepicker>input{
  border-radius: 3px;
  height: 27px;
}
</style>
