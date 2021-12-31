import {apiBaseUrl} from '../constants';


  const API_BASE = apiBaseUrl;

  const objToQueryString = obj => {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
      );
    }
    if (keyValuePairs.length > 0) return keyValuePairs.join("&");
    else return;
  };
  
  
  
  export const apiCall = async(
    route,
    tokenNeeded,
    method,
    params,
     
  ) => {
   
    try{
     
      let header = new Headers();
      let AuthToken = '';
  

    
  
      header.append("Content-Type", "application/json");
  
     
     if(tokenNeeded == true){
          

        AuthToken = localStorage.getItem("@access_token")

        
        if (AuthToken) header.set("authtoken", AuthToken);


     }
      
        
      let url = "";

       if(method == "GET"){

          let queryString = objToQueryString(params);

         
          
          if (queryString) url = `${API_BASE}${route}?${queryString}`;
           else url = `${API_BASE}${route}`;

       }else{
         
          url = `${API_BASE}${route}`;

       }
        
      
        const response = await fetch(url, {
            method: method,
            headers: header,
            body: (method=='POST')? (params ? JSON.stringify(params) : null) : null
        })   
        
       
            
        let token = response.headers.get("AuthToken");

        
         // console.log("response",response.json());

          if (token) {

            localStorage.setItem("@access_token", token);

          }
          

         
          return await response.json();
    }
    catch(err){
        console.log(err);
    }
   
  };