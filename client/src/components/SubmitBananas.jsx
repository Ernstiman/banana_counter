
export default function SubmitBananas(){
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
                        <SubmitBananasButton addedCount={addedCount} setAddedCount={setAddedCount} caption={caption}/>
                    </div>
                    <div className="caption-container"> 
                        <input id="caption" name="caption" type="text" value={caption} onChange={e => setCaption(e.target.value)}/>
                        <label htmlFor="caption">Caption</label>
                    </div>
                </div>
    )


}