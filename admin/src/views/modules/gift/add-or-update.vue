<template>
    <div class="addEdit-block" :style='{"padding":"30px","fontSize":"14px","color":"#666","background":"none"}'>
        <el-form
                :style='{"border":"1px solid rgba(255,255,255,1)","padding":"30px","borderRadius":"4px","alignItems":"flex-start","flexWrap":"wrap","background":"rgba(255,255,255,.8)","display":"flex","fontSize":"inherit"}'
                class="add-update-preview"
                ref="ruleForm"
                :model="ruleForm"
                :rules="rules"
                label-width="150px"
        >
            <template>
                <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'
                              class="input" v-if="type!='info'" label="GiftNo" prop="giftNo">
                    <el-input v-model="ruleForm.giftNo" placeholder="GiftNo" readonly></el-input>
                </el-form-item>
                <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'
                              class="input" v-else-if="ruleForm.giftNo" label="GiftNo" prop="giftNo">
                    <el-input v-model="ruleForm.giftNo" placeholder="GiftNo" readonly></el-input>
                </el-form-item>
                <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'
                              class="input" v-if="type!='info'" label="GiftName" prop="giftName">
                    <el-input v-model="ruleForm.giftName" placeholder="GiftName" clearable
                              :readonly="ro.giftName"></el-input>
                </el-form-item>
                <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'
                              v-else class="input" label="GiftName" prop="giftName">
                    <el-input v-model="ruleForm.giftName" placeholder="GiftName" readonly></el-input>
                </el-form-item>
                <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'
                              class="input" v-if="type!='info'" label="GiftDesc" prop="giftDesc">
                    <el-input v-model="ruleForm.giftDesc" placeholder="GiftDesc" clearable
                              :readonly="ro.giftDesc"></el-input>
                </el-form-item>
                <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'
                              v-else class="input" label="GiftDesc" prop="giftDesc">
                    <el-input v-model="ruleForm.giftDesc" placeholder="GiftDesc" readonly></el-input>
                </el-form-item>
                <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'
                              class="input" v-if="type!='info'" label="Point" prop="point">
                    <el-input-number v-model="ruleForm.point" placeholder="Point" :readonly="ro.point"></el-input-number>
                </el-form-item>
                <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'
                              v-else class="input" label="Point" prop="point">
                    <el-input v-model="ruleForm.point" placeholder="Point" readonly></el-input>
                </el-form-item>
                <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'
                              class="input" v-if="type!='info'" label="Stock" prop="stock">
                    <el-input-number v-model="ruleForm.stock" placeholder="Stock" :readonly="ro.stock"></el-input-number>
                </el-form-item>
                <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'
                              v-else class="input" label="Stock" prop="stock">
                    <el-input v-model="ruleForm.stock" placeholder="Stock" readonly></el-input>
                </el-form-item>

                <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'
                              class="upload" v-if="type!='info' && !ro.petPictures" label="Pictures" prop="petPictures">
                    <file-upload
                            tip="Click upload pictures"
                            action="file/upload"
                            :limit="3"
                            :multiple="true"
                            :fileUrls="ruleForm.petPictures?ruleForm.petPictures:''"
                            @change="petPicturesUploadChange"
                    ></file-upload>
                </el-form-item>
                <el-form-item :style='{"width":"100%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'
                              class="upload" v-else-if="ruleForm.petPictures" label="Pictures" prop="petPictures">
                    <img v-if="ruleForm.petPictures.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;"
                         v-bind:key="index" :src="ruleForm.petPictures.split(',')[0]" width="100" height="100">
                    <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index"
                         v-for="(item,index) in ruleForm.petPictures.split(',')" :src="$base.url+item" width="100"
                         height="100">
                </el-form-item>
            </template>
            <el-form-item
                    :style='{"padding":"0","margin":"30px 0","alignItems":"center","textAlign":"center","display":"flex","width":"100%","perspective":"320px","-webkitPerspective":"320px","fontSize":"48px","justifyContent":"center"}'
                    class="btn">
                <el-button class="btn3" v-if="type!='info'" type="success" @click="onSubmit">
                    <span class="icon iconfont icon-tijiao16"
                          :style='{"color":"inherit","margin":"0 2px","fontSize":"18px"}'></span>
                    Submit
                </el-button>
                <el-button class="btn4" v-if="type!='info'" type="success" @click="back()">
                    <span class="icon iconfont icon-quxiao09"
                          :style='{"color":"inherit","margin":"0 2px","fontSize":"18px"}'></span>
                    Back
                </el-button>
                <el-button class="btn5" v-if="type=='info'" type="success" @click="back()">
                    <span class="icon iconfont icon-fanhui01"
                          :style='{"color":"inherit","margin":"0 2px","fontSize":"18px"}'></span>
                    Back
                </el-button>
            </el-form-item>
        </el-form>


    </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import {isNumber, isIntNumer, isEmail, isPhone, isMobile, isURL, checkIdCard} from "@/utils/validate";

export default {
    data() {
        let self = this

        var validateNumber = (rule, value, callback) => {
            if (!value) {
                callback();
            } else if (!isNumber(value)) {
                callback(new Error("请输入数字"));
            } else {
                callback();
            }
        };

        return {
            id: '',
            type: '',
            ro: {
							giftNo: false,
							giftName: false,
							giftDesc: false,
							point: false,
							stock: false,
							petPictures: false
            },
            ruleForm: {
							giftNo: this.getUUID(),
							giftName: '',
							giftDesc: '',
							point: '',
							stock: '',
							petPictures: ''
            },
            rules: {
							giftNo: [],
							giftName: [],
							giftDesc: [],
							point:  [
								{required: true, message: 'Point cannot be empty', trigger: 'blur'},
								{validator: validateNumber, trigger: 'blur'},
							],
							stock:  [
								{required: true, message: 'Stock cannot be empty', trigger: 'blur'},
								{validator: validateNumber, trigger: 'blur'},
							],
							petPictures: [],
            }
        };
    },
    props: ["parent"],
    computed: {},
    components: {},
    created() {
        this.ruleForm.createTime = this.getCurDateTime()
    },
    methods: {

        // 下载
        download(file) {
            window.open(`${file}`)
        },
        // 初始化
        init(id, type) {
            if (id) {
                this.id = id;
                this.type = type;
            }
            if (this.type == 'info' || this.type == 'else') {
                this.info(id);
            } else if (this.type == 'logistics') {
                this.logistics = false;
                this.info(id);
            } else if (this.type == 'cross') {
                var obj = this.$storage.getObj('crossObj');
                for (var o in obj) {
                    if (o == 'giftNo') {
                        this.ruleForm.giftNo = obj[o];
                        this.ro.giftNo = true;
                        continue;
                    }
                    if (o == 'giftName') {
                        this.ruleForm.giftName = obj[o];
                        this.ro.giftName = true;
                        continue;
                    }
                    if (o == 'giftDesc') {
                        this.ruleForm.giftDesc = obj[o];
                        this.ro.giftDesc = true;
                        continue;
                    }
                    if (o == 'point') {
                        this.ruleForm.point = obj[o];
                        this.ro.point = true;
                        continue;
                    }
                    if (o == 'stock') {
                        this.ruleForm.stock = obj[o];
                        this.ro.stock = true;
                        continue;
                    }
                    if (o == 'petPictures') {
                        this.ruleForm.petPictures = obj[o];
                        this.ro.petPictures = true;
                        continue;
                    }
                }
                this.ruleForm.point = 0
                this.ro.point = false;
            }
            // 获取用户信息
            this.$http({
                url: `${this.$storage.get('sessionTable')}/session`,
                method: "get"
            }).then(({data}) => {
                if (data && data.code === 0) {
                    var json = data.data;
                } else {
                    this.$message.error(data.msg);
                }
            });
        },
        // 多级联动参数
        info(id) {
            this.$http({
                url: `gift/info/${id}`,
                method: "get"
            }).then(({data}) => {
                if (data && data.code === 0) {
                    this.ruleForm = data.data;
                    //解决前台上传图片后台不显示的问题
                    let reg = new RegExp('../../../upload', 'g')//g代表全部
                } else {
                    this.$message.error(data.msg);
                }
            });
        },

        // 提交<!--giftNo giftName、giftDesc、point、stock、petPictures-->
        onSubmit() {
            if (this.ruleForm.giftNo) {
                this.ruleForm.giftNo = String(this.ruleForm.giftNo)
            }
            if (this.ruleForm.petPictures != null) {
                this.ruleForm.petPictures = this.ruleForm.petPictures.replace(new RegExp(this.$base.url, "g"), "");
            }
            var objcross = this.$storage.getObj('crossObj');
            var table = this.$storage.getObj('crossTable');
            if (objcross != null) {
                if (!this.ruleForm.point) {
                    this.$message.error("Point cannot be empty");
                    return
                }
                if (!this.ruleForm.stock) {
                    this.$message.error("Stock cannot be empty");
                    return
                }
                objcross.stock = parseFloat(objcross.stock) + parseFloat(this.ruleForm.stock)
            }
            //更新跨表属性
            var crossuserid;
            var crossrefid;
            var crossoptnum;
            if (this.type == 'cross') {
                var statusColumnName = this.$storage.get('statusColumnName');
                var statusColumnValue = this.$storage.get('statusColumnValue');
                if (statusColumnName != '') {
                    var obj = this.$storage.getObj('crossObj');
                    if (statusColumnName && !statusColumnName.startsWith("[")) {
                        for (var o in obj) {
                            if (o == statusColumnName) {
                                obj[o] = statusColumnValue;
                            }
                        }
                        var table = this.$storage.get('crossTable');
                        this.$http({
                            url: `${table}/update`,
                            method: "post",
                            data: obj
                        }).then(({data}) => {
                        });
                        this.$http({
                            url: `${table}/update`,
                            method: "post",
                            data: objcross
                        }).then(({data}) => {
                        });
                    } else {
                        crossuserid = this.$storage.get('userid');
                        crossrefid = obj['id'];
                        crossoptnum = this.$storage.get('statusColumnName');
                        crossoptnum = crossoptnum.replace(/\[/, "").replace(/\]/, "");
                    }
                }
            }
            this.$refs["ruleForm"].validate(valid => {
                if (valid) {
                    if (crossrefid && crossuserid) {
                        this.ruleForm.crossuserid = crossuserid;
                        this.ruleForm.crossrefid = crossrefid;
                        let params = {
                            page: 1,
                            limit: 10,
                            crossuserid: this.ruleForm.crossuserid,
                            crossrefid: this.ruleForm.crossrefid,
                        }
                        this.$http({
                            url: "gift/page",
                            method: "get",
                            params: params
                        }).then(({
                                     data
                                 }) => {
                            if (data && data.code === 0) {
                                if (data.data.total >= crossoptnum) {
                                    this.$message.error(this.$storage.get('tips'));
                                    return false;
                                } else {
                                    this.$http({
                                        url: `gift/${!this.ruleForm.id ? "save" : "update"}`,
                                        method: "post",
                                        data: this.ruleForm
                                    }).then(({data}) => {
                                        if (data && data.code === 0) {
                                            this.$message({
                                                message: "Success",
                                                type: "success",
                                                duration: 1500,
                                                onClose: () => {
                                                    this.parent.showFlag = true;
                                                    this.parent.addOrUpdateFlag = false;
                                                    this.parent.giftCrossAddOrUpdateFlag = false;
                                                    this.parent.search();
                                                    this.parent.contentStyleChange();
                                                }
                                            });
                                            this.$http({
                                                url: `${table}/update`,
                                                method: "post",
                                                data: objcross
                                            }).then(({data}) => {
                                            });
                                        } else {
                                            this.$message.error(data.msg);
                                        }
                                    });

                                }
                            } else {
                            }
                        });
                    } else {
                        this.$http({
                            url: `gift/${!this.ruleForm.id ? "save" : "update"}`,
                            method: "post",
                            data: this.ruleForm
                        }).then(({data}) => {
                            if (data && data.code === 0) {
                                this.$http({
                                    url: `${table}/update`,
                                    method: "post",
                                    data: objcross
                                }).then(({data}) => {
                                });
                                this.$message({
                                    message: "Success",
                                    type: "success",
                                    duration: 1500,
                                    onClose: () => {
                                        this.parent.showFlag = true;
                                        this.parent.addOrUpdateFlag = false;
                                        this.parent.giftCrossAddOrUpdateFlag = false;
                                        this.parent.search();
                                        this.parent.contentStyleChange();
                                    }
                                });
                            } else {
                                this.$message.error(data.msg);
                            }
                        });
                    }
                }
            });
        },
        // 获取uuid
        getUUID() {
            return new Date().getTime();
        },
        // 返回
        back() {
            this.parent.showFlag = true;
            this.parent.addOrUpdateFlag = false;
            this.parent.giftCrossAddOrUpdateFlag = false;
            this.parent.contentStyleChange();
        },
			petPicturesUploadChange(fileUrls) {
            this.ruleForm.petPictures = fileUrls;
        },
    }
};
</script>
<style lang="scss" scoped>
.amap-wrapper {
  width: 100%;
  height: 500px;
}

.search-box {
  position: absolute;
}

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

.add-update-preview .el-input-number /deep/ .el-input__inner {
  text-align: left;
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

.add-update-preview .el-input-number /deep/ .el-input-number__decrease {
  display: none;
}

.add-update-preview .el-input-number /deep/ .el-input-number__increase {
  display: none;
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

.add-update-preview /deep/ .upload .upload-img {
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

.add-update-preview .btn .btn1 {
  border: 0px solid rgba(126, 96, 16, .2);
  cursor: pointer;
  padding: 0 20px;
  margin: 0px 4px;
  color: #666;
  display: inline-block;
  font-size: 16px;
  line-height: 24px;
  border-radius: 0px;
  outline: none;
  background: #cef7d2;
  width: auto;
  height: 40px;
}

.add-update-preview .btn .btn1:hover {
  opacity: 0.8;
}

.add-update-preview .btn .btn2 {
  border: 0px solid rgba(126, 96, 16, .2);
  cursor: pointer;
  border-radius: 0px;
  padding: 0 20px;
  margin: 0px 4px;
  outline: none;
  color: #666;
  background: #cef6f6;
  width: auto;
  font-size: 16px;
  line-height: 24px;
  height: 40px;
}

.add-update-preview .btn .btn2:hover {
  opacity: 0.8;
}

.add-update-preview .btn .btn3 {
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

.add-update-preview .btn .btn3:hover {
  opacity: 0.8;
}

.add-update-preview .btn .btn4 {
  border: 0px solid rgba(126, 96, 16, .2);
  cursor: pointer;
  border-radius: 0px;
  padding: 0 20px;
  margin: 0px 4px;
  outline: none;
  color: #666;
  background: #f7ceda;
  width: auto;
  font-size: 16px;
  line-height: 24px;
  height: 40px;
}

.add-update-preview .btn .btn4:hover {
  opacity: 0.8;
}

.add-update-preview .btn .btn5 {
  border: 0px solid rgba(126, 96, 16, .2);
  cursor: pointer;
  border-radius: 0px;
  padding: 0 20px;
  margin: 4px;
  outline: none;
  color: #666;
  background: #f7f1ce;
  width: auto;
  font-size: 16px;
  line-height: 24px;
  height: 40px;
}

.add-update-preview .btn .btn5:hover {
  opacity: 0.8;
}
</style>
