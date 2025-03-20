import React from 'react';


function Home() {


    return (
        <div className='px-[2rem] py-[1.5rem] space-y-[3rem]'>
            <div className="text-center mt-8 space-y-[1rem]">
                <h1 className="text-3xl font-bold underline">Welcome to the Post System</h1>
                <p className="font-bold">Below are the latest posts</p>
            </div>
            <div>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold underline'>Posts</h1>
                </div>
            </div>
        </div>
    );
}

export default Home;