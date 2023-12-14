// UI for input some text and upload image
import React from 'react';
const urlImgBase = 'https://res.cloudinary.com/dkkgmzpqd/image/upload/v1545217305/T-shirt%20Images/';

const Setting = ({
    tshirtInfo,
    color,
    upperText,
    lowerText,
    tShirtImg,
    upperTextSize,
    lowerTextSize,
    upperTextColor,
    lowerTextColor,
    captureScreenshot,
    sizeSelect,
}) => {
    const handleSave = () => {
        console.log(tshirtInfo);
    };
    // State để lưu trữ kích thước được chọn

    // Hàm xử lý sự kiện khi người dùng chọn kích thước

    return (
        <div className="mx-auto bg-white shadow-md rounded-md p-4">
            <h3 className="text-center"> Setting</h3>
            <h4>Change T-shirt Color</h4>
            <div className="flex flex-wrap justify-between">
                <img
                    onClick={color}
                    src={`${urlImgBase}white.png`}
                    alt="white-tshirt"
                    className="w-[15%] h-[15%]"
                    id="white"
                />
                <img
                    onClick={color}
                    src={`${urlImgBase}black.png`}
                    alt="black-tshirt"
                    className="w-[15%] h-[15%]"
                    id="black"
                />
                <img
                    onClick={color}
                    src={`${urlImgBase}grey.png`}
                    alt="grey-tshirt"
                    className="w-[15%] h-[15%]"
                    id="grey"
                />
                <img
                    onClick={color}
                    src={`${urlImgBase}blue.png`}
                    alt="blue-tshirt"
                    className="w-[15%] h-[15%]"
                    id="blue"
                />
                <img
                    onClick={color}
                    src={`${urlImgBase}red.png`}
                    alt="red-tshirt"
                    className="w-[15%] h-[15%]"
                    id="red"
                />
            </div>
            <br />
            <div className="flex flex-col">
                <h4>Write Text</h4>
                <input onChange={upperText} type="text" className="mb-2 text-medium p-3" placeholder="Upper Text" />
                <input onChange={lowerText} type="text" className="mb-2 text-medium p-3" placeholder="Lower Text" />
            </div>
            <br />
            <h4>Upload Image</h4>
            <div className="mb-2 text-medium p-3">
                <input onChange={tShirtImg} type="file" className="mb-2" />
            </div>
            <br />
            <h4>Upper Text Size</h4>
            <input onChange={upperTextSize} type="range" className="mb-2 w-full" min="0" max="34" />
            <br />
            <h4>Upper Text Color</h4>
            <select onChange={upperTextColor} className="w-full border py-2 px-3 mb-2">
                <option>White</option>
                <option>Black</option>
                <option>Red</option>
                <option>Blue</option>
            </select>
            <br />
            <br />

            <h4>Lower Text Size</h4>
            <input onChange={lowerTextSize} type="range" className="mb-2 w-full" min="0" max="34" />
            <br />
            <br />
            <h4>Lower Text Color</h4>
            <select onChange={lowerTextColor} className="w-full border py-2 px-3 mb-2">
                <option>White</option>
                <option>Black</option>
                <option>Red</option>
                <option>Blue</option>
            </select>
            <select onChange={sizeSelect} className="w-full border py-2 px-3 mb-2">
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>XXL</option>
            </select>
        </div>
    );
};

export default Setting;
