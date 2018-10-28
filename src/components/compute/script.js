import { Group, XInput, Icon, Datetime, XButton, CellBox, Qrcode, Countup, Cell, Panel, Swiper, SwiperItem } from 'vux'
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
    Countup,
    Panel,
    Swiper,
    SwiperItem
  },
  data () {
    return {
      minSalary: 1,
      maxSalary: 99999999, // 9999,9999
      minRatio: 0,  // 最小增长率
      maxRatio: 100, // 最大增长率
      minYear: 1960,  // 出生最小年
      maxYear: Number((new Date()).getFullYear() - 1), // 出生最大年
      salary: '', // 薪资
      growthRatio: '', // 薪资增长率
      sexal: 'male', // 性别
      birthDay: '1990-01', // 出生年月
      computeStatus: true,  // 填写信息： true， 显示结果： false
      unit: '', // 结果单位
      links: [{
        src: '../assets/male.png',
        title: '标题一',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: '/component/cell'
      }, {
        src: '../assets/male.png',
        title: '标题二',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/component/radio',
          replace: false
        },
        meta: {
          source: '来源信息',
          date: '时间',
          other: '其他信息'
        }
      }],
      swiperIndex: 0,
      resultStatus: false
    }
  },
  computed: {
    allSalary () {
      let salary = isNaN(Number(this.salary)) ? 0 : Number(this.salary) // 月薪
      if (salary === 0) {
        this.unit = ''
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
        this.unit = ''
        return 0
      }
      let total = 0
      for (let i = 0; i < leftYear; i++) {
        total += salary * 12
        salary = salary * (1 + growthRatio)
      }
      let fomaterData = this.money_format(total)
      this.unit = fomaterData.unit
      return fomaterData.data
    }
  },
  methods: {
    /**
     * 对输入薪资做数值转换
     * @param {String} val 薪资变化值
     */
    onSalaryChange (val) {
      let value = Number(val)
      if (isNaN(value) || value < this.minSalary) {
        this.salary = 0
      } else {
        if (value >= this.minSalary && value <= this.maxSalary) {
          this.salary = value
        } else {
          this.salary = this.maxSalary
        }
      }
    },
    /**
     * 对输入增长率做数值转换
     * @param {String} val 增长率变化值
     */
    onRatioChange (val) {
      let value = Number(val)
      if (isNaN(value) || value < this.minRatio) {
        this.growthRatio = 0
      } else {
        if (value >= this.minRatio && value <= this.maxRatio) {
          this.growthRatio = value
        } else {
          this.growthRatio = this.maxRatio
        }
      }
    },
    /**
     * 响应计算按钮事件
     */
    computeValue () {
      this.resultStatus = true
      this.swiperIndex = 1
      this.computeStatus = false
    },
    /**
     * 响应重新计算事件
     */
    reComputeValue () {
      this.computeStatus = true
    },
    /**
     * 对金额单位做换算
     * @param {Number} value 薪资值
     */
    money_format (value) { // 两个参数，一个是值
      var obj = {
        int: undefined,    // 整数位
        dec: undefined,  // 小数位
        targ: '',          // 正负
        times: ['', '万', '亿', '万亿', '亿亿']
      }
      value = String(value)
      var times = 0
      value = Number(value)
      while (value > 10000 && times <= 4) {
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
