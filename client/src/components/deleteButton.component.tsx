import libraryService from "../services/library.service"
import { Button } from "react-bootstrap"


export default function DeleteButton({ selected,setSelected, setLibVolumes,index }) {
 
    function deleteFromLibrary(): void {
        libraryService.delete(selected)
            .then(response => {
                if (response) {
                    libraryService.getPage(index).then(responseArray => setLibVolumes(responseArray))
                    setSelected()
                }
            })
    }

    return (
        selected && (<Button onClick={deleteFromLibrary} variant="primary">Delete from library</Button>

        )
    )
}