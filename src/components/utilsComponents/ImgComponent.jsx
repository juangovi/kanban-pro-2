const ImgComponent = ({ src, alt, className }) => {
    console.log(src)
    if (!src) {
        return (
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt={alt} className={className} />
        )
    }
    return (
        <img src={src} alt={alt} className={className} />
    )
}

export default ImgComponent;