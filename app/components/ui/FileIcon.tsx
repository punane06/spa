import React from 'react'

const FileIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => {
  return (
    <svg fill="currentColor" {...props} version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <g>
            <polygon points="20,2.6 20,8 25.4,8"/>
            <path d="M23.5,10H19c-0.6,0-1-0.4-1-1V2H7C6.4,2,6,2.4,6,3v26c0,0.6,0.4,1,1,1h18c0.6,0,1-0.4,1-1V12.5C26,11.1,24.9,10,23.5,10z"
                />
        </g>
    </svg>
  )
}

export default FileIcon