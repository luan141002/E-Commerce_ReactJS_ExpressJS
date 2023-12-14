import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const [currentColor, setCurrentColor] = useState(product?.productImages[0]?.link);
    const [hoverImage, setHoverImage] = useState(true);

    const currentImage = useRef(product?.productImages[0]?.link);

    useMemo(() => {
        currentImage.current = hoverImage ? product?.productImages[0]?.link : product?.productImages[0]?.link;
    }, [hoverImage]);
    return (
        <div className="flex flex-col">
            <Link to={`/products/${product.id}`}>
                <div
                    className="flex self-center"
                    onMouseOver={() => {
                        setHoverImage(false);
                        // hoverImage.current = false;
                    }}
                    onMouseLeave={() => {
                        setHoverImage(true);
                        // hoverImage.current = true;
                    }}
                >
                    <img className="w-[352px] h-[440px]" src={currentImage.current} alt="anh san pham" />
                </div>
            </Link>
            <Link to={`/products/${product.id}`}>
                <div className="p-[10px] ">
                    <a
                        href="#"
                        title="Levents® Knit Polo/ Brown"
                        class="text-lg text-gray-500 font-extralight leading-3 uppercase"
                    >
                        {product?.productName}
                    </a>
                    <div class="text-lg text-black font-extralight leading-3 uppercase" data-price="530000">
                        <span class="text-lg text-black">
                            <span class="woocommerce-Price-amount amount">
                                <bdi>
                                    {product?.actualPrice}&nbsp;
                                    <span class="woocommerce-Price-currencySymbol">vnđ</span>
                                </bdi>
                            </span>
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
