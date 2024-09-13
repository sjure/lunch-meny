import React, { useEffect, useState } from 'react'
import { Loader } from './loader'

const MenuPage: React.FC = () => {
    const [menuContent, setMenuContent] = useState<string>('')

    useEffect(() => {
        const getMenu = async () => {
            const proxyUrl =
                'https://lunch-meny.netlify.app/.netlify/functions/cors-proxy/?url='
            const targetUrl = 'https://cag30.munu.shop/ukens'

            const response = await fetch(proxyUrl + targetUrl)
            const text = await response.text()

            const decodeUnicodeEscapes = (str: string) => {
                return str.replace(/\\u([0-9A-Fa-f]{4})/g, (_match, group1: string) => {
                    return String.fromCharCode(parseInt(group1, 16))
                })
            }

            const decodedText = decodeUnicodeEscapes(text)
            const unescapedText = decodeURIComponent(decodedText)

            const bodyIndex = unescapedText.toLowerCase().indexOf('mandag:')
            if (bodyIndex === -1) {
                console.error("Could not find 'Mandag:' in menu text")
            }
            const endBody = unescapedText.indexOf('}', bodyIndex)
            const extractedText = unescapedText
                .substring(bodyIndex, endBody - 1)
                .replaceAll('\\"', '')
                .replaceAll('\\', '')

            setMenuContent(extractedText)
        }

        getMenu().catch(error => {
            console.error('Failed to fetch menu:', error)
        })
    }, [])

    if (!menuContent) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        )
    }
    return (
        <div>
            <div
                id="content"
                className="py-6 text-center"
                dangerouslySetInnerHTML={{ __html: menuContent }}
            ></div>
        </div>
    )
}

export default MenuPage
