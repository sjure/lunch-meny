import React from 'react'
import Lottie from 'react-lottie'
import BeerLoaderJson from '../assets/json-gifs/beer-loader.json'

const loaderJsons = [BeerLoaderJson]

export const Loader: React.FC = () => {
    const randomLoaderJson = loaderJsons[Math.floor(Math.random() * loaderJsons.length)]

    return (
        <div>
            <Lottie
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: randomLoaderJson,
                }}
                height={200}
                width={200}
            />
        </div>
    )
}
