import React, { useEffect, useState } from 'react'

const MenuPage: React.FC = () => {
    const [menuContent, setMenuContent] = useState<string>('')

    useEffect(() => {
        const getMenu = async () => {
            const proxyUrl =
                'https://66b2007d4ae7b600081f8c69--gorgeous-mandazi-164a7c.netlify.app/.netlify/functions/cors-proxy/?url='
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

            const bodyIndex = unescapedText.indexOf('"Ukesmeny')
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