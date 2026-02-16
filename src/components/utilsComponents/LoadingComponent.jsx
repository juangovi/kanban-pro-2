
const LoadingComponent = () => {
    return (
        <div className='fixed inset-0 z-100 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40 pointer-events-auto'>
            <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
};

export default LoadingComponent;