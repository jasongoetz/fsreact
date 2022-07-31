import React, {SVGAttributes} from 'react';
import {Colors} from "../../theme/theme";

interface Props extends SVGAttributes<SVGElement>{
    size?: number;
}

export const FakeStacksIcon: React.FC<Props> = ({ size = 20 }) => (
    <svg
        style={{ padding: '0 0 2 0px', margin: '0 10 0 0px', fontSize: '24px' }}
        version="1.1"
        id="fs_icon"
        x="0px"
        y="0px"
        viewBox="0 0 16 16"
        width={size}
        height={size}
    >
        <circle fill={Colors.brandMutedGreen} cx="7.99" cy="8.02" r="7.89"/>
        <path fill={Colors.brandSuperLightGreen} d="M7.99,14.81c-3.74,0-6.79-3.05-6.79-6.79s3.05-6.79,6.79-6.79c3.74,0,6.79,3.05,6.79,6.79
        S11.73,14.81,7.99,14.81z M7.99,2.23c-3.19,0-5.79,2.6-5.79,5.79c0,3.19,2.6,5.79,5.79,5.79s5.79-2.6,5.79-5.79
        C13.78,4.83,11.18,2.23,7.99,2.23z"/>
        <g>
            <path fill={Colors.brandSuperLightGreen} d="M8.51,11.47v0.85H7.68v-0.85c-1.3-0.16-2.03-1.02-2.03-2.45h1.16c0,0.91,0.48,1.47,1.3,1.47
            c0.7,0,1.08-0.34,1.08-0.94c0-0.44-0.22-0.73-0.9-0.98L7.2,8.2C6.3,7.89,5.86,7.15,5.86,6.26c0-0.93,0.73-1.75,1.83-1.88v-0.9h0.82
            v0.93c1.02,0.19,1.68,0.98,1.68,2.12H9.03c0-0.75-0.37-1.19-1.06-1.19c-0.6,0-0.94,0.33-0.94,0.84c0,0.48,0.21,0.84,0.98,1.11
            l1.14,0.4c0.82,0.29,1.21,0.93,1.21,1.8C10.35,10.57,9.62,11.32,8.51,11.47z"/>
        </g>
    </svg>
);
