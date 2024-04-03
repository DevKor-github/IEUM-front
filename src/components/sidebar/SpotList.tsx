import React, { useState } from "react";
import Area_Select from "../../assets/images/area_select.svg";
import Sample_Image_1 from "../../assets/images/sample_image_1.svg";
import Sample_Image_2 from "../../assets/images/sample_image_2.svg";

const SpotList = () => {

    return (
        <div className="spot-list">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                    height: '50px',
                    width: '103px',
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <text style={{ fontWeight: '600', fontSize: '16px', marginLeft: 15 }}>지역 </text>
                    <button style={{
                        height: '50px',
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                        justifyContent: 'center',
                        marginLeft: 15
                    }}>
                        <img src={Area_Select} alt="" style={{ height: '7px', width: '14px' }}/>
                    </button>
                </div>
                <button style={{
                    height: '50px',
                    width: '74px',
                    backgroundColor: 'transparent',
                    borderColor: 'transparent'
                }}>
                    <text style={{ color: 'grey', fontWeight: '500', fontSize: '16px' }}>서울</text>
                </button>
                <button style={{
                    height: '50px',
                    width: '74px',
                    backgroundColor: 'transparent',
                    borderColor: 'transparent'
                }}>
                    <text style={{ color: 'grey', fontWeight: '500', fontSize: '16px' }}>부산</text>
                </button>
            </div>

            <hr style={{ height: '1px' }} />
            
            <div style={{ width: '435px', height: '535px', overflowY: 'scroll' }}>
                <div style={{ height: '371px', padding: '23px' }}>
                    <div style={{ display: 'flex', marginTop: '43px', marginBottom: '24px'}}>
                        <img src={Sample_Image_1} alt="" style={{ marginRight: '4px'}} />
                        <img src={Sample_Image_2} alt=""/>
                    </div>
                    <div>
                        <text style={{ fontWeight: '500', fontSize: '21px' }}>소연옥 해리단길점</text>
                        <text style={{ marginLeft: '10px', color: 'grey', fontWeight: '500', fontSize: '15px' }}>일식</text>
                    </div>
                    <text style={{ color: 'grey', fontWeight: '400', fontSize: '14px' }}>부산 해운대구</text>
                    <div style={{ marginTop: '15px' }}>
                        <text style={{ fontWeight: '500', fontSize: '13.5px' }}>#일식 #해운대 맛집</text>
                        <text style={{ whiteSpace: 'pre-line', fontWeight: '400', fontSize: '12.5px' }}> {'\n'}어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔</text>
                    </div>
                </div>

                <hr style={{ height: '1px' }} />

                <div style={{ height: '371px', padding: '23px' }}>
                    <div style={{ display: 'flex', marginTop: '43px', marginBottom: '24px'}}>
                        <img src={Sample_Image_1} alt="" style={{ marginRight: '4px'}} />
                        <img src={Sample_Image_2} alt=""/>
                    </div>
                    <div>
                        <text style={{ fontWeight: '500', fontSize: '21px' }}>소연옥 해리단길점</text>
                        <text style={{ marginLeft: '10px', color: 'grey', fontWeight: '500', fontSize: '15px' }}>일식</text>
                    </div>
                    <text style={{ color: 'grey', fontWeight: '400', fontSize: '14px' }}>부산 해운대구</text>
                    <div style={{ marginTop: '15px' }}>
                        <text style={{ fontWeight: '500', fontSize: '13.5px' }}>#일식 #해운대 맛집</text>
                        <text style={{ whiteSpace: 'pre-line', fontWeight: '400', fontSize: '12.5px' }}> {'\n'}어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔어쩌구저쩌구어쩔저쩔</text>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpotList;