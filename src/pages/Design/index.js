import React, { useState, useMemo, useRef, useEffect } from 'react';
import Display from '../../components/Design/Display.js';
import Settings from '../../components/Design/Setting.js';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService.js';
import ProductService from '../../services/ProductService.js';
import { useDispatch } from 'react-redux';
import cartsSlices from '../../redux/cartsSlice.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const productImg = useRef(null);
    const dispatch = useDispatch();
    const [tshirtInfo, setTshirtInfo] = useState({
        tshirtColor: 'black',
        upperText: 'This is Upper Text',
        lowerText: 'This is Lower Text',
        tShirtImg: null,
        upperTextSize: 34,
        lowerTextSize: 34,
        upperTextColor: 'white',
        lowerTextColor: 'white',
        size: 'L',
    });
    const { productId } = useParams();
    useEffect(() => {
        return () => {
            tshirtInfo.tShirtImg && URL.revokeObjectURL(tshirtInfo.tShirtImg.preview);
        };
    }, [tshirtInfo.tShirtImg]);
    const [customProductId, setCustomProductId] = useState(null);
    const captureScreenshot = () => {
        if (productImg.current) {
            html2canvas(productImg.current)
                .then((canvas) => {
                    // Convert the canvas to a data URL and open it in a new tab or save it
                    const screenshotDataUrl = canvas.toDataURL('image/png', 1.0);
                    fetch(screenshotDataUrl)
                        .then((res) => res.blob())
                        .then(async (blob) => {
                            const file = new File([blob], 'canvas_image.png', { type: 'image/png' });

                            // Now 'file' is your image file, you can use it as needed
                            // For example, you can upload it, save it, etc.
                            console.log('Image file:', file);
                            let formData;
                            if (file != null) {
                                formData = new FormData();
                            }
                            var customProductId;
                            formData.append('images', file);
                            try {
                                const response = await ProductService.addCustomProduct(productId, formData);
                                console.log(response.id);
                                setCustomProductId(response.id);
                            } catch (err) {
                                toast.error('Save custom product failed', {
                                    position: toast.POSITION.TOP_RIGHT,
                                });
                            }
                        })
                        .catch((error) => {
                            console.error('Error exporting image:', error);
                        });
                    // downloadImage(screenshotDataUrl, 'my-canvas.jpeg');
                    // const newTab = window.open();
                    // newTab.document.body.innerHTML = `<img src="${screenshotDataUrl}" alt="Screenshot"/>`;
                })
                .catch((error) => {
                    console.error('Error capturing screenshot:', error);
                });
        }
    };
    function downloadImage(data, filename = 'untitled.jpeg') {
        var a = document.createElement('a');
        a.href = data;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
    }

    const handleTshirtColor = (e) => {
        setTshirtInfo({ ...tshirtInfo, tshirtColor: e.target.id });
    };
    const handleUpperText = (e) => {
        setTshirtInfo({ ...tshirtInfo, upperText: e.target.value });
    };
    const handleLowerText = (e) => {
        setTshirtInfo({ ...tshirtInfo, lowerText: e.target.value });
    };
    const handleTshirtImg = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        console.log(file);
        setTshirtInfo({ ...tshirtInfo, tShirtImg: file });
    };
    const handleUpperTextSize = (e) => {
        setTshirtInfo({ ...tshirtInfo, upperTextSize: e.target.value });
    };
    const handleLowerTextSize = (e) => {
        setTshirtInfo({ ...tshirtInfo, lowerTextSize: e.target.value });
    };
    const formatUpperText = () => {
        const size = tshirtInfo.upperTextSize;
        return parseInt(size);
    };
    const formatLowerText = () => {
        const size = tshirtInfo.lowerTextSize;
        return parseInt(size);
    };
    const handleUpperTextColor = (e) => {
        setTshirtInfo({ ...tshirtInfo, upperTextColor: e.target.value });
    };
    const handleLowerTextColor = (e) => {
        setTshirtInfo({ ...tshirtInfo, lowerTextColor: e.target.value });
    };
    const handleSizeSelect = (e) => {
        setTshirtInfo({ ...tshirtInfo, size: e.target.value });
    };

    return (
        <div className="mx-auto py-5 mt-[5%] p-5">
            <div className="flex justify-around space-x-3">
                <div className="w-[60%] justify-center" ref={productImg}>
                    <Display
                        display={tshirtInfo}
                        upperTextFormat={formatUpperText()}
                        lowerTextFormat={formatLowerText()}
                    />
                </div>
                <div className="w-[40%] justify-center">
                    <Settings
                        //  captureScreenshot={captureScreenshot}
                        tshirtInfo={tshirtInfo}
                        color={handleTshirtColor}
                        upperText={handleUpperText}
                        lowerText={handleLowerText}
                        tShirtImg={handleTshirtImg}
                        upperTextSize={handleUpperTextSize}
                        lowerTextSize={handleLowerTextSize}
                        upperTextColor={handleUpperTextColor}
                        lowerTextColor={handleLowerTextColor}
                        sizeSelect={handleSizeSelect}
                    />
                </div>
            </div>
            <br />
            <button
                className="p-4 bg-red-700 mb-2 w-[50%] mx-auto ml-20 text-white hover:border hover:border-white"
                onClick={captureScreenshot}
            >
                save
            </button>
            {customProductId !== null ? (
                <button
                    className="p-4 bg-red-700 mb-2 w-[50%] mx-auto ml-20  text-white hover:border hover:border-white"
                    onClick={async () => {
                        try {
                            const cartResponse = await ProductService.addToCart(customProductId, 1, tshirtInfo.size);
                            console.log(cartResponse);
                            toast.success('Save to cart successfully', {
                                position: toast.POSITION.TOP_RIGHT,
                            });
                            navigate('/products');
                        } catch (err) {
                            toast.error('Save to cart failed', {
                                position: toast.POSITION.TOP_RIGHT,
                            });
                        }
                    }}
                >
                    Add to cart
                </button>
            ) : (
                <div></div>
            )}
            <ToastContainer />
        </div>
    );
};

export default Dashboard;
