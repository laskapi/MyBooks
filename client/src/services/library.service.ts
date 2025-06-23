import axios from "axios"
import authHeader from "../tools/authHeader"
import type { IVolume } from "../types/volume.type"
const API_URL = "http://localhost:8080/api/library/"

 class LibraryService {
    getAll() {
      return axios.get(API_URL+"get",{headers:authHeader()})
        .then(response=>{return response.data})
    }

    
    add(selected:IVolume) {
      
      return axios.post(API_URL+"add",selected,{headers:authHeader()})
      .then(response=>{return response.data})
    }

    exists(id: string) {
            return axios.get(API_URL+"exists?",{headers:authHeader(),params:{id:id}})
            .then(response=> {return response.data})
            
    }

}
export default new LibraryService()