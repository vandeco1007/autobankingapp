
const HistorySearch = function(){
    return(
        <div className="history-form-container">
            <button id="download-button"></button>
            <div className="form-group" id="pageNav">

            </div>
            <div className="form-group">
                <select id='playerChoices'>
                    <option value={'playerId'}>Id Khách Hàng</option>
                    <option value={'withdraw'}>Mã Đơn</option>
                </select>
                <input type={'text'} id='player'></input>
            </div>
            <div className="form-group">
                <label>Thời gian bắt đầu</label>
                <input type={'datetime-local'} id='startTime' required></input>
            </div>
            <div className="form-group">
                <label>Thời gian kết thúc</label>
                <input type={'datetime-local'} id='endTime' required></input>
            </div>
            <button id="historyFormSubmit">Tìm Kiếm</button>
        </div>
    )
}

export default HistorySearch