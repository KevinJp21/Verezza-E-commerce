import './Bag.css';
import { closeIcon } from '~/assets/icons/icons';

interface BagProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Bag({ isOpen, onClose }: BagProps) {
    return (
        <>
            <div className={`overlay-bag ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
            <div className={`BagContainer ${isOpen ? 'open' : ''}`}>
                <div className='BagWrapper'>
                    <div className="BagHeader">
                        <h2 className='BagTitle title-primary'>Bolsa de compras</h2>
                        <button className='BagClose' onClick={onClose}>{closeIcon()}</button>
                    </div>
                    <div className="BagContent">
                        <div className="cartEmpty">
                            <p>La bolsa está vacía</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}