import { BsSearch } from "react-icons/bs"


export default function SearchBox({handleSearch,setQuery}){
    return(
       <form className="" action={handleSearch}>
                    <div className="input-group d-flex justify-content-center">
                        <input type="search" id="searchbox"  onChange={(e) => setQuery(e.target.value)} placeholder="type text to search..."  />
                        <button type="submit" className="btn btn-primary" >
                            <BsSearch></BsSearch>
                        </button>
                
                </div>
            </form>
    

    )
}