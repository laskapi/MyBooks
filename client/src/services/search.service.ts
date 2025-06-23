import axios from "axios"
import authHeader from "../tools/authHeader"
const API_URL = "http://localhost:8080/api/search/"

 class SearchService {

    search(name: string) {
            return axios.get(API_URL+"search?",{headers:authHeader(),params:{query:name}})
            .then(response=> {return response.data})
            
    }

}
export default new SearchService()