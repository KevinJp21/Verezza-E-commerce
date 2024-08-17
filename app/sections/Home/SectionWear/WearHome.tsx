import './WearHome.css'
import imgWearComplements from '~/assets/images/SectionWear/complementos.webp'
import imgWearComplements2 from '~/assets/images/SectionWear/Complementos2.webp'
import imgWearBlouse from '~/assets/images/SectionWear/wear-blouse.webp'
import imgWearBlouse2 from '~/assets/images/SectionWear/wear-blouse2.webp'



export default function WearHome(){
    return(
        <section className='WearHomeContainer'>
            <div className='WearHomeWrapper'>
                <div className='WearImg img1'>
                    <img src={imgWearComplements} alt="Imagen complementos olga lucia cortes" loading='lazy' decoding='async' />
                    <div className='WearImgText'>
                        <h3>Complementos</h3>
                        <p>El toque final perfecto: un cinturón que redefine tu estilo con elegancia.</p>
                        <a href="#">Ver más</a>
                    </div>
                </div>

                <div className='WearImg img2'>
                    <img src={imgWearBlouse} alt="Imagen blusa olga lucia cortes" loading='lazy' decoding='async' />
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