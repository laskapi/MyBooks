import axios from "axios"
const API_URL = "http://localhost:8080/api/search/"

 class SearchService {

    search(name: string) {
            return axios.get(API_URL+"search?",{params:{query:name}})
            .then(response=> {return response.data})
            
    }

}
export default new SearchService()