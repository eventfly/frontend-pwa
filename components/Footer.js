import styles from '../styles/Footer.css'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../images/LOGO.svg'


const Footer = () => {
    return ( 
        <>
            <footer
                className={"text-white " + styles.footer_box}
            >

                <div className={styles.logo_style}>
                    <Link href="/">
                        <a className={"navbar-brand logo"}>
                            <Image
                                src={logo}
                                width='100px'
                                height='100px'
                            />                    
                        </a>
                    </Link>
                </div>

                <div className="container">
                    <div className={styles.footer_flexbox}>

                        <div className={styles.footer_column}>

                            <h6 className="text-uppercase fw-bold">About us</h6>
                            <p>
                            Here you can use rows and columns to organize your footer
                            content. Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit.
                            </p>

                        </div>


                        <div className={styles.footer_column}>

                            <div className={styles.useful_links }>

                            <h6 className="text-uppercase fw-bold">Useful links</h6>

                            <p>
                                <Link href="/"><a className={styles.footer_link}>Home</a></Link>
                            </p>

                            <p>
                                <Link href="/"><a className={styles.footer_link}>Events</a></Link>
                            </p>

                            <p>
                                <Link href="/"><a className={styles.footer_link}>News</a></Link>
                            </p>

                            <p>
                                <Link href="/"><a className={styles.footer_link}>Contact</a></Link>
                            </p>
                            </div>

                        </div>


                        <div className={styles.footer_column}>

                            <h6 className="text-uppercase fw-bold">About us</h6>
                            
                            <p>
                            Here you can use rows and columns to organize your footer
                            content. Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit.
                            </p>

                        </div>

                    </div>

                </div>

                <div className={"container"}>

                    <div className={styles.media_title}>
                            <h6 className={"text-uppercase fw-bold"}>Follow us</h6>
                    </div>

                </div>

                <div className={"container"}>
                    <div className={styles.media_section}>

                    <Link href="/">
                        <a className={styles.media_icon}>
                            <i className="fab fa-facebook-f"></i>
                        </a>
                    </Link>

                    <Link href="/">
                        <a className={styles.media_icon}>
                            <i className="fab fa-twitter"></i>
                        </a>
                    </Link>

                    <Link href="/">
                        <a className={styles.media_icon}>
                            <i className="fab fa-google"></i>
                        </a>
                    </Link>

                    <Link href="/">
                        <a className={styles.media_icon}>
                            <i className="fab fa-instagram"></i>
                        </a>
                    </Link>

                    <Link href="/">
                        <a className={styles.media_icon}>
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </Link>

                    <Link href="/">
                        <a className={styles.media_icon}>
                            <i className="fab fa-github"></i>
                        </a>
                    </Link>

                    </div>
                </div>


                <div className={"text-center p-3 " + styles.copyright}>
                    © Copyright 2022&nbsp;&nbsp;

                    <Link href="/"><a className={styles.copyright_text}>BUET CSE FEST</a></Link>

                    {/* <a className="text-white" href="https://mdbootstrap.com/">BUET CSE FEST</a> */}
                
                </div>

            </footer>

     
        
        </> 
    );
}
 
export default Footer;