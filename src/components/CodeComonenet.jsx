import React, { useRef } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function CodeComponent({content}) {
    const codeRef = useRef(null);

    const handleCopyClick = () => {
        // Check if the codeRef is available
        if (codeRef.current) {
            // Create a temporary textarea element to copy the text
            const textarea = document.createElement('textarea');
            textarea.value = codeRef.current.innerText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    };

    return (
        <div className='container m-2'>
            <div className='bg-black rounded'>

                <div className="card">
                    <div className="card-body bg-black rounded">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-white text-xs font-bold mt-0">Code snnipet</p>
                            <button
                                className="bg-transparent text-white px-2  rounded hover:bg-blue-700"
                                onClick={handleCopyClick}
                            >
                                <ContentCopyIcon style={{fontSize:'large'}}/>
                            </button>
                        </div>

                        <hr className="bg-white" />

                        <div className='flex align-middle mt-2'>
                            <h4 className='text-white mt-1 text-left' style={{ whiteSpace: 'pre-wrap' }} ref={codeRef}>
                                {/* Your code goes here */}
                                <p>
                                    {content}
                                </p>
                            </h4>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CodeComponent;
