import { useEffect, useState } from "react"
import libraryService from "../services/library.service"
import type { IVolume } from "../types/volume.type"

import Volume from "./volume.component"
import Details from "./details.component"
import DeleteButton from "./deleteButton.component"
import { Pagination } from "react-bootstrap"


export default function LibraryTab({ setLibVolumes, libVolumes }: { setLibVolumes, libVolumes: Array<IVolume> }) {

    const [selected, setSelected] = useState<IVolume>()
    const [index, setIndex] = useState(0)


    useEffect(() => {
        libraryService.getPage(index).then(response => setLibVolumes(response))

    }, [index])
 useEffect(()=>    
    {
        setSelected(undefined)
    },[libVolumes])

    return (
        <>

            {libVolumes && (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 d-flex flex-column " >
                            <div className="d-flex flex-row justify-content-center mt-3">
                                <p className='px-3'>
                                    page: {index + 1}
                                </p>
                                <Pagination  >
                                    <Pagination.Prev onClick={() => setIndex(Math.max(index - 1, 0))} />
                                    <Pagination.Next onClick={() => {
                                        libraryService.getPage(index + 1).then(response => {
                                            if (response.length > 0) {
                                                setLibVolumes(response)
                                                setIndex(index + 1)
                                            }
                                        })
                                    }} />
                                </Pagination>
                            </div>

                            {libVolumes.map(
                                volume => <Volume volume={volume} setSelected={setSelected} />
                            )}

                        </div>
                        <div className="col-sm-6">
                            <Details selected={selected} />
                            <DeleteButton selected={selected} setSelected={setSelected}
                                 setLibVolumes={setLibVolumes} index={index} />
                        </div>
                    </div>
                </div>)}
        </>
    )
}