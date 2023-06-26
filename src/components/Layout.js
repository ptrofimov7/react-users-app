import { Outlet } from 'react-router-dom';
import Header from './Header';
import styles from './Layout.module.css'

const Layout = () => {
    return (
        <div className={styles.container} >
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout