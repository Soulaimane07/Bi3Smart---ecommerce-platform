import { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa6";


export const GetTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;

            setIsVisible(scrollTop > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const TopPage = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
      
    return (
        <button onClick={()=> TopPage()} className={`${isVisible ? "visible" : "hidden"} fixed bottom-6 rounded-full opacity-60 hover:opacity-100 transition-all right-6 md:right-20 bg-gray-100 hover:bg-white shadow drop-shadow-xl hover:shadow-lg px-4 py-4 md:px-6 md:py-6 `}>
            <FaAngleUp size={20} />
        </button>
    )
}