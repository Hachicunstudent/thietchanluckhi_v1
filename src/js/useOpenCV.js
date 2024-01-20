// useOpenCv.js
import { useEffect, useState } from 'react';

const useOpenCv = () => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (window.cv && window.cv.getBuildInformation) {
            setIsReady(true);
        } else {
            window.Module = {
                onRuntimeInitialized: () => {
                    setIsReady(true);
                }
            };
        }
    }, []);

    return isReady;
};

export default useOpenCv;
