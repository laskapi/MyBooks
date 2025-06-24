import { useEffect, useState } from "react"
import libraryService from "../services/library.service"
import { Button, Card } from "react-bootstrap"


export default function Details({selected}) {

    
    return (
    <>
    {selected&& <Card className="m-2">
            <Card.Body>             
                <Card.Title>{selected.title}</Card.Title>
                <Card.Subtitle>author: {selected.authors.toString().replace(",",", ")}</Card.Subtitle>
                <Card.Subtitle>published: {selected.publisher}{", "}{selected.publishedDate}</Card.Subtitle>
                <Card.Img style={{ width: '12rem' }} src={selected.thumbnails[0]}/>
                   <Card.Text >{selected.description}</Card.Text>
                
            </Card.Body>
        </Card>
    }
    </>
    )
}