<template>
  <div>
    <div class="login">
      <div id="particlesLogin"></div>
      <el-form
        class="card-box"
        ref="loginForm"
        :rules="rules"
        :model="loginForm"
      >
        <el-form-item prop="name"
          ><span class="loginText">用户名登陆</span></el-form-item
        >
        <el-form-item>
          <i class="user" aria-hidden="true"></i>
          <input
            type="text"
            class="loginInput"
            placeholder="请输入用户名"
            v-model="loginForm.name"
          />
        </el-form-item>
        <el-form-item prop="pass">
          <i class="password" aria-hidden="true" style="font-size: 20px"></i>
          <input
            type="password"
            class="loginInput"
            placeholder="请输入密码"
            v-model="loginForm.pass"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="loginButton"
            type="primary"
            @click="clickLogin('loginForm')"
            >登录</el-button
          >
          <!-- <el-button class="resetButton" @click="resetForm('loginForm')">重置</el-button> -->
        </el-form-item>
        <a
          ><span style="font-size: 13px" class="loginText"
            >请仔细填写用户名和密码哦！</span
          ></a
        >
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { setToken, setUserInfo} from "@/utils/common";
import { login } from "@/api/user/login";
export default {
  data() {
    return {
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
    ...mapActions(["setUser"]),
    clickLogin(loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          login({
            username: this.loginForm.name,
            password: this.loginForm.pass
          })
            .then(r => {
              if (r.code == 200) {
                setUserInfo(r.data.user);
                setToken(r.data.token);
                this.setUser(r.data.user)
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
  }
};
</script>
<style>
.loginText {
  color: #7d7e7f;
}
.loginButton {
  width: 250px;
  border-radius: 15px;
}
.resetButton {
  width: 250px;
  border-radius: 15px;
}
#particlesLogin {
  position: absolute;
  width: 100%;
  height: 100vh;
  background: url("../assets/imgs/load_bg.jpg") no-repeat;
  background-size: 100% 100%;
}
.container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.card-box {
  position: absolute;
  background-color: ghostwhite;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);
  padding: 40px;
  border-radius: 5px;
  margin: 0 auto;
  width: 300px;
  opacity: 0.99;
}
.loginInput {
  color: black;
  background-color: transparent;
  height: 30px;
  width: 250px;
  border-radius: 15px;
  border: 1px solid #7d7e7f;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  text-indent: 50px;
  outline: medium;
}
</style>
