import "./loadingSpinner.css";

export default function LoadingSpinner({ isLoading }: { isLoading: boolean }) {
    return (
        <div className={`spinnerContainer ${isLoading ? 'loading' : ''}`}>
            <div className="spinnerContent">
                <span className="title-primary">VEREZZA</span>
            </div>
        </div>
    );
}

