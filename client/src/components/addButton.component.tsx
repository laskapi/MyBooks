import { useEffect, useState } from "react"
import libraryService from "../services/library.service"
import { Button} from "react-bootstrap"


export default function AddButton({selected,setLibVolumes}) {

    const [exists,setExists]=useState(false)

    useEffect(()=>{
    if(selected)  libraryService.exists(selected.id).then(response => setExists(response))
    },[selected])

    function addToLibrary(): void {
       libraryService.add(selected)
       .then(response=>{
        if(response){
            setExists(true)
        libraryService.getPage(0).then(responseArray=>setLibVolumes(responseArray))
           
        }})
    }

    return (
                selected&&( !exists ? <Button onClick={addToLibrary} variant="primary">Add to library</Button>
                        :<Button disabled> Added to Your library </Button>
                )
                    )
}