import bidvlogo from '../asset/media/images/bidvBill/bidvlogo.svg';
import bidvluuanh from '../asset/media/images/bidvBill/bidvluuanh.png';
import bidvchiase from '../asset/media/images/bidvBill/bidvchiase.png';
import bidvtrangchu from '../asset/media/images/bidvBill/bidvtrangchu.png';
import bidvmail from '../asset/media/images/bidvBill/bidvmail.png';
import bidvquanly from '../asset/media/images/bidvBill/bidvquanly.png';
import bidvluumau from '../asset/media/images/bidvBill/bidvluumau.png';

const Bill = () => {
    return(
        <div className="bill-wrapper">
            <div className="bill-container">
                <div className='cancelPrnt'>x</div>
                <div className='head-bill'>
                    <img src={bidvlogo} className="bidv-logo"></img>
                    <div className='bidv-status'>Giao dịch thành công</div>
                </div>
                <div className='body-bill'>
                    <div className='body-container'>
                        Quý khách đã chuyển thành công <br></br> số tiền <span className='td-right'>1,000 VND </span>
                        đến số tài khoản <span className='td-right'>1023968466</span>/<span className='td-right'> PHAM THI TRUONG</span>/<br></br><span className='td-right'> Vietcombank </span>
                        vào lúc <span className='time'></span> <br></br> <span className='hour'>21:23:52</span>. Nội dung: <span className='td-right td-content'>PHAM THI TRUONG</span>
                    </div>
                </div>
                <div className='footage-bill'>
                    <table className='bidv-table'>
                        <tbody>
                            <tr>
                                <td>
                                    <div>
                                        <img src={bidvluuanh} className='bidv-icon'></img><br></br>
                                        <span className="bidv-title">Lưu ảnh</span>
                                    </div>
                                </td>
                                <td>
                                <div>
                                    <img src={bidvchiase} className='bidv-icon'></img><br></br>
                                    <span className="bidv-title">Chia sẻ</span>
                                    </div>
                                </td>
                                <td>
                                <div>
                                    <img src={bidvtrangchu} className='bidv-icon'></img><br></br>
                                    <span className="bidv-title">Trang chủ</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <div>
                                    <img src={bidvmail} className='bidv-icon'></img><br></br>
                                    <span className="bidv-title">Gửi email</span>
                                    </div>
                                </td>
                                <td>
                                <div>
                                    <img src={bidvquanly} className='bidv-icon icon-special'></img><br></br>
                                    <span className="bidv-title">Thêm vào quản lý chi tiêu</span>
                                    </div>
                                </td>
                                <td>
                                <div>
                                    <img src={bidvluumau} className='bidv-icon icon-special'></img><br></br>
                                    <span className="bidv-title">Lưu mẫu</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Bill;