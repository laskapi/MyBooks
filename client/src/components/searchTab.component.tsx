import { useState } from "react"
import searchService from "../services/search.service"
import type {IVolume} from "../types/volume.type"

import Volume from "./volume.component"
import Details from "./details.component"
import SearchBox from "./searchBox.component"

export default function Search() {

    const [volumes, setVolumes] = useState<Array<IVolume> | null>(null)
    const [selected, setSelected] = useState<IVolume>()
    const [query, setQuery] = useState<string>('')
 

    function handleSearch(): void {
        searchService.search(query).then(response => setVolumes(response))
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
                                <Details selected={selected}/>
                           
                        </div>
                    </div>
                </div>)}
        </>
    )
}