import React from 'react'
import Lottie from 'react-lottie'
import BeerLoaderJson from '../assets/json-gifs/beer-loader.json'
import RandomFoodSlider from '../assets/json-gifs/random-food-slider.json'
import SaladDrink from '../assets/json-gifs/salad-drink.json'
import FoodMixin from '../assets/json-gifs/food-mixin.json'
import Hotdog from '../assets/json-gifs/hotdog.json'

const loaderJsons = [BeerLoaderJson, RandomFoodSlider, SaladDrink, FoodMixin, Hotdog]

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
