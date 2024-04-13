type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
    logo: (props: IconProps) => (
        <svg width="518" height="88" viewBox="0 0 518 88" fill="none" xmlns="http://www.w3.org/2000/svg"  {...props}>
            <path d="M30.72 86L4.47035e-08 0.799995H18.84L41.52 65.48L64.08 0.799995H83.04L52.08 86H30.72ZM114.939 87.44C95.2594 87.44 82.5394 74.12 82.5394 53.84C82.5394 33.56 95.2594 20.24 114.819 20.24C133.899 20.24 146.259 33.44 146.259 55.04V58.64H101.139C101.499 68.84 106.899 73.76 115.299 73.76C121.299 73.76 125.499 71.24 127.299 65.96L145.419 67.04C141.939 79.88 130.419 87.44 114.939 87.44ZM127.899 47.6C127.419 38.24 122.259 33.56 114.819 33.56C107.259 33.56 102.099 38.72 101.139 47.6H127.899ZM175.118 86C164.678 86 158.318 81.08 158.318 69.2V0.799995H176.318V67.28C176.318 71.12 178.118 72.56 181.478 72.56H185.798V86H175.118ZM226.156 87.44C206.476 87.44 193.516 74.24 193.516 53.84C193.516 33.56 206.476 20.24 226.156 20.24C245.836 20.24 258.796 33.56 258.796 53.84C258.796 74.24 245.836 87.44 226.156 87.44ZM226.156 73.64C235.156 73.64 240.196 66.32 240.196 53.84C240.196 41.36 235.156 34.04 226.156 34.04C217.156 34.04 211.996 41.36 211.996 53.84C211.996 66.32 217.156 73.64 226.156 73.64ZM270.841 86V0.799995H295.201L316.921 62.84L338.521 0.799995H362.881V86H344.641V30.8L324.601 85.76H309.001L289.081 30.8V86H270.841ZM399.006 87.44C385.566 87.44 376.446 80.96 376.446 69.92C376.446 58.64 383.526 52.88 397.566 50L418.326 45.92C418.326 37.52 414.486 33.32 407.286 33.32C400.566 33.32 396.726 36.56 395.526 42.56L377.526 41.72C379.926 27.56 390.606 20.24 407.286 20.24C426.486 20.24 436.326 29.6 436.326 47.12V69.08C436.326 72.68 437.526 73.64 439.926 73.64H441.726V86C440.526 86.36 437.766 86.72 435.246 86.72C428.646 86.72 422.766 84.44 421.206 76.28C417.846 83.12 409.926 87.44 399.006 87.44ZM403.326 75.08C412.326 75.08 418.326 69.56 418.326 60.32V57.2L403.686 60.32C397.806 61.52 394.926 64.04 394.926 68.24C394.926 72.56 397.806 75.08 403.326 75.08ZM450.645 86L473.565 53.36L451.365 21.68H470.445L484.125 42.32L497.565 21.68H517.005L494.805 53.48L517.725 86H498.525L484.485 64.16L470.205 86H450.645Z" fill="#505050" />
        </svg>
    ),
    sun: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>

    ),
    moon: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>

    ),
    cart: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>

    ),
    profil: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>

    ),
    squares: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        </svg>
    ),
    check: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
    ),
    questionMarkCircle: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
    ),
    menubar: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
    ),
    spinner: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    ),


}