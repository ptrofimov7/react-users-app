import { Link } from "react-router-dom"
import styles from './Header.module.css'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}><Link to="/">App Logo</Link></div>
            <nav className={styles.nav}>
                <ul>
                    <li><Link to="user">Users</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header