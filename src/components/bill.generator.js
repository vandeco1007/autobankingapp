import '../style/bill.css'
import '../style/bill.css'
import React, {Component} from 'react';
import logoVietin from '../asset/media/images/vietinbilling/logo.png'
import bannerVietin from '../asset/media/images/vietinbilling/banner.jpg'

const Bill = ()=> {
    return(
        <div className="bill-wrapper">
            <div className='cancelPrnt'>x</div>
            <div className="bill-container">
                {/* Logo & Date */}
                <div className="head-bill">
                    <div className="vt-logo">
                        <img src={logoVietin}></img>
                    </div>
                    <div className="time-code">
                        <div className="time">
                            <p className="date">20/10/2022</p>
                            &nbsp;
                            <p className="hour">18:44</p>
                        </div>
                        <div className="code">11nWo-7d9YEsteD</div>
                    </div>
                </div>
                {/* Status */}
                <div className="status">
                    <div className="status-content">Quý khách đã giao dịch thành công!</div>
                </div>
                {/* Infomation */}
                <div className="information">
                    <div className="info">
                        <div className="left-info">Từ tài khoản</div>
                        <div className="right-info">
                            <div className="above-content td-right">********4484</div>
                            <div className="below-content td-right">TRAN THI ANH TUYET</div>
                        </div>
                    </div>
                    <div className="info">
                        <div className="left-info">Đến tài khoản</div>
                        <div className="right-info account">
                            <div className="above-content td-right">100872860817</div>
                            <div className="below-content td-right">CAO TAI PHAT</div>
                        </div>
                    </div>
                    <div className="info a-line">
                        <div className="left-info">Số tiền</div>
                        <div className="right-info fee">
                            <div className="above-content td-right">100,000 VND</div>
                        </div>
                    </div>
                    <div className="info a-line">
                        <div className="left-info">Phí</div>
                        <div className="right-info">
                            <div className="above-content">Miễn phí</div>
                        </div>
                    </div>
                    <div className="info a-line">
                        <div className="left-info">Nội dung</div>
                        <div className="right-info">
                            <div className="above-content td-right">CAO TAI PHAT</div>
                        </div>
                    </div>
                </div>
                {/* Banner */}
                <div className="banner">
                    <img src={bannerVietin}></img>
                </div>
            </div>
        </div>
    )
}

export default Bill