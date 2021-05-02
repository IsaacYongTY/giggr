import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import cookies from "next-cookies";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

// export const getServerSideProps : GetServerSideProps = async (context : GetServerSidePropsContext) => {
//     console.log(cookies(context))
//     console.log('in')
//     return {
//         props: { cookies: cookies(context), text: 'testing' }
//     }
// }
const getUserToken = (tokenString : string) => {
    const token : string = tokenString.split(' ')[1]
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET || '')

    console.log("in HOC")
    console.log(decoded)

    return decoded
}

function withAuth(WrappedComponent: any) {
    return async (context: any) => {
        console.log(context.req.cookies["x-auth-token"])
        const token : string = context.req.cookies["x-auth-token"].split(' ')[1]
        const secret : string = process.env.NEXT_PUBLIC_SECRET || ''


        console.log('with Auth')
        if(!token) {

        }

        interface JwtDecoded {
            user: {
                firstName: string,
                id: number,
            },
            iat: number,
            exp: number
        }
        const decoded : any = jwt.verify(token, secret)

        console.log(decoded)
        context.req.user = {...decoded.user, token}
        return await WrappedComponent(context)

    }




}

export default withAuth