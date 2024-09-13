import React, { useEffect, useState } from 'react'
import { Loader } from './loader'

const keywords = ['mandag;', 'meny;', 'mandag:', 'meny:', 'mandag', 'meny']

function getBodyIndex(text: string) {
    for (const keyword of keywords) {
        const bodyIndex = text.toLowerCase().indexOf(keyword)
        if (bodyIndex !== -1) {
            return bodyIndex
        }
    }
    return -1
}

const endKeywords = ['}', '</span>']

function getEndBodyIndex(text: string, start: number): number {
    let endBodyIndex = text.length
    for (const keyword of endKeywords) {
        const index = text.toLowerCase().indexOf(keyword, start + 1)
        if (index !== -1 && index < endBodyIndex && index > start) {
            endBodyIndex = index
        }
    }
    return endBodyIndex
}

function replaceStringTagsForZeroTag(text: string) {
    const textRemovedSlashes = text
        .replaceAll('\\"', '')
        .replaceAll('\\\\', '\\')
        .replaceAll('\\r', '')
        .replaceAll('\\t', '')
    const splitText = textRemovedSlashes.split('\\n')
    const textWithLineBreaks = splitText.map(line => `${line}<br/>`).join('')

    return textWithLineBreaks
}

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

            const bodyIndex = getBodyIndex(unescapedText)
            if (bodyIndex === -1) {
                setMenuContent('Could not find menu <br/> Contact Sjur or Martin to fix this')
                return
            }
            const endBodyIndex = getEndBodyIndex(unescapedText, bodyIndex)
            const extractedText = unescapedText.substring(bodyIndex, endBodyIndex)

            const replacedText = replaceStringTagsForZeroTag(extractedText)

            setMenuContent(replacedText)
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
