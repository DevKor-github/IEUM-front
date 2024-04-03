import React from "react";
import Blank_Profile from "../../assets/images/blank_profile.svg";
import Temp_Logo from "../../assets/images/temp_logo.svg";
import Share_Icon from "../../assets/images/share_icon.svg";
import Locaiton_Num_Icon from "../../assets/images/location_num_icon.svg";

const Profile = () => {

    return (
        <div className="profile-box">
            <div style={{
                display: 'flex',
                width: '405px',
                marginTop: 20,
                marginBottom: 34,
                justifyContent: 'flex-end',
            }}>
                <img src={Temp_Logo} alt="" style={{
                    width: 103,
                    height: 32,
                }} />
            </div>
            <div style={{
                width: '438px',
                display: 'flex',
                alignItems: 'center',
                marginLeft: 23
            }}>
                <img src={Blank_Profile} alt="" style={{
                    width: 80,
                    height: 80
                }}/>
                <div style={{
                    marginLeft: 23
                }}>
                    <text style={{fontWeight: '600', fontSize: '24px'}}>so_odeng</text>
                    <text style={{fontWeight: '500', fontSize: '24px'}}>님의 지도</text>
                    
                    <div style={{
                        height: 16,
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: 5
                    }}>
                        <img src={Locaiton_Num_Icon} alt="" />
                        <text style={{fontWeight: '600', fontSize: '13px', marginLeft: 10, color: 'grey'}}>31개의 장소</text>
                    </div>
                </div>
                <div style={{
                    display: 'grid',
                    position: "absolute",
                    width: 387,
                    justifyContent: 'flex-end',
                }}>
                    <button style={{
                        backgroundColor: 'transparent',
                        borderColor: 'transparent'
                    }}><img src={Share_Icon} alt="" /></button>
                    <text style={{
                        fontWeight: '500',
                        fontSize: '13px',
                        marginTop: 3,
                        color: 'grey',
                        justifySelf: 'center'
                    }}>공유</text>
                    </div>
            </div>
        </div>
    )
}


export default Profile;