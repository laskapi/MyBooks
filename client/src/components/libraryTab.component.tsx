import { useEffect, useState } from "react"
import libraryService from "../services/library.service"
import type {IVolume} from "../types/volume.type"

import Volume from "./volume.component"
import Details from "./details.component"
import DeleteButton from "./deleteButton.component"


export default function LibraryTab({setLibVolumes,volumes}:{setLibVolumes,volumes:Array<IVolume>}) {

  //  let volumes=Array.from(vols)
   
  // const [volumes, setVolumes] = useState<Array<IVolume> | null>(null)
    const [selected, setSelected] = useState<IVolume>()
  
   
 /*    useEffect(()=>{
        libraryService.getAll().then(response => setVolumes(response))
        
    },[]) */

   
    return (
        <>          
           
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
                            <DeleteButton selected={selected} setSelected={setSelected} setLibVolumes={setLibVolumes} />
                        </div>
                    </div>
                </div>)}
        </>
    )
}