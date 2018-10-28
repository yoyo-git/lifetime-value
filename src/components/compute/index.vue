<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import './style.less';
</style>
<template>
  <div class="hello">
    <swiper height="800px" :show-dots="false" v-model="swiperIndex">
      <swiper-item class="black">
        <div class="download-link">
          <a href="#">某APP的下载链接</a>
        </div>
        <div>
          <div class="compute-title">让我更加了解你</div>
          <div class="compute-form">
            <group>
              <x-input type="number" title="月薪（元）" text-align="right" :max="maxSalary" :min="minSalary" :debounce="10" v-model="salary" placeholder="输入薪资" @on-change="onSalaryChange"></x-input>
              <x-input type="number" title="薪资增长率（%）" text-align="right" :max="maxRatio" :min="minRatio" :debounce="10" v-model="growthRatio" placeholder="输入增长率" @on-change="onRatioChange"></x-input>
              <datetime
              title="出生日期"
              format="YYYY-MM"
              v-model="birthDay"
              :min-year="minYear"
              :max-year="maxYear"
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
          <div class="more-link" v-if="resultStatus">
            <div class="weui-panel weui-panel_access">
              <div class="weui-panel__bd">
                <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg" v-for="(link, key) of links" :key="key">
                  <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" src="../../assets/app.png">
                  </div>
                  <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{link.title}}</h4>
                    <p class="weui-media-box__desc">{{link.desc}}</p>
                  </div>
                </a>
              </div>
              <cell title="查看更多"is-link></cell>
            </div>
          </div>
        </div>
      </swiper-item>
      <swiper-item class="black" v-if="resultStatus">
        <div class="result">
          <div class="result-title">
            <span class="icon iconfont icon-qian"></span>
            您的人生价值
          </div>
          <div class="money-number">
            <countup :end-val="allSalary" :duration="2" :start="!computeStatus" class="demo1"></countup>
            {{unit}}元
          </div>
          <div class="submit-btn  recompute-btn" @click="reComputeValue">分享按钮</div>
          <div class="result-qrcode">
            <qrcode value="https://vux.li?x-page=demo_qrcode" type="img"></qrcode>
          </div>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import script from './script.js'
  export default script
</script>


