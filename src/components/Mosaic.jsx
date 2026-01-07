const Mosaic = ({ thumbnail, children, blur = 12, tileSize = 120, opacity = 0.6, borderRadius = '8px' }) => {
    return (
        <div
            style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${thumbnail})`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: `${tileSize}px ${tileSize}px`,
                    filter: `blur(${blur}px)`,
                    transform: 'scale(1.1)',
                    opacity,
                }}
            />
            <div
                style={{
                    position: 'relative',
                    zIndex: 1,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Mosaic;
