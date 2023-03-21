import styles from "./loader.module.scss"
import loaderImg from "../../assets/loader.png"
import ReactDOM from "react-dom"

export const Loader = () => {
    return ReactDOM.createPortal (
        <div className={styles.wrapper}>
            <div className={styles.loader}>
                <img
                    src={loaderImg}
                    alt="loader-img"
                />
            </div>
        </div>,
        document.getElementById("loader")
    )
}