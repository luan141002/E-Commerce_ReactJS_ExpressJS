import React from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
const defaultLayout = ({ children }) => {
    return (
        <div className='flex flex-col w-full h-screen'>
            <Header />
            <div className=' w-full self-center mt-[100px] '>{children}</div>
            <Footer />
        </div>
    );
};

export default defaultLayout;
