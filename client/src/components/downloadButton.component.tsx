
import { Button } from "react-bootstrap"


export default function DownloadButton({ url }: { url: string }) {


    function download(): void {
       location.href=url
    }

    return (
    <>
  
        {url&&( <Button onClick={download} variant="primary">Download pdf</Button>
             )}
    </>
    )
}