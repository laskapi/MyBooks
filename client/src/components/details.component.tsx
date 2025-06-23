import { useEffect, useState } from "react"
import libraryService from "../services/library.service"
import { Button, Card } from "react-bootstrap"


export default function Details({selected}) {

    const [exists,setExists]=useState(true)

    useEffect(()=>{
    if(selected)  libraryService.exists(selected.id).then(response => setExists(response))
        
    },[selected])

    function addToLibrary(): void {
       libraryService.add(selected).then(response=>{if(response)setExists(true)})
    }

    return (
    <>
    {selected&& <Card className="m-2">
            <Card.Body>             
                <Card.Title>{selected.title}</Card.Title>
                <Card.Subtitle>author: {selected.authors.toString().replace(",",", ")}</Card.Subtitle>
                <Card.Subtitle>published: {selected.publisher}{", "}{selected.publishedDate}</Card.Subtitle>
                <Card.Img style={{ width: '12rem' }} src={selected.thumbnails[0]}/>
                   <Card.Text >{selected.description}</Card.Text>
               {!exists ? <Button onClick={addToLibrary} variant="primary">Add To Library</Button>
                        :<Button disabled> This Book is in Your library </Button>}
            </Card.Body>
        </Card>
    }
    </>
    )
}