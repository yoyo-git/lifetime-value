<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import './style.less';
</style>
<template>
  <div class="hello">
    <div class="download-link">
      <a href="#">某APP的下载链接</a>
    </div>
    <div v-show="computeStatus">
      <div class="compute-title">让我更加了解你</div>
      <div class="compute-form">
        <group>
          <x-input type="number" title="月薪（元）" required  text-align="right" :max="999999999" :min="1" v-model="salary" placeholder="输入薪资"></x-input>
          <x-input type="number" title="薪资增长率（%）" text-align="right" :max="9999" :min="0" v-model="growthRatio" placeholder="输入增长率"></x-input>
          <datetime
          title="出生日期"
          format="YYYY-MM"
          v-model="birthDay"
          :min-year="minYear"
          :max-year="maxYear"
          @on-change="change"
          ></datetime>
          <cell-box>
            <div class="title-label">性别</div>
            <div class="sex-checker" @click="sexal='male'">
              <img src="../../assets/male.png">
              <div>
                <icon type="success" v-if="sexal=== 'male'"></icon>
                <icon type="success-circle" v-else></icon>
              </div>
            </div>
            <div class="sex-checker" @click="sexal='female'">
              <img src="../../assets/female.png">
              <div>
                <icon type="success" v-if="sexal=== 'female'"></icon>
                <icon type="success-circle" v-else></icon>
              </div>
            </div>
          </cell-box>
        </group>
        <div class="submit-btn compute-btn" @click="computeValue">计算你的人生价值</div>
      </div>
      <div class="more-link">
        <group>
          <cell :title="link.title" is-link v-for="(link, key) of links" :key="key"></cell>
        </group>
      </div>
    </div>
    <div class="result" v-show="!computeStatus">
      <div class="result-title">
        <span class="icon iconfont icon-qian"></span>
        您的人生价值
      </div>
      <div class="money-number">
        <countup :end-val="allSalary" :duration="2" :start="!computeStatus" class="demo1"></countup>
         {{unit}}元
      </div>
      <div class="submit-btn  recompute-btn" @click="reComputeValue">重新计算</div>
      <div class="result-qrcode">
        <qrcode value="https://vux.li?x-page=demo_qrcode" type="img"></qrcode>
      </div>
    </div>
  </div>
</template>

<script>
  import script from './script.js'
  export default script
</script>


