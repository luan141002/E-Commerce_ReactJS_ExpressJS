import { useState, useEffect, useRef, useMemo } from 'react';

const ProductCard = ({ product }) => {
    const [currentColor, setCurrentColor] = useState(product?.proImage[0]);
    const [pickColor, setPickColor] = useState(0);
    const [hoverImage, setHoverImage] = useState(true);

    const currentImage = useRef(product?.proImage[0]?.frontSide);

    useMemo(() => {
        currentImage.current = hoverImage
            ? currentColor.frontSide
            : currentColor.backSide;
    }, [hoverImage]);
    useMemo(() => {
        console.log(pickColor);
        setCurrentColor(product?.proImage[pickColor]);
        currentImage.current = product?.proImage[pickColor].frontSide;
    }, [pickColor]);
    return (
        <div className='flex flex-col'>
            <div
                className='flex self-center'
                onMouseOver={() => {
                    setHoverImage(false);
                    // hoverImage.current = false;
                }}
                onMouseLeave={() => {
                    setHoverImage(true);
                    // hoverImage.current = true;
                }}>
                <img
                    className='w-[352px] h-[440px]'
                    src={currentImage.current}
                    alt='anh san pham'
                />
            </div>
            <div className='flex justify-end'>
                {product?.proImage.map((proClass, index) => (
                    <div className='w-[16px] h-[16px] mb-[5px] mr-[5px]'>
                        <img
                            className='w-[16px] h-[16px] mb-[5px]  hover:border'
                            onClick={() => {
                                setPickColor(index);
                            }}
                            style={{
                                border:
                                    pickColor === index ? '2px solid gray' : '',
                            }}
                            src={proClass.color}
                            alt=''
                        />
                    </div>
                ))}
            </div>
            <div className='p-[10px] '>
                <a
                    href='#'
                    title='Levents® Knit Polo/ Brown'
                    class='text-lg text-gray-500 font-extralight leading-4 uppercase'>
                    {product?.proName}
                </a>
                <div
                    class='text-lg text-black font-extralight leading-4 uppercase'
                    data-price='530000'>
                    <span class='text-lg text-black'>
                        <span class='woocommerce-Price-amount amount'>
                            <bdi>
                                {product?.proPrice}&nbsp;
                                <span class='woocommerce-Price-currencySymbol'>
                                    vnđ
                                </span>
                            </bdi>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
