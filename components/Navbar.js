import Image from 'next/image'
import Link from 'next/link'
import logo from '../images/LOGO.svg'
import styles from '../styles/Home.module.css'


// const Navbar = () => {
//     return ( 
//         <nav className={styles.navbar}>
//             <div className={styles.logo}>
//                 <Image 
//                      src={logo}
//                      width='75px'
//                     height='75px'
//                 />
//              </div>

//              <Link href="/"><a>Home</a></Link>
//              <Link href="/events/"><a>Events</a></Link>
//              <Link href="/news"><a>News</a></Link>
//              <Link href="/about"><a>About</a></Link> 
//         </nav>
//     );
// }
 
// export default Navbar;


const Navbar = () => {
    return ( 
        <header className={'header navbar fixed-top navbar-expand-md ' + styles.nav_style}>
            <div className='container'>

                <Link href="/">
                <a className="navbar-brand logo">
                    <Image
                        className='logo' 
                        src={logo}
                        width='65px'
                        height='65px'
                    />                    
                </a>
                </Link>

                <div className="collapse navbar-collapse flex-sm-row-reverse" id="headernav">
                    <ul className=" nav navbar-nav menu">
                        <li className="nav-item">
                            <Link href="/"><a className={'nav-link ' + styles.nav_item_style}>Home</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/events/"><a className={'nav-link ' + styles.nav_item_style}>Events</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/news"><a className={'nav-link ' + styles.nav_item_style}>News</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/about"><a className={'nav-link ' + styles.nav_item_style}>Contact</a></Link>
                        </li>
                    </ul>
                </div>            
            
            </div>    

        </header>
    );
}
 
export default Navbar;