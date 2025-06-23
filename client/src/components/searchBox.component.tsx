import { BsSearch } from "react-icons/bs"


export default function SearchBox({handleSearch,setQuery}){
    return(
        <form  onSubmit={handleSearch}> 
                    <div className="input-group d-flex justify-content-center">
                        <input type="text" id="searchbox"  onChange={(e) => setQuery(e.target.value)} placeholder="type text to search..."  />
                        <button type="submit" className="btn btn-primary" >
                            <BsSearch></BsSearch>
                        </button>
                
                </div>
             </form> 
    

    )
}