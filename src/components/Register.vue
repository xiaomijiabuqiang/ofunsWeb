<template>
  <div
    id="register"
    class="register"
    style="width: 100vw;height: 100vh;display: flex;justify-content: center;align-items: center"
  >
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" minlength="2" maxlength="12"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          show-password
          minlength="6"
          maxlength="18"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="form.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register('form')">注册</el-button>
        <el-button @click="reset('form')" style="margin-left:120px"
          >重置</el-button
        >
      </el-form-item>
      <el-form-item>
        已有账号？<el-link type="primary" @click="login">点击这里</el-link>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { setToken } from "@/utils/common";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    register(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          setToken("HJDF844GDFG5D8J7FGHFG5");
          alert("注册成功");
          this.$router.push("/login");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    },
    login() {
      this.$router.push("/login");
    }
  },
  mounted: function() {}
};
</script>
<style>
.register {
  width: 100%;
  height: 100%;
  background-image: url(../assets/imgs/login.png);
  background-size: cover; /* 使图片平铺满整个浏览器（从宽和高的最大需求方面来满足，会使某些部分无法显示在区域中） */
  position: absolute; /* 不可缺少 */
  z-index: -1;
  background-repeat: no-repeat;
  /* overflow: hidden; */
  /* overflow: auto; */
}</style
>>
