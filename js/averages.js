const baseUri = "https://notsouthair.azurewebsites.net/api/air/average"


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
        showData(array){
          array.forEach(element => {
            console.log(element)
            
          });
        },
       typefilter(value){
           if(value == 0) return "Today";
           if(value == 1) return "Yesterday";
           if(value == 2) return "This week";
           if(value == 3) return "This month";
       },
       even: function(arr) {
        // Set slice() to avoid to generate an infinite loop!
        return arr.slice().sort(function(a, b) {
          return a.type - b.type;
        });
      },
      
      formatNumber(number){
        return number.toFixed(2);
    }
       
    }
}).mount("#app")
