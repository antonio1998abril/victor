import React from 'react'
import Image from 'next/image'

function Footer() {
    return (
           <footer className="footer">
                    <a
                    href="https://github.com/antonio1998abril"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Hecho por CUCEI  &nbsp;{' '}
                    <span  className="logo">
                        <Image src="/logo2.png" alt="Vercel Logo" width={20} height={20} />
                    </span>
                    </a>
            </footer> 


        
    )
}

export default Footer
