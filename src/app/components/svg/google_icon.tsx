import React, { SVGAttributes } from 'react';

export const GoogleIcon: React.FC<SVGAttributes<SVGElement>> = () => (
    <svg
        style={{ padding: '0 0 2 0px', margin: '0 10 0 0px', fontSize: '24px' }}
        viewBox="0 0 32 32"
        width="20"
        height="20"
        fill="currentcolor"
        role="img"
        aria-label="google icon"
    >
        <g fill="none" fillRule="evenodd">
            <path
                d="M16 32c4.32 0 7.947-1.422 10.596-3.876l-5.05-3.91c-1.35.942-3.164 1.6-5.546 1.6-4.231 0-7.822-2.792-9.102-6.65l-5.174 4.018C4.356 28.41 9.742 32 16 32z"
                fill="#34A853"
            />
            <path
                d="M6.898 19.164A9.85 9.85 0 0 1 6.364 16c0-1.102.196-2.169.516-3.164L1.707 8.818A16.014 16.014 0 0 0 0 16c0 2.578.622 5.013 1.707 7.182l5.19-4.018z"
                fill="#FBBC05"
            />
            <path
                d="M31.36 16.356c0-1.316-.107-2.276-.338-3.272H16v5.938h8.818c-.178 1.476-1.138 3.698-3.271 5.191l5.049 3.911c3.022-2.79 4.764-6.897 4.764-11.768z"
                fill="#4285F4"
            />
            <path
                d="M16 6.187c3.004 0 5.031 1.297 6.187 2.382l4.515-4.409C23.93 1.582 20.32 0 16 0 9.742 0 4.338 3.591 1.707 8.818l5.173 4.018c1.298-3.858 4.889-6.65 9.12-6.65z"
                fill="#EA4335"
            />
        </g>
    </svg>
);
