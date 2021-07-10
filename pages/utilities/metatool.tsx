import React, {useState, useRef, useEffect} from "react"
import Layout from "../../components/layouts/Layout";
import SpotifySearchBar from "../../components/common/SpotifySearchBar";
import styles from "../../assets/scss/pages/_metatool.module.scss";
import AlertBox from "../../components/common/AlertBox";
import withAuth from "../../middlewares/withAuth";
import MetadataBody from "../../components/MetadataBody";



export const getServerSideProps = withAuth(async ({req, res} : any) => {

    return {
        props: {
            user: req.user
        }
    }
})

export interface Props {
    user: {
        tierId: number,
        name: string,
        tokenString: string,
        isAdmin: boolean
    }
}

export default function MetaTool({ user } : Props) {


    const [formValue, setFormValue] = useState<any>({})


    const [alertMessage, setAlertMessage] = useState("")
    const [alertType, setAlertType] = useState("")
    const [isContribute, setIsContribute] = useState(user.isAdmin)



    return (
        <Layout user={user}>
            <div className={styles.container}>
                <div className={styles.searchBarContainer}>

                <SpotifySearchBar
                    setFormValue={setFormValue}
                    isContribute={isContribute}
                    user={user}
                    database="master"
                />
                </div>

                <MetadataBody
                    formValue={formValue}
                    setFormValue={setFormValue}
                    setAlertMessage={setAlertMessage}
                    setAlertType={setAlertType}
                />





                {
                    user.isAdmin &&
                    <div className={styles.checkboxRowContainer}>
                        <input
                            type="checkbox"
                            id="contributeCheckbox"
                            defaultChecked={isContribute}
                            onChange={() => setIsContribute(prevState => !prevState)}
                        />
                        <label htmlFor="contributeCheckbox">Contribute to Database?</label>
                    </div>
                }

                {
                    alertMessage &&
                    <AlertBox alertMessage={alertMessage} setAlertMessage={setAlertMessage} type={alertType}/>
                }


            </div>
        </Layout>
    )
}
