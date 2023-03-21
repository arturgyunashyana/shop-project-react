import { useState } from "react"
import styles from "../auth.module.scss"
import LoginImg from "../../../assets/login-img.png"
import { Link, useNavigate } from "react-router-dom"
import { FaGoogle } from "react-icons/fa"
import { Card } from "../../../components/Card"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase/config"
import { toast } from "react-toastify"
import { Loader } from "../../../components/Loader"
import { GoogleAuthProvider } from "firebase/auth";

export const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const loginUser = (e) => {
        e.preventDefault()
        console.log(email, password);
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setIsLoading(false)
                toast.success("Login Successfull...")
                navigate("/")
            })
            .catch((error) => {
                setIsLoading(false)
                toast.error(error.message)
            });
    }

    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                toast.success("Login Successfully...")
                navigate("/")
            }).catch((error) => {
                toast.error(error.message)
            });
    }

    return (
        <>
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <div className={styles.field}>
                    <div className={styles.img}>
                        <img
                            src={LoginImg}
                            alt="login-img"
                        />
                    </div>
                    <Card>
                        <div className={styles.form}>
                            <h2>Login</h2>

                            <form onSubmit={loginUser}>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className={styles.btn}
                                >
                                    Login
                                </button>
                                <div className={styles.links}>
                                    <Link to="/reset">
                                        Reset Password
                                    </Link>
                                </div>
                                <p>-- or --</p>
                            </form>
                            <button
                                className={styles.btn__orange}
                                onClick={signInWithGoogle}
                            >
                                <FaGoogle /> Login With Google
                            </button>
                            <div className={styles.register}>
                                <p>Don't have an account</p>
                                <Link to="/register">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </section >
        </>
    )
}