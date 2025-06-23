import type {IVolume} from "../types/volume.type";

   export default function Volume({volume, setSelected}){
   return (<div className="row  volume border m-2 rounded-2" onClick={() => setSelected(volume)}>
                                    <div className="col-sm-9">
                                        <div>{volume.authors.join(", ")}</div>
                                        <div ><b> {volume.title}</b></div>

                                    </div>

                                    <div className="col-sm-3">
                                            {volume.thumbnails[0] == null ? <div className="noImage">no<br></br>image</div> : ""}
                                            <img src={volume.thumbnails[0]} className="thumbnail p-2"></img>
                                        
                                    </div>

                                </div>)
                                }