import React from 'react';


function Loader(Component) {
    return function LoaderComponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />;
        return (
            <p style={{ fontSize: '25px' }}>
                We are waiting for data to load!
            </p>
        );
    };
}

export default Loader;
