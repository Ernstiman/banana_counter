import { useState, useEffect } from "react";
import { SubtractBananaButton, AddBananaButton, SubmitBananasButton } from "./Buttons";

export default function SubmitBananas({ setSubmit }) {
    const [addedCount, setAddedCount] = useState(0);
    const [caption, setCaption] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true); // Show the popup when the component mounts
        return () => setShow(false); // Hide the popup when the component unmounts
    }, []);

    const handleClose = () => {
        setShow(false);
        setSubmit(false); // Close the popup and setSubmit to false
    };

    return (
        <div className={`submit-bananas-overlay ${show ? 'show' : ''}`}>
            <div className="change-count-container">
                <div className="banana-buttons-group">
                    <AddBananaButton addedCount={addedCount} setAddedCount={setAddedCount} />
                    <div className="added-bananas-text">
                        {addedCount !== 0 && (
                            <h2>{addedCount} added bananas</h2>
                        )}
                    </div>
                    <SubtractBananaButton addedCount={addedCount} setAddedCount={setAddedCount} />
                    <SubmitBananasButton addedCount={addedCount} setAddedCount={setAddedCount} caption={caption} setSubmit={handleClose} />
                </div>
                <div className="caption-container">
                    <label htmlFor="caption">Caption</label>
                    <input className="caption"id="caption" name="caption" type="text" value={caption} onChange={e => setCaption(e.target.value)} />
                </div>
                <button className="close-submit-button"onClick={()=> setSubmit(false)}>Close</button>
            </div>
        </div>
    );
}