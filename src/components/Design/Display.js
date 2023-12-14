// UI for the Tshirt
import React from 'react';
import Blue from '../../assets/blue.png';
import Black from '../../assets/black.png';
import Grey from '../../assets/grey.png';
import White from '../../assets/white.png';
import Red from '../../assets/red.png';

const Display = ({ display, upperTextFormat, lowerTextFormat, productImg }) => {
    let tShirtSource;
    if (display.tshirtColor === 'blue') {
        tShirtSource = Blue;
    } else if (display.tshirtColor === 'grey') {
        tShirtSource = Grey;
    } else if (display.tshirtColor === 'white') {
        tShirtSource = White;
    } else if (display.tshirtColor === 'red') {
        tShirtSource = Red;
    } else {
        tShirtSource = Black;
    }

    return (
        <div class="bg-blue-900 shadow-md rounded-md p-5 mx-auto">
            <div class="bg-white relative text-center p-6">
                <img class="w-full max-w-full h-auto " src={tShirtSource} alt="img-Tshirt" />

                <div className="absolute top-[25%] left-[33%] text-center ">
                    <div className={`text-white font-semibold font-sans mb-[10px]`}>
                        <p style={{ fontSize: upperTextFormat, color: display.upperTextColor }}>{display.upperText}</p>
                    </div>
                    <img
                        src={
                            display.tShirtImg === null
                                ? 'http://via.placeholder.com/400x300'
                                : display.tShirtImg.preview
                        }
                        alt="mêm-text"
                        className="max-w-[300px]  font-semibold font-sans border-0"
                    />
                    <div className={`text-white font-semibold font-sans mt-[10px]`}>
                        <p style={{ fontSize: lowerTextFormat, color: display.lowerTextColor }}>{display.lowerText}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Display;
