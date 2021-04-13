import { useRouter } from "next/router";
import cookies from "next-cookies";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const getServerSideProps : GetServerSideProps = async (context : GetServerSidePropsContext) => {
    console.log(cookies(context))
    console.log('in')
    return {
        props: { cookies: cookies(context), text: 'testing' }
    }
}

function withProtect(handler: any) {



    let token;
    console.log('running')

    return handler

}

export default withProtect