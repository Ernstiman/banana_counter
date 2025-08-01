import { useState } from "react";
import { SubtractBananaButton, AddBananaButton, SubmitBananasButton } from "./Buttons";

export default function SubmitBananas({setSubmit}){
    const [addedCount, setAddedCount] = useState(0);
    const [caption, setCaption] = useState("");


    return (
        <div className="change-count-container">
                    <div className="banana-buttons-group">
                        <AddBananaButton addedCount={addedCount} setAddedCount={setAddedCount}/>
                        <div className="added-bananas-text">
                            {addedCount !== 0 && (
                                <h2>{addedCount} added bananas</h2>
                            )}
                        </div>
                        <SubtractBananaButton addedCount={addedCount} setAddedCount={setAddedCount}/>
                        <SubmitBananasButton addedCount={addedCount} setAddedCount={setAddedCount} caption={caption} setSubmit={setSubmit}/>
                    </div>
                    <div className="caption-container"> 
                        <input id="caption" name="caption" type="text" value={caption} onChange={e => setCaption(e.target.value)}/>
                        <label htmlFor="caption">Caption</label>
                    </div>
                </div>
    )


}