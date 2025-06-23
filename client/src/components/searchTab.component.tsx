import { useEffect, useState, type FormEventHandler } from "react"
import searchService from "../services/search.service"
import type { IVolume } from "../types/volume.type"

import Volume from "./volume.component"
import Details from "./details.component"
import SearchBox from "./searchBox.component"
import AddButton from "./addButton.component"
import { Pagination } from "react-bootstrap"

export default function SearchTab({ setLibVolumes }) {

    const [volumes, setVolumes] = useState<Array<IVolume> | null>(null)
    const [selected, setSelected] = useState<IVolume>()
    const [query, setQuery] = useState<string>('')
    const [index, setIndex] = useState(0)

    useEffect(() => {
        handleSearch()
    }, [index])
    function handleSearch(e?: Event): void {
        e?.preventDefault()
        searchService.searchByTitle(query, index).then(response => setVolumes(response))
    }
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
                                    page: {Math.round((index + 1) / 5) + 1}
                                </p>
                                <Pagination  >
                                    <Pagination.Prev onClick={() => setIndex(Math.max(index - 5, 0))} />

                                    <Pagination.Next onClick={() => setIndex(index + 5)} />

                                </Pagination>
                            </div>



                            {volumes.map(
                                volume => <Volume volume={volume} setSelected={setSelected} />
                            )}

                        </div>
                        <div className="col-sm-6">
                            <Details selected={selected} />
                            <AddButton selected={selected} setLibVolumes={setLibVolumes} />

                        </div>
                    </div>
                </div>)}
        </>
    )
}