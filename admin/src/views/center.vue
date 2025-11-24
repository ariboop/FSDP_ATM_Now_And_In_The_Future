<template>
  <div :style='{"color":"#666","padding":"20px 30px 30px","fontSize":"14px"}'>
    <el-form
	  :style='{"border":"1px solid rgba(255,255,255,1)","padding":"30px","borderRadius":"4px","alignItems":"flex-start","flexWrap":"wrap","background":"rgba(255,255,255,.8)","display":"flex","fontSize":"inherit"}'
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      label-width="150px"
    >  
     <el-row>
        <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='juyuan'"  label="柜员工号" prop="juyuangonghao">
          <el-input v-model="ruleForm.juyuangonghao" readonly              placeholder="柜员工号" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='juyuan'"  label="柜员姓名" prop="juyuanxingming">
          <el-input v-model="ruleForm.juyuanxingming"               placeholder="柜员姓名" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' v-if="flag=='juyuan'"  label="性别" prop="xingbie">
          <el-select v-model="ruleForm.xingbie"  placeholder="请选择性别">
            <el-option
                v-for="(item,index) in juyuanxingbieOptions"
                v-bind:key="index"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='juyuan'"  label="年龄" prop="nianling">
          <el-input v-model="ruleForm.nianling"               placeholder="年龄" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='juyuan'"  label="柜员手机" prop="juyuanshouji">
          <el-input v-model="ruleForm.juyuanshouji"               placeholder="柜员手机" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' v-if="flag=='juyuan'" label="photo" prop="touxiang">
          <file-upload
          tip="点击上传头像"
          action="file/upload"
          :limit="3"
          :multiple="true"
          :fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
          @change="juyuantouxiangUploadChange"
          ></file-upload>
        </el-form-item>
        <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='daikuanzhuanyuan'"  label="员工工号" prop="yuangonggonghao">
          <el-input v-model="ruleForm.yuangonggonghao" readonly              placeholder="员工工号" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='daikuanzhuanyuan'"  label="员工姓名" prop="yuangongxingming">
          <el-input v-model="ruleForm.yuangongxingming"               placeholder="员工姓名" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' v-if="flag=='daikuanzhuanyuan'"  label="性别" prop="xingbie">
          <el-select v-model="ruleForm.xingbie"  placeholder="请选择性别">
            <el-option
                v-for="(item,index) in daikuanzhuanyuanxingbieOptions"
                v-bind:key="index"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='daikuanzhuanyuan'"  label="年龄" prop="nianling">
          <el-input v-model="ruleForm.nianling"               placeholder="年龄" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='daikuanzhuanyuan'"  label="员工手机" prop="yuangongshouji">
          <el-input v-model="ruleForm.yuangongshouji"               placeholder="员工手机" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' v-if="flag=='daikuanzhuanyuan'" label="photo" prop="touxiang">
          <file-upload
          tip="Click to upload"
          action="file/upload"
          :limit="3"
          :multiple="true"
          :fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
          @change="daikuanzhuanyuantouxiangUploadChange"
          ></file-upload>
        </el-form-item>
        <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='kehu'"  label="客户账号" prop="kehuzhanghao">
          <el-input v-model="ruleForm.kehuzhanghao" readonly              placeholder="客户账号" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='kehu'"  label="客户姓名" prop="kehuxingming">
          <el-input v-model="ruleForm.kehuxingming"               placeholder="客户姓名" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' v-if="flag=='kehu'"  label="性别" prop="xingbie">
          <el-select v-model="ruleForm.xingbie"  placeholder="请选择性别">
            <el-option
                v-for="(item,index) in kehuxingbieOptions"
                v-bind:key="index"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='kehu'"  label="客户手机" prop="kehushouji">
          <el-input v-model="ruleForm.kehushouji"               placeholder="客户手机" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' v-if="flag=='kehu'" label="头像" prop="touxiang">
          <file-upload
          tip="Click to upload"
          action="file/upload"
          :limit="3"
          :multiple="true"
          :fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
          @change="kehutouxiangUploadChange"
          ></file-upload>
        </el-form-item>
        <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='kehu'"  label="IC" prop="shenfenzheng">
          <el-input v-model="ruleForm.shenfenzheng"               placeholder="IC" clearable></el-input>
        </el-form-item>
		<el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' v-if="flag=='users'" label="username" prop="username">
			<el-input v-model="ruleForm.username" placeholder="username"></el-input>
		</el-form-item>
		<el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' v-if="flag=='users'" label="Photo" prop="image">
		  <file-upload
		  tip="Click to upload"
		  action="file/upload"
		  :limit="1"
		  :multiple="false"
		  :fileUrls="ruleForm.image?ruleForm.image:''"
		  @change="usersimageUploadChange"
		  ></file-upload>
		</el-form-item>
		<el-form-item :style='{"padding":"0","margin":"30px 0","alignItems":"center","textAlign":"center","display":"flex","width":"100%","perspective":"320px","-webkitPerspective":"320px","fontSize":"48px","justifyContent":"center"}'>
			<el-button class="btn3" :style='{"border":"0px solid rgba(126, 96, 16, .2)","cursor":"pointer","padding":"0 20px","margin":"0px 4px","outline":"none","color":"#666","borderRadius":"0px","background":"#cee1f6","width":"auto","fontSize":"16px","lineHeight":"24px","height":"40px"}' type="primary" @click="onUpdateHandler">
				<span class="icon iconfont icon-tijiao16" :style='{"color":"inherit","margin":"0 2px","fontSize":"18px"}'></span>
				Submit
			</el-button>
		</el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber,isIntNumer,isEmail,isMobile,isPhone,isURL,checkIdCard } from "@/utils/validate";

export default {
  data() {
    return {
      ruleForm: {},
      flag: '',
      usersFlag: false,
      juyuanxingbieOptions: [],
      daikuanzhuanyuanxingbieOptions: [],
      kehuxingbieOptions: [],
    };
  },
  mounted() {
    var table = this.$storage.get("sessionTable");
    this.flag = table;
    this.$http({
      url: `${this.$storage.get("sessionTable")}/session`,
      method: "get"
    }).then(({ data }) => {
      if (data && data.code === 0) {
        this.ruleForm = data.data;
      } else {
        this.$message.error(data.msg);
      }
    });
    this.juyuanxingbieOptions = "male,female".split(',')
    this.daikuanzhuanyuanxingbieOptions = "male,female".split(',')
    this.kehuxingbieOptions = "male,female".split(',')
  },
  methods: {
    juyuantouxiangUploadChange(fileUrls) {
        this.ruleForm.touxiang = fileUrls;
    },
    daikuanzhuanyuantouxiangUploadChange(fileUrls) {
        this.ruleForm.touxiang = fileUrls;
    },
    kehutouxiangUploadChange(fileUrls) {
        this.ruleForm.touxiang = fileUrls;
    },
	usersimageUploadChange(fileUrls) {
		this.ruleForm.image = fileUrls;
	},
    onUpdateHandler() {
      if((!this.ruleForm.juyuangonghao)&& 'juyuan'==this.flag){
        this.$message.error('柜员工号不能为空');
        return
      }


      if((!this.ruleForm.mima)&& 'juyuan'==this.flag){
        this.$message.error('Password cannot be empty');
        return
      }








      if( 'juyuan' ==this.flag && this.ruleForm.nianling&&(!isIntNumer(this.ruleForm.nianling))){
       this.$message.error(`年龄应输入整数`);
        return
      }


      if( 'juyuan' ==this.flag && this.ruleForm.juyuanshouji&&(!isMobile(this.ruleForm.juyuanshouji))){
        this.$message.error(`柜员手机应输入手机格式`);
        return
      }


        if(this.ruleForm.touxiang!=null) {
                this.ruleForm.touxiang = this.ruleForm.touxiang.replace(new RegExp(this.$base.url,"g"),"");
        }
      if((!this.ruleForm.yuangonggonghao)&& 'daikuanzhuanyuan'==this.flag){
        this.$message.error('员工工号不能为空');
        return
      }


      if((!this.ruleForm.mima)&& 'daikuanzhuanyuan'==this.flag){
        this.$message.error('Password cannot be empty');
        return
      }








      if( 'daikuanzhuanyuan' ==this.flag && this.ruleForm.nianling&&(!isIntNumer(this.ruleForm.nianling))){
       this.$message.error(`年龄应输入整数`);
        return
      }


      if( 'daikuanzhuanyuan' ==this.flag && this.ruleForm.yuangongshouji&&(!isMobile(this.ruleForm.yuangongshouji))){
        this.$message.error(`员工手机应输入手机格式`);
        return
      }


        if(this.ruleForm.touxiang!=null) {
                this.ruleForm.touxiang = this.ruleForm.touxiang.replace(new RegExp(this.$base.url,"g"),"");
        }
      if((!this.ruleForm.kehuzhanghao)&& 'kehu'==this.flag){
        this.$message.error('客户账号不能为空');
        return
      }


      if((!this.ruleForm.mima)&& 'kehu'==this.flag){
        this.$message.error('Password cannot be empty');
        return
      }








      if( 'kehu' ==this.flag && this.ruleForm.kehushouji&&(!isMobile(this.ruleForm.kehushouji))){
        this.$message.error(`客户手机应输入手机格式`);
        return
      }
      if((!this.ruleForm.touxiang)&& 'kehu'==this.flag){
        this.$message.error('头像不能为空');
        return
      }


        if(this.ruleForm.touxiang!=null) {
                this.ruleForm.touxiang = this.ruleForm.touxiang.replace(new RegExp(this.$base.url,"g"),"");
        }


      if( 'kehu' ==this.flag && this.ruleForm.shenfenzheng&&(!checkIdCard(this.ruleForm.shenfenzheng))){
        this.$message.error(`身份证应输入身份证格式`);
        return
      }
      if('users'==this.flag && this.ruleForm.username.trim().length<1) {
	this.$message.error(`用户名不能为空`);
        return	
      }
	  if(this.flag=='users'){
	  	this.ruleForm.image = this.ruleForm.image.replace(new RegExp(this.$base.url,"g"),"")
	  }
      this.$http({
        url: `${this.$storage.get("sessionTable")}/update`,
        method: "post",
        data: this.ruleForm
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "Successfully Updated info",
            type: "success",
            duration: 1500,
            onClose: () => {
				if(this.flag=='users'){
					this.$storage.set('headportrait',this.ruleForm.image)
				}
            }
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  	  padding: 0 10px 0 0;
	  	  color: inherit;
	  	  font-weight: 500;
	  	  display: inline-block;
	  	  width: 150px;
	  	  font-size: inherit;
	  	  line-height: 40px;
	  	  text-align: right;
	  	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 150px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  	  border: 1px solid #ddd;
	  	  border-radius: 0px;
	  	  padding: 0 12px;
	  	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  	  outline: none;
	  	  color: inherit;
	  	  background: #fff;
	  	  width: auto;
	  	  font-size: 14px;
	  	  min-width: 350px;
	  	  height: 36px;
	  	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  	  border: 1px solid #ddd;
	  	  border-radius: 0px;
	  	  padding: 0 10px;
	  	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  	  outline: none;
	  	  color: inherit;
	  	  background: #fff;
	  	  width: auto;
	  	  font-size: 14px;
	  	  height: 36px;
	  	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  	  border: 1px solid #ddd;
	  	  border-radius: 0px;
	  	  padding: 0 10px 0 30px;
	  	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  	  outline: none;
	  	  color: inherit;
	  	  background: #fff;
	  	  width: auto;
	  	  font-size: 14px;
	  	  height: 36px;
	  	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  	  border: 1px solid #ddd;
	  	  cursor: pointer;
	  	  border-radius: 0px;
	  	  color: inherit;
	  	  background: #fff;
	  	  object-fit: cover;
	  	  width: 180px;
	  	  font-size: 32px;
	  	  line-height: 90px;
	  	  text-align: center;
	  	  height: 90px;
	  	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  	  border: 1px solid #ddd;
	  	  cursor: pointer;
	  	  border-radius: 0px;
	  	  color: inherit;
	  	  background: #fff;
	  	  object-fit: cover;
	  	  width: 180px;
	  	  font-size: 32px;
	  	  line-height: 90px;
	  	  text-align: center;
	  	  height: 90px;
	  	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  	  border: 1px solid #ddd;
	  	  border-radius: 0px;
	  	  padding: 12px;
	  	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  	  outline: none;
	  	  color: inherit;
	  	  background: #fff;
	  	  width: 500px;
	  	  font-size: 14px;
	  	  height: 140px;
	  	}
	
	.add-update-preview .btn3 {
				border: 0px solid rgba(126, 96, 16, .2);
				cursor: pointer;
				border-radius: 0px;
				padding: 0 20px;
				margin: 0px 4px;
				outline: none;
				color: #666;
				background: #cee1f6;
				width: auto;
				font-size: 16px;
				line-height: 24px;
				height: 40px;
			}
	
	.add-update-preview .btn3:hover {
				opacity: 0.8;
			}
	
	.editor>.avatar-uploader {
		line-height: 0;
		height: 0;
	}
</style>
