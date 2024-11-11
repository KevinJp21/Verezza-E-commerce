import { useTranslation } from 'react-i18next'
import './WearHome.css'

import { useProductContext } from '~/hooks/ProductContext'
import { useState } from 'react'




export default function WearHome(){
    const { products } = useProductContext()
    const { t } = useTranslation()
    const [isExpanded1, setIsExpanded1] = useState(false)
    const [isExpanded2, setIsExpanded2] = useState(false)

    // Filtramos los productos y limitamos a 2 imágenes por producto
    const product1 = products.find(product => product.title.toLowerCase() === 'silvia')
    const product2 = products.find(product => product.title.toLowerCase() === 'amada')

    // Agregar función auxiliar para truncar texto
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text
        return text.slice(0, maxLength) + '...'
    }

    return(
        <section className='WearHomeContainer'>
            <h2 className='title-primary'>{t("home.section_wear.title")}</h2>
            <div className='WearHomeWrapper'>
                {product1 && (
                    <div className='WearImg img1'>
                        <img 
                            className='img1-1' 
                            src={product1.images.edges[0].node.url} 
                            alt={product1.title} 
                            loading="lazy" 
                            decoding="async" 
                            width={1440} 
                            height={2160} 
                        />
                        <img 
                            className='img1-2' 
                            src={product1.images.edges[1].node.url} 
                            alt={product1.title} 
                            loading="lazy" 
                            decoding='async' 
                            width={1440} 
                            height={2160} 
                        />
                        <div className='WearImgText'>
                            <h3>{product1.title}</h3>
                            <p>
                                {isExpanded1 
                                    ? product1.description 
                                    : truncateText(product1.description, 150)}
                                {product1.description.length > 150 && (
                                    <button 
                                        onClick={() => setIsExpanded1(!isExpanded1)}
                                        className="read-more-btn"
                                    >
                                        {isExpanded1 ? t('home.section_wear.read_less') : t('home.section_wear.read_more')}
                                    </button>
                                )}
                            </p>
                            <a className="btn-primary" href={`/products/${product1.handle}`}>
                                {t("home.section_wear.button")}
                            </a>
                        </div>
                    </div>
                )}

                {product2 && (
                    <div className='WearImg img2'>
                        <img 
                            className='img1-1' 
                            src={product2.images.edges[0].node.url} 
                            alt={product2.title} 
                            loading='lazy' 
                            decoding='async' 
                            width={1440} 
                            height={2160} 
                        />
                        <img 
                            className='img1-2' 
                            src={product2.images.edges[1].node.url} 
                            alt={product2.title} 
                            loading='lazy' 
                            decoding='async' 
                            width={1440} 
                            height={2160} 
                        />
                        <div className='WearImgText'>
                            <h3>{product2.title}</h3>
                            <p>
                                {isExpanded2 
                                    ? product2.description 
                                    : truncateText(product2.description, 150)}
                                {product2.description.length > 150 && (
                                    <button 
                                        onClick={() => setIsExpanded2(!isExpanded2)}
                                        className="read-more-btn"
                                    >
                                        {isExpanded2 ? t('home.section_wear.read_less') : t('home.section_wear.read_more')}
                                    </button>
                                )}
                            </p>
                            <a className="btn-primary" href={`/products/${product2.handle}`}>
                                {t("home.section_wear.button")}
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}