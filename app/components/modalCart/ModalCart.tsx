interface ModalCartProps {
    isOpen: boolean;
    onClose: () => void;
    productId: number;
    selectedProduct: string | null;
    imgProduct: string[];
    price: number;
    description: string;
}

const ModalCart: React.FC<ModalCartProps> = ({ isOpen, onClose, productId, selectedProduct, imgProduct, price, description }) => {
    
   const handleClose = () => {
    onClose();
   }
    return (
        <div>
            <h1>ModalCart</h1>
        </div>
    )
}

export default ModalCart;