import './WearHome.css'

import imgWearComplements from '~/assets/images/SectionWear/complementos.webp'
import imgWearComplements2 from '~/assets/images/SectionWear/Complementos2.webp'
import imgWearBlouse from '~/assets/images/SectionWear/wear-blouse.webp'
import imgWearBlouse2 from '~/assets/images/SectionWear/wear-blouse2.webp'



export default function WearHome(){
    return(
        <section className='WearHomeContainer'>
            <div className='WearHomeWrapper'>
                <div className='WearImg img1 group relative'>
                    <img className='group-hover:hidden' src={imgWearComplements} alt="Imagen complementos olga lucia cortes" loading='lazy'/>
                    <img className='hidden group-hover:block' src={imgWearComplements2} alt="Imagen complementos olga lucia cortes" loading='lazy' />
                    <div className='WearImgText'>
                        <h3>Complementos</h3>
                        <p>El toque final perfecto: un cinturón que redefine tu estilo con elegancia.</p>
                        <a href="#">Ver más</a>
                    </div>
                </div>

                <div className='WearImg img2 group relative'>
                    <img className='group-hover:hidden' src={imgWearBlouse} alt="Imagen blusa olga lucia cortes" loading='lazy'/>
                    <img className='hidden group-hover:block' src={imgWearBlouse2} alt="Imagen blusa olga lucia cortes" loading='lazy' />
                    <div className='WearImgText'>
                        <h3>Blusas</h3>
                        <p>Blusas que combinan comodidad y sofisticación para cualquier ocasión.</p>
                        <a href="#">Ver más</a>
                    </div>
                </div>
            </div>
        </section>
    )
}