import { useState } from "react"
import searchService from "../services/search.service"
import type {IVolume} from "../types/volume.type"

import Volume from "./volume.component"
import Details from "./details.component"
import SearchBox from "./searchBox.component"
import AddButton from "./addButton.component"

export default function SearchTab({setLibVolumes}) {

    const [volumes, setVolumes] = useState<Array<IVolume> | null>(null)
    const [selected, setSelected] = useState<IVolume>()
    const [query, setQuery] = useState<string>('')
 

    function handleSearch(): void {
        searchService.searchByTitle(query).then(response => setVolumes(response))
    }

    return (
        <>
            <SearchBox handleSearch={handleSearch} setQuery={setQuery} />
              
            {volumes && (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 d-flex flex-column " >
                            {volumes.map(
                                volume => <Volume volume={volume} setSelected={setSelected} />
                            )}

                        </div>
                        <div className="col-sm-6">
                              <Details selected={selected} />
                              <AddButton selected={selected} setLibVolumes={setLibVolumes}/>
                            
                        </div>
                    </div>
                </div>)}
        </>
    )
}