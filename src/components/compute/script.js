import { Group, XInput, Icon, Datetime, XButton, CellBox, Qrcode, Countup, Cell } from 'vux'
export default {
  name: 'HelloWorld',
  components: {
    Group,
    XInput,
    Icon,
    Datetime,
    XButton,
    Cell,
    CellBox,
    Qrcode,
    Countup
  },
  data () {
    return {
      minYear: 1960,
      maxYear: Number((new Date()).getFullYear() - 1),
      salary: '',
      growthRatio: '',
      sexal: 'male',
      birthDay: '1990-01',
      computeStatus: true,
      unit: '元',
      links: [{
        url: '',
        title: '今日事今日毕',
        desc: '加班少了，人也精神了，安排工作合适含量'
      }, {
        url: '',
        title: '升值有望',
        desc: '为公司加班哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈'
      }, {
        url: '',
        title: '升值有望',
        desc: '为公司加班哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈'
      }, {
        url: '',
        title: '升值有望',
        desc: '为公司加班哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈'
      }, {
        url: '',
        title: '升值有望',
        desc: '为公司加班哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈'
      }, {
        url: '',
        title: '升值有望',
        desc: '为公司加班哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈'
      }, {
        url: '',
        title: '升值有望',
        desc: '为公司加班哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈'
      }]
    }
  },
  computed: {
    allSalary () {
      let salary = isNaN(Number(this.salary)) ? 0 : Number(this.salary) // 月薪
      if (salary === 0) {
        this.unit = '元'
        return 0
      }
      let growthRatio = isNaN(Number(this.growthRatio)) ? 0 : Number(this.growthRatio) // 工资增长率
      growthRatio = growthRatio / 100
      let nowYeay = Number((new Date()).getYear()) // 当前年份
      let birthYear = Number((new Date(this.birthDay)).getYear()) // 出生年份
      let limitAge = this.sexal === 'male' ? 60 : 55 // 退休年龄
      let age = nowYeay - birthYear // 当前岁数
      let leftYear = limitAge - age // 剩余工作年
      if (leftYear <= 0) {
        this.unit = '元'
        return 0
      }
      let total = 0
      for (let i = 0; i < leftYear; i++) {
        total += salary * 12
        salary = salary * (1 + growthRatio)
      }
      let fomaterData = this.money_format(total, '')
      this.unit = fomaterData.unit
      return fomaterData.data
    }
  },
  methods: {
    change (value) {
      console.log('change', value)
    },
    computeValue () {
      this.computeStatus = false
    },
    reComputeValue () {
      this.computeStatus = true
    },
    money_format (value, symbol) { // 两个参数，一个是值，一个是货币类型（￥,$）
      var obj = {
        symbol: symbol || '',    // 货币类型
        int: undefined,    // 整数位
        dec: undefined,  // 小数位
        targ: '',          // 正负
        times: ['', '万', '亿', '万亿', '亿亿']
      }
      value = String(value)
      var times = 0
      value = Number(value)
      while (value > 10000) {
        value = value / 10000
        times++
      }
      value = value.toFixed(2)
      return {
        data: Number(value),
        unit: obj.times[times]
      }
    }
  },
  created () {
  }
}
