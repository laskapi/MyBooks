import { useEffect, useState } from "react"
import searchService from "../services/search.service"
import type { IVolume } from "../types/volume.type"

import Volume from "./volume.component"
import Details from "./details.component"
import SearchBox from "./searchBox.component"
import AddButton from "./addButton.component"
import { Pagination } from "react-bootstrap"
import DownloadButton from "./downloadButton.component"

export default function SearchTab({ setLibVolumes }) {

    const [volumes, setVolumes] = useState<Array<IVolume> | null>(null)
    const [selected, setSelected] = useState<IVolume>()
    const [query, setQuery] = useState<string>('')
    const [index, setIndex] = useState(0)

    function handleSearch(e?: Event): void {
        e?.preventDefault()
        searchService.searchByTitle(query, index).then(response => setVolumes(response))
    }
    useEffect(()=>
    {
        setSelected(undefined)
    },[volumes])

    useEffect(() => {
        handleSearch()
    }, [index])

    useEffect(() => {
        setIndex(0)
    }, [query])

    return (
        <>
            <SearchBox handleSearch={handleSearch} setQuery={setQuery} />

            {volumes && (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 " >

                            <div className="d-flex flex-row justify-content-center mt-3">
                                <p className='px-3'>
                                    page: {index + 1}
                                </p>
                                <Pagination  >
                                    <Pagination.Prev onClick={() => setIndex(Math.max(index - 1, 0))} />
                              
                                    <Pagination.Next onClick={() => {
                                        searchService.searchByTitle(query, index + 1).then(response => {
                                            if (response.length > 0) {
                                                setVolumes(response)
                                                setIndex(index + 1)
                                            }
                                        })
                                    }} />


                                </Pagination>
                            </div>



                            {volumes.map(
                                volume => <Volume volume={volume} setSelected={setSelected} />
                            )}

                        </div>
                      { selected && ( <div className="col-sm-6">
                            <Details selected={selected} />
                            <div className="d-flex justify-content-around">
                            <AddButton selected={selected} setLibVolumes={setLibVolumes} />
                            <DownloadButton url={selected.pdf}/>
                            </div>
                        </div>)}
                    </div>
                      
                </div>)}
        </>
    )
}