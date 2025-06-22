import { useEffect, useState } from "react"
import SearchService from "../services/search.service"
import type IVolume from "../types/volume.type"
import { BsSearch } from "react-icons/bs"

export default function Search() {

    const [volumes, setVolumes] = useState<Array<IVolume> | null>(null)//=null
    const [selected, setSelected] = useState<IVolume>()
    useEffect(() => {
        SearchService.search("tolkien").then(response => setVolumes(response))
    }, [])



    return (
        <div className="container">
            <div className="row">{volumes && (
                <div className="col-sm-6 d-flex flex-column " >
                    {volumes.length}
                    <div className="horizontalWrap">
                        <div className="input-group">
                            <input type="search" id="form1" placeholder="type text to search..." className="form-control" />
                            <button type="button" className="btn btn-primary" data-mdb-ripple-init>
                                <BsSearch></BsSearch>
                            </button>
                        </div>
                    </div>


                    {volumes.map(
                        volume =>
                            <div className="row text-bg-light volume border m-2 rounded-2" onClick={() => setSelected(volume)}>
                                <div className="col-sm-9">
                                    <div className="overflowTx">{volume.authors.join(", ")}{", "}</div>
                                    <div ><b className="overflowTx" style={{overflow: "hidden"}}> {volume.title}</b></div>

                                </div>
                                <div className="col-sm-3">
                                    <img src={volume.thumbnails[0]} className="thumbnail contains"></img>
                                </div>

                            </div>
                    )}

                </div>)}
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            {selected?.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}