<template>
  <div
    id="login"
    class="login"
    style="width: 100vw;height: 100vh;display: flex;justify-content: center;align-items: center"
  >
    <el-form
      ref="loginForm"
      :rules="rules"
      :model="loginForm"
      label-width="80px"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="loginForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="loginForm.pass" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="clickLogin('loginForm')"
          >登录</el-button
        >
        <el-button @click="resetForm('loginForm')" style="margin-left:120px"
          >重置</el-button
        >
        <el-row>
          <el-col :span="12">
            <el-link type="primary">注册</el-link>
          </el-col>
          <el-col :span="12" style="text-align:right">
            <el-link type="primary">忘记密码</el-link>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { setToken } from "@/utils/common";
import { login } from "@/api/user/login";
export default {
  name: "login",
  data() {
    return {
      activeName: "second",
      loginForm: {
        name: "",
        pass: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

    clickLogin(loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          login({
            username: this.loginForm.name,
            password: this.loginForm.pass
          })
            .then(r => {
              // console.log(r);
              if (r != null) {
                setToken("HJDF844GDFG5D8J7FGHFG5");
                this.$router.push("/");
              } else {
                this.$alert("用户名或密码错误", "提示", {
                  confirmButtonText: "确定"
                });
              }
            })
            .catch(() => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(loginForm) {
      this.$refs[loginForm].resetFields();
    }
  },
  mounted: function() {}
};
</script>

<style>
footer {
  position: absolute;
  bottom: 0px;
  height: 79px;
  border-top: 1px solid #ddd;
  width: 100%;
  background: #f7f7f7;
}
.sub-foot {
  width: 1000px;
  margin: 0 auto;
  text-align: center;
}
.sub-foot li {
  display: inline-block;
  height: 30px;
  line-height: 30px;
}
.sub-foot p {
  height: 30px;
  line-height: 30px;
}

.login {
  width: 100%;
  height: 100%;
  background-image: url(../assets/imgs/login.png);
  background-size: cover; /* 使图片平铺满整个浏览器（从宽和高的最大需求方面来满足，会使某些部分无法显示在区域中） */
  position: absolute; /* 不可缺少 */
  z-index: -1;
  background-repeat: no-repeat;
  /* overflow: hidden; */
  /* overflow: auto; */
}
</style>
