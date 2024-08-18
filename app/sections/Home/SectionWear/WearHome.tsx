import './WearHome.css'

import imgWearComplements from '~/assets/images/SectionWear/complementos.webp'
import imgWearComplements2 from '~/assets/images/SectionWear/Complementos2.webp'
import imgWearComplements3 from '~/assets/images/SectionWear/cinturonBeauty1.webp'
import imgWearComplements4 from '~/assets/images/SectionWear/cinturonBeauty2.webp'



export default function WearHome(){
    return(
        <section className='WearHomeContainer'>
            <h2>Complementa tu look</h2>
            <div className='WearHomeWrapper'>
                <div className='WearImg img1'>
                    <img className='img1-1' src={imgWearComplements} alt="Imagen complementos olga lucia cortes" loading="eager" width={780} height={1200} />
                    <img className='img1-2' src={imgWearComplements2} alt="Imagen complementos olga lucia cortes" loading='lazy' decoding='async' width={780} height={1200} />
                    <div className='WearImgText'>
                        <h3>Hebilla Anfar</h3>
                        <p>El toque final perfecto: un accesorio que transforma cualquier look en una declaración audaz.</p>
                        <a href="#">Ver más</a>
                    </div>
                </div>

                <div className='WearImg img2'>
                    <img className='img1-1' src={imgWearComplements3} alt="Cinturon beauty Olga Lucia Cortes" loading='lazy' decoding='async' width={780} height={1200} />
                    <img className='img1-2' src={imgWearComplements4} alt="Cinturon beauty Olga Lucia Cortes" loading='lazy' decoding='async' width={780} height={1200} />
                    <div className='WearImgText'>
                        <h3>Cinturón Beauty</h3>
                        <p>El cinturón Beauty es la esencia de la sofisticación. Define tu estilo con su elegancia atemporal y realza cualquier atuendo con un toque de distinción.</p>
                        <a href="#">Ver más</a>
                    </div>
                </div>
            </div>
        </section>
    )
}