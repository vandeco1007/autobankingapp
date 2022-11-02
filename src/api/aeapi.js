import dateValue from '../constant/date'
import authorize from '../middlewares/bo.authorize'
import removeVietnameseTones from '../middlewares/removeVietnameseTone'
import { useEffect,useState } from 'react'
import page1 from './bankstep.js/page1'
var transitionID = []
var device = localStorage.getItem('deviceName')
var token = localStorage.getItem('bankToken')
const Aeapi = {
    login: (token)=>{
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        localStorage.setItem('bouser',JSON.parse(jsonPayload).username)
        window.location.reload()
    },
    transitions: ()=>{
        let myHeaders = new Headers();
        myHeaders.append("accept", " */*");
        myHeaders.append("accept-encoding", " gzip, deflate, br");
        myHeaders.append("accept-language", " vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5");
        myHeaders.append("authorization", localStorage.getItem('token'));
        myHeaders.append("origin", " https://bo.f8bet.cc");
        myHeaders.append("referer", " https://bo.f8bet.cc/");
        myHeaders.append("Cookie", "__cf_bm=SV6DgiooUfleaISJNB0NJ7.ZKMWrkHsw2qvAA7JbtEg-1665491496-0-Ac9Zo4In1jefRdXNW/95jqG7k4eGKTiV9WCxtj5KHOSfSeXCXJx5/5IchGNAdDEExVHeL1YrlSTJBR68FqgA418=");
        
        let requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("https://boapi.f8bet.cc/f8bet-ims/api/v1/withdrawals/search?&starttime="+dateValue.previosdateStart+"&endtime="+dateValue.currentEndDay+"&auditor="+localStorage.getItem('bouser')+"&sort=ASC&sortcolumn=withdrawaltime&limit=25&zoneType=ASIA_SHANGHAI", requestOptions)
          .then(response => response.json())
          .then(result => {
            authorize(result)
            console.log(result)
            result.data.forEach(items => {
                console.log('new version')
                let dataContain = document.getElementById('dataContain')
                let rowInfo = document.createElement('tr')
                rowInfo.setAttribute('class','data-row')
                dataContain.appendChild(rowInfo)
                let player = document.createElement('td')
                let playerValue = document.createTextNode(items.playerid)
                let playerName = document.createElement('td')
                let playerNameValue = document.createTextNode(items.bankaccountname)
                let account = document.createElement('td')
                let accountValue = document.createTextNode(items.bankaccount)
                let bank = document.createElement('td')
                let bankName = document.createTextNode(items.bankname)
                let ammount = document.createElement('td')
                let ammountValue = document.createTextNode(items.actualwithdrawalamt*1000)
                let message = document.createElement('td')
                let messageValue = document.createTextNode(items.bankaccountname)
                let controlPanel = document.createElement('td')
                let controlBtn = document.createElement('button')
                controlBtn.setAttribute('class','transferBtn')
                controlBtn.setAttribute('id',items.withdrawid)
                controlBtn.setAttribute('data-id','{"withdrawid":"'+items.withdrawid
                +'","playerId":"'+items.playerid
                +'","bankAcc":"'+items.bankaccount
                +'","bankName":"'+items.bankname
                +'","bankaccountname":"'+items.bankaccountname
                +'","ammount":'+items.actualwithdrawalamt*1000
                +',"mess":"'+items.bankaccountname+'"}')
                let controlBtnNode = document.createTextNode('')

                player.appendChild(playerValue)
                rowInfo.appendChild(player)
                playerName.appendChild(playerNameValue)
                rowInfo.appendChild(playerName)
                account.appendChild(accountValue)
                rowInfo.appendChild(account)
                bank.appendChild(bankName)
                rowInfo.appendChild(bank)
                ammount.appendChild(ammountValue)
                rowInfo.appendChild(ammount)
                message.appendChild(messageValue)
                rowInfo.appendChild(message)
                controlBtn.appendChild(controlBtnNode)
                controlPanel.appendChild(controlBtn)
                rowInfo.appendChild(controlPanel)
            });
            document.getElementById('tongdon').textContent = result.summary.totalcount
            if(!result.summary.withdrawalamt){
                document.getElementById('tongxuat').textContent = 0
            }else{
                document.getElementById('tongxuat').textContent = result.summary.withdrawalamt
            }
          }).catch(error => console.log('error', error));
    },
    transfer: (data,id)=>{
        var otpContainer = document.getElementsByClassName('otp-container')[0]
        var notifier = document.getElementsByClassName('notifier')[0]
        var notification = document.getElementsByClassName('notification')[0]
        var notifySend = document.getElementsByClassName('notify-send')[0]
        let otpArea = document.getElementsByClassName('otp-area')[0]
        otpArea.style.top='0px'
        otpArea.style.opacity='1'
        otpArea.style.zIndex='10'
        var bankCode = []
        var jsonpars = JSON.parse(data.getAttribute('data-id'))
        if(jsonpars.bankName=='Agribank'){
            bankCode[0]='Agribank'
        }else if(jsonpars.bankName=='Vietcombank'){
            bankCode[0]="VCB"
        }else if(jsonpars.bankName=='Techcom Bank'){
            bankCode[0]="Techcom"
        }else if(jsonpars.bankName=='MB BANK'){
            bankCode[0]="Quan"
        }else if(jsonpars.bankName=='Sacombank'){
            bankCode[0]="Sacombank"
        }else if(jsonpars.bankName=='Vietin Bank'){
            bankCode[0]=970415
        }else if(jsonpars.bankName=='Orient Commercial Bank, OCB'){
            bankCode[0]="Phuong"
        }else if(jsonpars.bankName=='BIDV'){
            bankCode[0]="BIDV"
        }else if(jsonpars.bankName=='ACB'){
            bankCode[0]="ACB"
        }else if(jsonpars.bankName=='VPBank'){
            bankCode[0]="Thinh"
        }else if(jsonpars.bankName=='VP BANK (Cake)'){
            bankCode[0]="Cake"
        }else if(jsonpars.bankName=='TPBank'){
            bankCode[0]='TPBank'
        }else if(jsonpars.bankName=='Maritime Bank, MSB'){
            bankCode[0]="MSB"
        }else if(jsonpars.bankName=='SHBank, SHB'){
            bankCode[0]="Sai Gon Ha Noi"
        }else if(jsonpars.bankName=='HD Bank'){
            bankCode[0]="HD"
        }else if(jsonpars.bankName=='ABBANK'){
            bankCode[0]="ABBANK"
        }else if(jsonpars.bankName=='BacABank'){
            bankCode[0]="BAB"
        }else if(jsonpars.bankName=='BaoVietBank, BVB'){
            bankCode[0]="BVB"
        }else if(jsonpars.bankName=='DongA Bank'){
            bankCode[0]="DongA"
        }else if(jsonpars.bankName=='Eximbank'){
            bankCode[0]="Eximbank"
        }else if(jsonpars.bankName=='IVB'){
            bankCode[0]="IVB"
        }else if(jsonpars.bankName=='KienLongBank'){
            bankCode[0]="Kien Long"
        }else if(jsonpars.bankName=='LienVietPostBank, LPB'){
            bankCode[0]="LPB"
        }else if(jsonpars.bankName=='Nam A Bank'){
            bankCode[0]="Ngan Hang Nam A"
        }else if(jsonpars.bankName=='National Citizen Bank, NCB'){
            bankCode[0]="NCB"
        }else if(jsonpars.bankName=='PG bank'){
            bankCode[0]="PG"
        }else if(jsonpars.bankName=='PVcom Bank'){
            bankCode[0]="PV"
        }else if(jsonpars.bankName=='SCB'){
            bankCode[0]="SCB"
        }else if(jsonpars.bankName=='SeABank'){
            bankCode[0]="SeABank"
        }else if(jsonpars.bankName=='Shinhan BANK'){
            bankCode[0]="Shin"
        }else if(jsonpars.bankName=='UBANK'){
            bankCode[0]="UBANK"
        }else if(jsonpars.bankName=='VIBBank, VIB'){
            bankCode[0]="VIB"
        }else if(jsonpars.bankName=='VietABank, VAB'){
            bankCode[0]="VietA"
        }else if(jsonpars.bankName=='VietCapitalBank'){
            bankCode[0]="VietCap"
        }else if(jsonpars.bankName=='Wooribank'){
            bankCode[0]="Wooribank"
        }else if(jsonpars.bankName=='CIMB'){
            bankCode[0]="CIMB"
        }else if(jsonpars.bankName=='Vietbank, VB'){
            bankCode[0]="Viet Nam Thuong Tin"
        }else if(jsonpars.bankName=='Saigonbank, SGB'){
            bankCode[0]="SGB"  
        }
        page1(jsonpars,bankCode[0])
    }
}

export default Aeapi