<template>
  <div class="about" id="about" name="about">
    <div class="about-header"></div>

    <div style="width: 0 auto; margin: 0 auto;">
      <div class="banner">
        <img
          src="../assets/imgs/us_banner.jpg"
          alt=""
          style="width: 100%; height: 100%"
        />

        <div
          class="text1"
          style="font-size:20px; 
		  position:absolute; 
		  bottom:50px;
		  color: #7d7e7f; 
		  width: 1500px; 
		  height: 500px"
        >
          <el-row>
            <el-col :span="13" :offset="1">
              <span
                >母婴商城拥有雄厚的资本实力、无比人性化的客户服务能力，强大的技术力量，
                以及熟稔的运营能力。在国外拥有良好的沟通渠道和产品代购渠道。从而得到第一手的产品货源，
                以及最即时的产品资料、使用问题等解决方案。始终秉承“用户至上，用心服务”的理念，坚守行业领军地位。</span
              >
            </el-col>
          </el-row>
        </div>
        <img
          class="top"
          src="../assets/imgs/us_img3.png"
          alt=""
          style="width: 100%; height: 80%"
        />
      </div>
    </div>
  </div>
</template>
<script></script>
<style scoped>
.banner {
  position: relative;
  width: auto;
  margin: 0 auto;
}
/* .about .about-header {
  height: 64px;
  background-color: #fff;
  border-bottom: 2px solid #ff6700;
} */
/* .about .about-header .about-title {
  width: 1225px;
  margin: 0 auto;
  height: 64px;
  line-height: 64px;
  font-size: 28px;
} */
.about .content {
  padding: 20px 0;
  width: 1225px;
  margin: 0 auto;
}
.about .content .goods-list {
  margin-left: -13.7px;
  overflow: hidden;
}
.about .about-content {
  width: 1225px;
  margin: 0 auto;
  background-color: #fff;
}
</style>
