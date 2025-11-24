const menu = {
    list() {
        return [{
            "backMenu": [/*{
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "home page总数"],
                    "appFrontIcon": "cuIcon-circle",
                    "buttons": ["新增", "查看", "修改", "删除", "home page总数"],
                    "menu": "Teller",
                    "menuJump": "列表",
                    "tableName": "juyuan"
                }], "menu": "Teller Management"
            },*/ /*{
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "home page总数"],
                    "appFrontIcon": "cuIcon-qrcode",
                    "buttons": ["新增", "查看", "修改", "删除", "home page总数"],
                    "menu": "Loan Specialist",
                    "menuJump": "列表",
                    "tableName": "daikuanzhuanyuan"
                }], "menu": "Loan Specialist Management"
            }, */{
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "home page总数", "开户"],
                    "appFrontIcon": "cuIcon-shop",
                    "buttons": ["新增", "查看", "修改", "删除", "home page总数"],
                    "menu": "Customer",
                    "menuJump": "列表",
                    "tableName": "kehu"
                }], "menu": "Customer Management"
            }, {
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "home page总数", "存款", "取款", "转账"],
                    "appFrontIcon": "cuIcon-wenzi",
                    "buttons": ["查看", "修改", "删除", "home page总数"],
                    "menu": "Bank Account",
                    "menuJump": "列表",
                    "tableName": "yinxingzhanghu"
                }], "menu": "Bank Account Management"
            }, {
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "客户存款统计", "home page统计"],
                    "appFrontIcon": "cuIcon-pic",
                    "buttons": ["查看", "修改", "删除", "home page统计"],
                    "menu": "Deposit Record",
                    "menuJump": "列表",
                    "tableName": "cunkuanjilu"
                }], "menu": "Deposit Record Management"
            }, {
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除"],
                    "appFrontIcon": "cuIcon-pic",
                    "buttons": ["新增","查看", "修改", "删除"],
                    "menu": "Gift Info",
                    "menuJump": "列表",
                    "tableName": "gift"
                }], "menu": "Gift Management"
            }, {
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除"],
                    "appFrontIcon": "cuIcon-pic",
                    "buttons": ["新增","查看", "修改", "删除"],
                    "menu": "GiftExchange Record",
                    "menuJump": "列表",
                    "tableName": "gift_exchange"
                }], "menu": "GiftExchange Management"
            }, {
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除"],
                    "appFrontIcon": "cuIcon-copy",
                    "buttons": ["查看", "修改", "删除"],
                    "menu": "Withdrawal Record",
                    "menuJump": "列表",
                    "tableName": "qukuanjilu"
                }], "menu": "Withdrawal Record Management"
            }, {
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "每日转账量", "home page统计"],
                    "appFrontIcon": "cuIcon-form",
                    "buttons": ["查看", "修改", "删除", "home page统计"],
                    "menu": "Transfer Record",
                    "menuJump": "列表",
                    "tableName": "zhuanzhangjilu"
                }], "menu": "Transfer Record Management"
            }, /*{
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "审核"],
                    "appFrontIcon": "cuIcon-rank",
                    "buttons": ["查看", "修改", "删除"],
                    "menu": "Card Opening",
                    "menuJump": "列表",
                    "tableName": "bankakaihu"
                }], "menu": "Card Opening Management"
            },*/ /*{
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "审核", "客户贷款数", "home page总数", "home page统计", "还款申请"],
                    "appFrontIcon": "cuIcon-copy",
                    "buttons": ["查看", "修改", "删除", "审核", "home page总数", "home page统计"],
                    "menu": "Loan Application",
                    "menuJump": "列表",
                    "tableName": "daikuanshenqing"
                }], "menu": "Loan Application Management"
            },*/ /*{
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "审核"],
                    "appFrontIcon": "cuIcon-similar",
                    "buttons": ["查看", "修改", "删除", "审核"],
                    "menu": "Account Cancellation",
                    "menuJump": "列表",
                    "tableName": "zhuxiao"
                }], "menu": "Account Cancellation Management"
            },*/ /*{
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "审核"],
                    "appFrontIcon": "cuIcon-brand",
                    "buttons": ["查看", "修改", "删除", "审核"],
                    "menu": "Repayment Application",
                    "menuJump": "列表",
                    "tableName": "haikuanshenqing"
                }], "menu": "Repayment Application Management"
            },*/ /*{
                "child": [{
                    "allButtons": ["查看", "修改"],
                    "appFrontIcon": "cuIcon-news",
                    "buttons": ["查看", "修改"],
                    "menu": "About Us",
                    "tableName": "aboutus"
                }, {
                    "allButtons": ["查看", "修改"],
                    "appFrontIcon": "cuIcon-album",
                    "buttons": ["查看", "修改"],
                    "menu": "System Introduction",
                    "tableName": "systemintro"
                }, {
                    "allButtons": ["新增", "查看", "修改", "删除"],
                    "appFrontIcon": "cuIcon-medal",
                    "buttons": ["新增", "查看", "修改", "删除"],
                    "menu": "Friendly Links",
                    "tableName": "friendlink"
                }, {
                    "allButtons": ["新增", "查看", "修改", "删除"],
                    "appFrontIcon": "cuIcon-send",
                    "buttons": ["查看", "修改"],
                    "menu": "Carousel Management",
                    "tableName": "config"
                }, {
                    "allButtons": ["新增", "查看", "修改", "删除"],
                    "appFrontIcon": "cuIcon-news",
                    "buttons": ["新增", "查看", "修改", "删除"],
                    "menu": "News Announcements",
                    "tableName": "news"
                }, {
                    "allButtons": ["新增", "查看", "修改", "删除"],
                    "appFrontIcon": "cuIcon-news",
                    "buttons": ["新增", "查看", "修改", "删除"],
                    "menu": "News Announcement Categories",
                    "tableName": "newstype"
                }], "menu": "System Management"
            }*/],
            "frontMenu": [],
            "hasBackLogin": "是",
            "hasBackRegister": "否",
            "hasFrontLogin": "否",
            "hasFrontRegister": "否",
            "roleName": "Admin",
            "tableName": "users"
        }, {
            "backMenu": [{
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "home page总数", "开户"],
                    "appFrontIcon": "cuIcon-shop",
                    "buttons": ["查看", "开户"],
                    "menu": "Customer",
                    "menuJump": "列表",
                    "tableName": "kehu"
                }], "menu": "Customer Management"
            }, {
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "home page总数", "存款", "取款", "转账"],
                    "appFrontIcon": "cuIcon-wenzi",
                    "buttons": ["查看"],
                    "menu": "Bank Account",
                    "menuJump": "列表",
                    "tableName": "yinxingzhanghu"
                }], "menu": "Bank Account Management"
            }, {
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "审核"],
                    "appFrontIcon": "cuIcon-rank",
                    "buttons": ["查看", "修改", "删除", "审核"],
                    "menu": "Card Opening",
                    "menuJump": "列表",
                    "tableName": "bankakaihu"
                }], "menu": "Card Opening Management"
            }, {
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "审核"],
                    "appFrontIcon": "cuIcon-similar",
                    "buttons": ["新增", "查看", "修改", "删除"],
                    "menu": "Account Cancellation",
                    "menuJump": "列表",
                    "tableName": "zhuxiao"
                }], "menu": "Account Cancellation Management"
            }],
            "frontMenu": [],
            "hasBackLogin": "是",
            "hasBackRegister": "否",
            "hasFrontLogin": "否",
            "hasFrontRegister": "否",
            "roleName": "HelpDesk",
            "tableName": "juyuan"
        }, {
            "backMenu": [{
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "home page总数", "开户"],
                    "appFrontIcon": "cuIcon-shop",
                    "buttons": ["查看"],
                    "menu": "Customer",
                    "menuJump": "列表",
                    "tableName": "kehu"
                }], "menu": "Customer Management"
            }, {
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "审核", "客户贷款数", "home page总数", "home page统计", "还款申请"],
                    "appFrontIcon": "cuIcon-copy",
                    "buttons": ["查看", "修改", "删除", "审核"],
                    "menu": "Loan Application",
                    "menuJump": "列表",
                    "tableName": "daikuanshenqing"
                }], "menu": "Loan Application Management"
            }],
            "frontMenu": [],
            "hasBackLogin": "是",
            "hasBackRegister": "否",
            "hasFrontLogin": "否",
            "hasFrontRegister": "否",
            "roleName": "loanManager",
            "tableName": "daikuanzhuanyuan"
        }, {
            "backMenu": [{
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "home page总数", "存款", "取款", "转账"],
                    "appFrontIcon": "cuIcon-wenzi",
                    "buttons": ["查看", "存款", "取款", "转账"],
                    "menu": "Bank Account",
                    "menuJump": "列表",
                    "tableName": "yinxingzhanghu"
                }], "menu": "Bank Account Management"
            }, {
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "客户存款统计", "home page统计"],
                    "appFrontIcon": "cuIcon-pic",
                    "buttons": ["查看"],
                    "menu": "Deposit Record",
                    "menuJump": "列表",
                    "tableName": "cunkuanjilu"
                }], "menu": "Deposit Record Management"
            }, {
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除"],
                    "appFrontIcon": "cuIcon-pic",
                    "buttons": ["新增","查看"],
                    "menu": "Gift Info",
                    "menuJump": "列表",
                    "tableName": "gift"
                }], "menu": "Gift Management"
            }, {
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除"],
                    "appFrontIcon": "cuIcon-pic",
                    "buttons": ["新增","查看"],
                    "menu": "GiftExchange Record",
                    "menuJump": "列表",
                    "tableName": "gift_exchange"
                }], "menu": "GiftExchange Management"
            }, {
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除"],
                    "appFrontIcon": "cuIcon-copy",
                    "buttons": ["查看"],
                    "menu": "Withdrawal Record",
                    "menuJump": "列表",
                    "tableName": "qukuanjilu"
                }], "menu": "Withdrawal Record Management"
            }, {
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "每日转账量", "home page统计"],
                    "appFrontIcon": "cuIcon-form",
                    "buttons": ["查看"],
                    "menu": "Transfer Record",
                    "menuJump": "列表",
                    "tableName": "zhuanzhangjilu"
                }], "menu": "Transfer Record Management"
            }, {
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "审核"],
                    "appFrontIcon": "cuIcon-rank",
                    "buttons": ["新增", "查看"],
                    "menu": "Card Opening",
                    "menuJump": "列表",
                    "tableName": "bankakaihu"
                }], "menu": "Card Opening Management"
            }, {
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "审核", "客户贷款数", "home page总数", "home page统计", "还款申请"],
                    "appFrontIcon": "cuIcon-copy",
                    "buttons": ["新增", "查看", "还款申请"],
                    "menu": "Loan Application",
                    "menuJump": "列表",
                    "tableName": "daikuanshenqing"
                }], "menu": "Loan Application Management"
            }, {
                "child": [{
                    "allButtons": ["新增", "查看", "修改", "删除", "审核"],
                    "appFrontIcon": "cuIcon-brand",
                    "buttons": ["查看"],
                    "menu": "Repayment Application",
                    "menuJump": "列表",
                    "tableName": "haikuanshenqing"
                }], "menu": "Repayment Application Management"
            }],
            "frontMenu": [],
            "hasBackLogin": "否",
            "hasBackRegister": "否",
            "hasFrontLogin": "是",
            "hasFrontRegister": "是",
            "roleName": "客户",
            "tableName": "kehu"
        }]
    }
}
export default menu;