import axios from "axios";

export default { 

    getDataReportRo: async function({ commit }, payload) { 

      try {

        const resx = await axios.post("/api/pbroreport/", payload)
        if(resx.data.message != "Gagal" ){  
            if(resx.data.data.listdata != "None"){
            
              commit("set_alldataro", resx.data.data.listdata);
              commit("set_datarekapro", resx.data.data.datarekap);

              return "Ok"
            
            }else{
              return "None"
            } 
        }else{
          return "Error"
        } 

      } catch (error) {
        return "Error"
      }    
            
  }
 

};
