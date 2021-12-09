const baseUri = "https://notsouthair.azurewebsites.net/api/air"


Vue.createApp({
    data() {
        return {
            nyliste:[],
            datalist: [],
            error: null,
            statuscode:null
        }
    },
     created() {
        // created() is a life cycle method, not an ordinary method
        // created() is called automatically when the page is loaded
        console.log("created method called")
        this.getAllData()
        
        

        
        
    },
    methods: {
        //Read this for an example: https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
         getAllData() {
             //axios call that returns all the elements from the webservice
            axios.get(baseUri)
            .then(response => {
             var divtag = document.getElementById("content");

             console.log("in function getAllData");
             console.log("status code: "+ response.status );

             //add the returning data from the webservice to the variable carlists
             this.datalist = response.data;
             this.status = response.status;
             console.log("length of the datalist array " + this.datalist.length)
             

            })
            .catch(error = (ex) => {
              //resultElement.innerHTML = generateErrorHTMLOutput(error);
              this.carslist = []
               this.error = ex.message
              console.log("Error:" + this.error);
            })      
            
        },
        datefilter(value){
          var date = new Date(Date.parse(value)).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit", second:"2-digit"}) ;
          
          return date;
        },
        showData(array){
          array.forEach(element => {
            console.log(element)
            
          });
        },
        formatNumber(number){
          return number.toFixed(2);
      }
       
       
    }
}).mount("#app")
