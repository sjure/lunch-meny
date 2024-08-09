import React from 'react'
import Lottie from 'react-lottie'
import BeerLoaderJson from '../assets/json-gifs/beer-loader.json'

export const Loader: React.FC = () => {
    return (
        <div>
            <Lottie
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: BeerLoaderJson,
                }}
                height={200}
                width={200}
            />
        </div>
    )
}
