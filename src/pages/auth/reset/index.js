import { Link } from "react-router-dom"
import { Card } from "../../../components/Card"
import styles from "../auth.module.scss"
import resetImg from "../../../assets/resetImg.png"
import { useState } from "react"
import { sendPasswordResetEmail } from "firebase/auth"
import { toast } from "react-toastify"
import { auth } from "../../../firebase/config"
import { Loader } from "../../../components/Loader"

export const Reset = () => {

    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const resetPassword = (e) => {
        e.preventDefault();
        setIsLoading(true)
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsLoading(false)
                toast.success("Check your email for a reset link")
            })
            .catch((error) => {
                setIsLoading(false)
                toast.error(error.message)
            });
    }

    return (
        <>
            {isLoading && <Loader />}
            {/* {<Loader />} */}
            <section className={`container ${styles.auth}`}>
                <div className={styles.field}>
                    <div className={styles.img}>
                        <img
                            src={resetImg}
                            alt="Reset Password"
                        />
                    </div>
                    <Card>
                        <div className={styles.form}>
                            <h2>Reset Password</h2>

                            <form onSubmit={resetPassword}>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className={styles.btn}
                                >
                                    Reset Password
                                </button>
                                <div className={styles.links__reset}>
                                    <p>
                                        <Link to="/login">
                                            - Login
                                        </Link>
                                    </p>
                                    <p>
                                        <Link to="/register">
                                            - Register
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            </section>
        </>
    )
}