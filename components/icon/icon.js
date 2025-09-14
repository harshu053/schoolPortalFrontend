export default function Icon({ iconName }) {
  const renderIcons = () => {
    switch (iconName) {
      case "IcArrowback":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 640 640">
            <path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" />
          </svg>
        );
      case "IcClose":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.41 12l6.3-6.29a1.004 1.004 0 00-1.42-1.42L12 10.59l-6.29-6.3a1.004 1.004 0 10-1.42 1.42l6.3 6.29-6.3 6.29a.999.999 0 000 1.42 1 1 0 001.42 0l6.29-6.3 6.29 6.3a1.001 1.001 0 001.639-.325 1 1 0 00-.22-1.095L13.41 12z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcMail":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.59 11.34l8-5.85A3 3 0 0019 5H5a3 3 0 00-1.63.49l8 5.85a1 1 0 001.22 0zm9.25-4.26L13.76 13a3 3 0 01-3.52 0L2.16 7.08A2.82 2.82 0 002 8v8a3 3 0 003 3h14a3 3 0 003-3V8a2.819 2.819 0 00-.16-.92z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcCopy":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8H5a3 3 0 00-3 3v8a3 3 0 003 3h8a3 3 0 003-3v-8a3 3 0 00-3-3zm6-6h-8a3 3 0 00-3 3v1h5a5 5 0 015 5v5h1a3 3 0 003-3V5a3 3 0 00-3-3z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcLogout":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.87 3.91a1 1 0 00-1.58.966 1 1 0 00.4.654 8 8 0 11-9.38 0 1.002 1.002 0 00-1.18-1.62 10 10 0 1011.74 0zM12 8a1 1 0 001-1V3a1 1 0 00-2 0v4a1 1 0 001 1z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "RILLogo":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="none"
          >
            <g clipPath="url(#clip0_1635_17100)">
              <path
                d="M46.0821 15.0808C42.2507 5.30798 32.7061 -0.65042 22.3019 0.0578462C11.392 0.800246 2.08427 9.38691 0.388267 20.2669C0.377526 20.336 0.366496 20.4051 0.355217 20.4741C0.1406 21.7878 0 23.1124 0 24.4435V24.4435C0 25.8106 0.116928 27.1761 0.341613 28.5246C0.484616 29.3828 0.639848 30.2376 0.861867 31.0744C2.8032 38.4066 7.28533 43.6802 14.0139 47.0936C14.1291 47.1512 14.2613 47.1725 14.5941 47.2728C12.8043 44.4418 11.9275 41.4701 11.4432 38.3981C10.6475 33.357 10.7029 28.3842 13.5317 23.868C15.6181 20.5378 18.4981 18.3682 22.5771 18.076C26.9269 17.7645 30.5685 20.3629 31.1125 24.2264C31.7995 29.1138 28.2581 33.1416 23.2981 33.1202C23.1211 33.1202 22.944 33.1202 22.6027 33.1202C22.8331 33.4424 22.9824 33.6941 23.1701 33.9117C26.0459 37.2504 28.9152 40.5954 31.8101 43.9192C33.4912 45.8477 36.4693 45.8413 38.8075 43.9149C42.5749 40.813 45.3141 36.9773 46.72 32.2904C47.1132 30.982 47.3665 29.6305 47.6167 28.2783C47.862 26.9526 48 25.6077 48 24.2594V24.2594V24.2594C48 22.9132 47.8247 21.573 47.523 20.261C47.1191 18.5045 46.732 16.7424 46.0821 15.0829V15.0808Z"
                fill="#C49F56"
              />
              <path
                d="M18.4831 28.1538C18.5279 28.0984 18.4362 28.1666 18.4042 28.2541C17.4164 30.9784 16.3498 33.6792 15.4858 36.4418C15.074 37.7581 14.7946 39.2152 14.9012 40.572C15.1231 43.388 16.8234 45.5341 18.6772 47.612C20.1599 46.0013 21.3354 44.2541 21.9796 42.1826C22.7924 39.5672 22.0415 37.1565 21.0495 34.7544C20.1471 32.5698 19.3322 30.349 18.4831 28.1538Z"
                fill="#C49F56"
              />
            </g>
            <defs>
              <clipPath id="clip0_1635_17100">
                <rect width="48" height="47.6139" fill="white" />
              </clipPath>
            </defs>
          </svg>
        );
      case "IcJioDot":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#ic_jio_dot_svg__clip0_5207_79934)">
              <rect width="24" height="24" rx="12" fill="currentColor"></rect>
              <path
                d="M8.478 7.237h-.4c-.76 0-1.174.428-1.174 1.285v4.129c0 1.063-.359 1.436-1.201 1.436-.663 0-1.202-.29-1.63-.815-.041-.055-.91.36-.91 1.381 0 1.105 1.034 1.782 2.955 1.782 2.333 0 3.563-1.174 3.563-3.742V8.521c-.002-.856-.416-1.285-1.203-1.285zm9.3 2.017c-2.265 0-3.77 1.436-3.77 3.577 0 2.196 1.45 3.605 3.728 3.605 2.265 0 3.756-1.409 3.756-3.59.001-2.156-1.477-3.592-3.714-3.592zm-.028 5.15c-.884 0-1.491-.648-1.491-1.574 0-.91.622-1.56 1.491-1.56.87 0 1.491.65 1.491 1.574 0 .898-.634 1.56-1.49 1.56zm-5.656-5.082h-.277c-.676 0-1.187.318-1.187 1.285v4.419c0 .98.497 1.285 1.215 1.285h.277c.676 0 1.16-.332 1.16-1.285v-4.42c0-.993-.47-1.284-1.188-1.284zm-.152-3.203c-.856 0-1.395.484-1.395 1.243 0 .773.553 1.256 1.436 1.256.857 0 1.395-.483 1.395-1.256s-.552-1.243-1.436-1.243z"
                fill="#fff"
              ></path>
            </g>
            <defs>
              <clipPath id="ic_jio_dot_svg__clip0_5207_79934">
                <path fill="#fff" d="M0 0h24v24H0z"></path>
              </clipPath>
            </defs>
          </svg>
        );
      case "IcProfile":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 6a4 4 0 11-8 0 4 4 0 018 0zm4 10.5c0 3.038-3.582 5.5-8 5.5s-8-2.462-8-5.5S7.582 11 12 11s8 2.462 8 5.5z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcLike":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 11v7a2 2 0 002 2h2V9H5a2 2 0 00-2 2zm17.24-1A3 3 0 0018 9h-4V5.08a2 2 0 00-3.94-.57l-1 4A2.12 2.12 0 009 9v11h8.44a3 3 0 003-2.67l.55-5a2.999 2.999 0 00-.75-2.33z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcDislike":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.568 6.67l-.55 5A3 3 0 005.998 15h4v3.92a2 2 0 003.94.56l1-4c.04-.157.06-.318.06-.48V4h-8.45a3 3 0 00-2.98 2.67zM18.998 4h-2v11h2a2 2 0 002-2V6a2 2 0 00-2-2z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcChevronLeft":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 17a1.003 1.003 0 01-.71-.29l-4-4a1 1 0 010-1.42l4-4a1.005 1.005 0 011.42 1.42L11.41 12l3.3 3.29a.997.997 0 01.219 1.095.999.999 0 01-.93.615z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcChevronUp":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 15a.998.998 0 01-.71-.29L12 11.41l-3.29 3.3a1.004 1.004 0 01-1.42-1.42l4-4a.999.999 0 011.42 0l4 4A1.001 1.001 0 0116 15z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcChevronRight":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 17a1.002 1.002 0 01-1.006-1 1 1 0 01.296-.71l3.3-3.29-3.3-3.29a1.004 1.004 0 011.42-1.42l4 4a.997.997 0 01.219 1.095.999.999 0 01-.22.325l-4 4A1 1 0 0110 17z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcChevronDown":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15a1.002 1.002 0 01-.71-.29l-4-4a1.004 1.004 0 111.42-1.42l3.29 3.3 3.29-3.3a1.004 1.004 0 111.42 1.42l-4 4A1.001 1.001 0 0112 15z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcNews":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 2h-9a3 3 0 00-3 3v13a1 1 0 11-2 0V8H4a2 2 0 00-2 2v9a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3zm-3 15h-5a1 1 0 010-2h5a1 1 0 010 2zm2-5h-7a1 1 0 010-2h7a1 1 0 010 2zm0-5h-7a1 1 0 110-2h7a1 1 0 110 2z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcAlert":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.74 18l-8-14a2 2 0 00-3.48 0l-8 14A2 2 0 004 21h16a2 2 0 001.74-3zM11 7a1 1 0 012 0v6a1 1 0 11-2 0V7zm1 12a1.5 1.5 0 110-2.999 1.5 1.5 0 010 3z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcAnalytics":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 11h8a10 10 0 00-9-8.95v8a1 1 0 001 .95zm-3-1V2.05A10 10 0 1022 13h-8a3 3 0 01-3-3z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcGraphIncreasing":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 14h-2a1 1 0 00-1 1v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1zm6-2h-2a1 1 0 00-1 1v7a1 1 0 001 1h2a1 1 0 001-1v-7a1 1 0 00-1-1zM7 16H5a1 1 0 00-1 1v3a1 1 0 001 1h2a1 1 0 001-1v-3a1 1 0 00-1-1zM19 3h-3a1 1 0 100 2h.59l-3.86 3.86-2.41-.81a1 1 0 00-.94.17l-5 4A1 1 0 005 14a1 1 0 00.62-.22l4.58-3.66 2.48.83a1 1 0 001-.24L18 6.41V7a1 1 0 002 0V4a1 1 0 00-1-1z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcMoreVertical":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0-6.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcVisible":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.69 10.74A10.87 10.87 0 0012 5a10.87 10.87 0 00-9.69 5.74 2.74 2.74 0 000 2.52A10.87 10.87 0 0012 19a10.87 10.87 0 009.69-5.74 2.74 2.74 0 000-2.52zm-9.1 4.2a3 3 0 11-1.183-5.881 3 3 0 011.183 5.881z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcVisibleOff":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.69 10.74A10.539 10.539 0 0018.41 7l-3.7 3.69a3 3 0 01-4 4L20.49 5a1.052 1.052 0 00-.342-1.719A1.053 1.053 0 0019 3.51L3.51 19a1.052 1.052 0 001.148 1.718c.128-.053.244-.13.342-.228L7.42 18c1.439.652 3 .993 4.58 1a10.87 10.87 0 009.69-5.74 2.74 2.74 0 000-2.52zm-7.23-5.45A11 11 0 0012 5a10.87 10.87 0 00-9.69 5.74 2.74 2.74 0 000 2.52c.469.889 1.061 1.707 1.76 2.43l10.39-10.4z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcTrendingFlame":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.62 6.54C14 5.17 13 4.27 13 3a1 1 0 00-.62-.92 1 1 0 00-1.09.21c-.1.11-2.48 2.57-.18 7.16a1.53 1.53 0 01-.1 1.83 1.09 1.09 0 01-1.25.25c-.56-.28-1.07-1.32-.76-3.39a1 1 0 00-1.54-1A8.44 8.44 0 004 14a7.83 7.83 0 008 8 7.83 7.83 0 008-8c0-3.77-2.43-5.82-4.38-7.46z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcMinimize":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2a10 10 0 100 20 10 10 0 000-20zm4 11H8a1 1 0 010-2h8a1 1 0 010 2z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcFilter":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 11H7a1 1 0 000 2h10a1 1 0 000-2zm-3 6h-4a1 1 0 000 2h4a1 1 0 000-2zm6-12H4a1 1 0 000 2h16a1 1 0 100-2z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcSearch":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.004 2a7 7 0 015.6 11.19l6.11 6.1a1.002 1.002 0 01-.325 1.639.999.999 0 01-1.095-.219l-6.1-6.11A7 7 0 1110.004 2zm0 12a5 5 0 100-10 5 5 0 000 10z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcCloseRemove":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2a10 10 0 100 20 10 10 0 000-20zm3.71 12.29a1.002 1.002 0 01-.325 1.639 1 1 0 01-1.095-.219L12 13.41l-2.29 2.3a1 1 0 01-1.639-.325 1 1 0 01.219-1.095l2.3-2.29-2.3-2.29a1.004 1.004 0 011.42-1.42l2.29 2.3 2.29-2.3a1.004 1.004 0 011.42 1.42L13.41 12l2.3 2.29z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcTrash":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6h-2V5a3 3 0 00-3-3H9a3 3 0 00-3 3v1H4a1 1 0 000 2h1v11a3 3 0 003 3h8a3 3 0 003-3V8h1a1 1 0 100-2zM9 18a1 1 0 11-2 0v-7a1 1 0 112 0v7zm4 0a1 1 0 01-2 0v-7a1 1 0 012 0v7zm4 0a1 1 0 01-2 0v-7a1 1 0 012 0v7zM8 5a1 1 0 011-1h6a1 1 0 011 1v1H8V5z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcPause":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 13a1.5 1.5 0 11-3 0V9a1.5 1.5 0 013 0v6zm5 0a1.5 1.5 0 11-3 0V9a1.5 1.5 0 113 0v6z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcEdit":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.06 10.82l-.62.62A1.51 1.51 0 0010 12.5V14h1.5a1.51 1.51 0 001.06-.44l.62-.62 7.38-7.38a1.5 1.5 0 10-2.12-2.12l-7.38 7.38zM11.5 16H8v-3.5A3.49 3.49 0 019 10l7-7H6a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V8l-7 7a3.487 3.487 0 01-2.5 1z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcAdd":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 11h-7V4a1 1 0 00-2 0v7H4a1 1 0 000 2h7v7a1 1 0 002 0v-7h7a1 1 0 000-2z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcError":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2a10 10 0 100 20 10 10 0 000-20zm3.71 12.29a1.002 1.002 0 01-.325 1.639 1 1 0 01-1.095-.219L12 13.41l-2.29 2.3a1 1 0 01-1.639-.325 1 1 0 01.219-1.095l2.3-2.29-2.3-2.29a1.004 1.004 0 011.42-1.42l2.29 2.3 2.29-2.3a1.004 1.004 0 011.42 1.42L13.41 12l2.3 2.29z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcCompoundInterest":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 19H5v-1.91h1.18c7 0 10.16-4.08 12.68-9.39l.19.58A1 1 0 0020 9c.106.014.214.014.32 0A1 1 0 0021 7.68l-1-3a1 1 0 00-1.27-.63l-3 1A1.019 1.019 0 1016.32 7l.84-.28C14.68 12 11.86 15.53 5 15.07V4a1 1 0 00-2 0v16a1 1 0 001 1h16a1 1 0 000-2z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcAnalyticsPieChartTwo":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.72 5.66l-3.57 3.57a5 5 0 11-8.35 0L4.23 5.66a10 10 0 1015.49 0zm-5 2.16l3.58-3.57a10 10 0 00-12.65 0l3.57 3.57a5 5 0 015.51 0h-.01z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcGraphIncreasing":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 14h-2a1 1 0 00-1 1v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1zm6-2h-2a1 1 0 00-1 1v7a1 1 0 001 1h2a1 1 0 001-1v-7a1 1 0 00-1-1zM7 16H5a1 1 0 00-1 1v3a1 1 0 001 1h2a1 1 0 001-1v-3a1 1 0 00-1-1zM19 3h-3a1 1 0 100 2h.59l-3.86 3.86-2.41-.81a1 1 0 00-.94.17l-5 4A1 1 0 005 14a1 1 0 00.62-.22l4.58-3.66 2.48.83a1 1 0 001-.24L18 6.41V7a1 1 0 002 0V4a1 1 0 00-1-1z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcInterestLow":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 16.008a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-2 0v.59l-3.29-3.3a1.002 1.002 0 00-1.42 0L12 12.588l-7.21-9.2a.7.7 0 00-.16-.13.49.49 0 00-.15-.1.85.85 0 00-.17-.06H4l-.12-.09a.65.65 0 00-.2 0 .66.66 0 00-.19.09h-.11a.7.7 0 00-.13.16.49.49 0 00-.1.15.85.85 0 00-.06.17 1.42 1.42 0 000 .2l-.09.23v16a1 1 0 001 1h16a1 1 0 100-2H5V6.898l6.13 7.81a1 1 0 00.73.38 1 1 0 00.77-.29l2.37-2.38 2.59 2.59H17a1 1 0 00-1 1z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcDistribution":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 10a2 2 0 10-2-2 1.37 1.37 0 000 .19l-3.3 2.35a2.999 2.999 0 00-.72-.36V5.72A2 2 0 0014 4a2 2 0 10-4 0 2 2 0 001 1.72v4.46A3 3 0 009.18 12H6.72A2 2 0 005 11a2 2 0 100 4 2 2 0 001.72-1h2.46a3.1 3.1 0 001.08 1.44l-.75 2.63A2 2 0 1012 20a2 2 0 00-.56-1.39l.75-2.61a2.88 2.88 0 001.33-.41L16 17.66V18a2 2 0 102-2 1.909 1.909 0 00-.68.13L14.81 14c.115-.321.18-.659.19-1a2.76 2.76 0 00-.13-.82l3.31-2.36A2 2 0 0019 10z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcGraphTable":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 17a1 1 0 001-1V6a1 1 0 00-2 0v10a1 1 0 001 1zm-4 0a1 1 0 001-1v-6a1 1 0 00-2 0v6a1 1 0 001 1zm-4 0a1 1 0 001-1v-4a1 1 0 10-2 0v4a1 1 0 001 1zm12-6a1 1 0 00-1 1v4a1 1 0 002 0v-4a1 1 0 00-1-1zm0 8H5V4a1 1 0 00-2 0v16a1 1 0 001 1h16a1 1 0 000-2z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcForms":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.77 3H6.23A3.12 3.12 0 003 6v12a3.12 3.12 0 003.23 3h7.54A3.12 3.12 0 0017 18V6a3.12 3.12 0 00-3.23-3zM7 6h2.5a1 1 0 110 2H7a1 1 0 010-2zm6 12H7a1 1 0 010-2h6a1 1 0 110 2zm0-5H7a1 1 0 010-2h6a1 1 0 110 2zm5.66-9c.284.628.427 1.31.42 2v12a4.749 4.749 0 01-.42 2A2.71 2.71 0 0021 17.28V6.72A2.71 2.71 0 0018.66 4z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcCalendar":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 3h-1a1 1 0 00-2 0H9a1 1 0 00-2 0H6a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3zm-4.5 14a1 1 0 01-2 0v-3.59l-.29.3a1.004 1.004 0 11-1.42-1.42l2-2a.999.999 0 011.09-.21 1 1 0 01.62.92v6zM19 7H5V6a1 1 0 011-1h1a1 1 0 002 0h6a1 1 0 002 0h1a1 1 0 011 1v1z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcCalendarWeek":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.12 3.88A3 3 0 0018 3h-1a1 1 0 00-2 0H9a1 1 0 00-2 0H6a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-.88-2.12zM8 17a1 1 0 110-2 1 1 0 010 2zm0-4a1 1 0 110-2 1 1 0 010 2zm4 4a1 1 0 110-2 1 1 0 010 2zm0-4a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2zm3-6H5V6a1 1 0 011-1h1a1 1 0 002 0h6a1 1 0 002 0h1a1 1 0 011 1v1z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcInfo":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm2 12h-4a1 1 0 010-2h1v-3h-1a1 1 0 010-2h2a1 1 0 011 1v4h1a1 1 0 010 2z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcUpload":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 9h-1a1 1 0 100 2h1a1 1 0 011 1v7a1 1 0 01-1 1H7a1 1 0 01-1-1v-7a1 1 0 011-1h1a1 1 0 100-2H7a3 3 0 00-3 3v7a3 3 0 003 3h10a3 3 0 003-3v-7a3 3 0 00-3-3zM9.71 6.71L11 5.41V16a1 1 0 102 0V5.41l1.29 1.3a1 1 0 001.639-.325 1 1 0 00-.219-1.095l-3-3a1 1 0 00-1.42 0l-3 3a1.004 1.004 0 001.42 1.42z"
              fill="currentColor"
            ></path>
          </svg>
        );
      case "IcMinus":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
          </svg>
        );
    }
  };

  return <>{renderIcons()}</>;
}
