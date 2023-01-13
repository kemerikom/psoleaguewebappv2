import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next"
import { NextApiHandler, GetServerSidePropsContext, GetServerSidePropsResult } from "next"


const cookieOption= {
    cookieName:process.env.ironCookie,
    password:process.env.ironPassword,
    cookieOptions:{
        secure:process.env.NODE_ENV==='production'
    }
}


export function withSessionRouter(handler: NextApiHandler) {
    return withIronSessionApiRoute(handler,cookieOption)
}


export function withSessionSsr< P extends { [key: string]:unknown} = { [key: string]: unknown }>(
    handler: (context: GetServerSidePropsContext,) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
    return withIronSessionSsr(handler, cookieOption)
}