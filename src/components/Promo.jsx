import react from 'react';

const Promo = () => {
    return(
        <div className='h-screen bg-fixed ' style={{backgroundImage: "url('/images/staticbg.jpg')", backgroundSize: 'cover'}}>
                            
                <div className=' z-10 flex flex-col items-end  h-full text-white p-8 mr-40'>
                
                <div className='text-left mt-35'>  
                      <p className='text-2xl font-light text-black font-band mb-4 tracking-wider'>Cosmetic Destination</p>
                    <p className='text-6xl  text-black font-band mb-6'> <span className='text-pink-600'> Get 20% </span> Off on all <br></br>Cosmetic Products </p>
                    <button className='bg-white border-2 border-pink-300 hover:bg-pink-400 hover:text-white text-sm text-black font-band px-2 py-2 w-[15rem] rounded shadow-md transition duration-300'>BROWSE PRODUCTS</button>
                </div></div>

        </div>

    )
}

export default Promo;