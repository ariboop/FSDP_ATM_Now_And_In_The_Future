const base = {
    get() {
        return {
            //本地开发调试
            // url : "http://localhost:8080/springbootfwb318j0/",
            //生产环境部署
            url : "http://43.160.193.183:8080/springbootfwb318j0/",
            name: "springbootfwb318j0",
            // 退出到home page链接
            //本地开发调试
            // indexUrl : "http://localhost:8080/springbootfwb318j0/front/dist/index.html",
            //生产环境部署
            indexUrl: 'http://43.160.193.183:8080/springbootfwb318j0/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "Admin-ATM Banking System"
        } 
    }
}
export default base
