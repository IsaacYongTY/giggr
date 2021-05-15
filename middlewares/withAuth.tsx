import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import cookies from "next-cookies";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

interface JwtDecoded {
    user: {
        firstName: string,
        id: number,
    },
    iat: number,
    exp: number
}

const decodeToken = (tokenString : string) => jwt.verify(tokenString, process.env.NEXT_PUBLIC_SECRET || '')


export default function withAuth(WrappedComponent: any) {



    return async (context: any) => {

        let token : string = context.req.cookies["x-auth-token"]

        if(!token) {
            console.log("You are not logged in")

            return {
                redirect: {
                    permanent: false,
                    destination: 'accounts/login'
                },
                props: {}
            }
        }

        console.log(token)
        const tokenString : string = token.split(' ')[1]

        const decoded : any = decodeToken(tokenString)

        console.log(decoded)
        context.req.user = {...decoded.user, tokenString}

        return await WrappedComponent(context)

    }

}

