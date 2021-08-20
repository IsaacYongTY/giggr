import jwt from 'jsonwebtoken';
import { destroyCookie } from 'nookies';

const decodeToken = (tokenString: string) =>
    jwt.verify(tokenString, process.env.NEXT_PUBLIC_SECRET || '');

export default function withAuth(WrappedComponent: any) {
    return async (context: any) => {
        const token: string = context.req.cookies['x-auth-token'];
        console.log(token);
        if (!token || !token.includes('Bearer')) {
            console.log('You are not logged in');

            destroyCookie(undefined, 'x-auth-token');

            return {
                redirect: {
                    permanent: false,
                    destination: '/accounts/login',
                },
                props: {},
            };
        }

        const tokenString: string = token.split(' ')[1];

        const decoded: any = decodeToken(tokenString);
        context.req.user = { ...decoded.user, tokenString };

        return WrappedComponent(context);
    };
}
