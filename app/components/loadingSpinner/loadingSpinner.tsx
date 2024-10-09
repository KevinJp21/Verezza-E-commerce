import "./loadingSpinner.css";

export default function LoadingSpinner({ isLoading }: { isLoading: boolean }) {
    return (
        <div className="spinnerContainer" style={{ display: isLoading ? 'flex' : 'none' }}>
            <div className="spinnerContent">
                <span className="title-primary">OLGA LUCIA CORTES</span>
            </div>
        </div>
    );
}

