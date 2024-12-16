import { css } from '@emotion/react';

export const ErrorToastStyle = (showToast: boolean) => css`
 position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #B83C3C; /* Error red color */
    color: white;
    border-radius: 5px;
    padding: 15px 20px;
    font-size: 1rem;
    font-family: 'Arial', sans-serif;
    z-index: 1000;
    max-width: 80%;
    text-align: center;
    opacity: ${showToast ? 1 : 0};
    visibility: ${showToast ? 'visible' : 'hidden'};
    transition: opacity 0.5s ease, visibility 0.5s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;
