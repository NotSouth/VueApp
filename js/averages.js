const baseUri = "https://notsouthair.azurewebsites.net/api/air"

Vue.createApp({
    data() {
        return {
            dataList: [],
            latest: {
                "id": 0,
                "cO2": 0,
                "temperature": 0,
                "humidity": 0
                },
            error: null,
            statuscode: null,
            timer: null
        }
    },
    created() {
        // created() is a life cycle method, not an ordinary method
        // created() is called automatically when the page is loaded
        console.log("created method called")
        //this.getAll()
        this.getLatest()
        this.timer = setInterval(this.autoUpdate, 5000);
    },
    beforeDestroy() {
        this.cancelAutoUpdate();
    },
    methods: {
        cancelAutoUpdate() {
            clearInterval(this.timer);
        },
        autoUpdate() {
            //this.getAll();
            this.getLatest();
        },
        cleanList() {
            this.dataList = [];
            this.error = null;
            console.log("count data: " + this.dataList.length);
        },
        //Read this for an example: https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
        getAll() {
            //axios call that returns all the elements from the webservice
            axios.get(baseUri)
                .then(response => {
                    var divtag = document.getElementById("content"); //What's the point?

                    console.log("in function getAll");
                    console.log("status code: " + response.status);

                    //add the returning data from the webservice to the variable dataList
                    this.dataList = response.data;
                    this.status = response.status;

                    console.log("length of the dataList array " + this.dataList.length)


                })
                .catch(error = (ex) => {
                    //resultElement.innerHTML = generateErrorHTMLOutput(error);
                    this.dataList = []
                    this.error = ex.message
                    console.log("Error:" + this.error);
                })

        },
        getById(id) {
            //axios call that returns the items from a specified user 
            axios.get(baseUri + "/" + id)
                .then(response => {

                    console.log("URI: " + baseUri + "/" + id)

                    console.log("in function getById");
                    console.log("status code: " + response.status);

                    //add the returning data from the webservice to the variable posts
                    this.dataList = response.data;
                    this.status = response.status;

                    console.log("length of the dataList array " + this.dataList.length)
                })
                .catch(error = (ex) => {
                    this.dataList = []
                    this.error = ex.message
                    console.log("Error:" + this.error);
                })
        },
        getLatest() {
            //Latest
            axios.get(baseUri + "/Latest")
                .then(response => {

                    console.log("URI: " + baseUri + "/Latest")

                    console.log("in function getLatest");
                    console.log("status code: " + response.status);

                    //add the returning data from the webservice to the variable posts
                    this.latest = response.data;
                    this.status = response.status;

                    console.log("length of the dataList array " + this.dataList.length)
                })
                .catch(error = (ex) => {
                    this.dataList = []
                    this.error = ex.message
                    console.log("Error:" + this.error);
                })
        },
        // Post(){
        //     axios.post(baseUri,{"id":this.Id,"vendor":this.Vendor,"model":this.Model,"price":this.Price})
        //     .then(response => {

        //     console.log("URI: ")

        //      console.log("in post s");
        //      console.log("status code: "+ response.status );

        //      //add the returning data from the webservice to the variable posts
        //      this.dataList = response.data;
        //      this.status = response.status;

        //      console.log("length of s array " + this.dataList.length)
        //     })
        //     .catch(error = (ex) => {
        //       this.dataList = []
        //       this.error = ex.message
        //       console.log("Error:" + this.error);
        //     })    
        // },
        // deleteById(id){
        //     //axios call that returns the items from a specified user 
        //     axios.delete(baseUri + "/"  + id)
        //     .then(response => {

        //     console.log("URI: " + baseUri + "?id=" +id)

        //      console.log("in function getById");
        //      console.log("status code: "+ response.status );

        //      //add the returning data from the webservice to the variable posts
        //      this.dataList = response.data;
        //      this.status = response.status;

        //      console.log("length of the dataList array " + this.dataList.length)
        //     })
        //     .catch(error = (ex) => {
        //       this.dataList = []
        //       this.error = ex.message
        //       console.log("Error:" + this.error);
        //     })      
        // }
    }
}).mount("#app")