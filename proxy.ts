import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
    function proxy(request) {
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        }
    }
);

export const config = {
    matcher: ['/dashboard']
}