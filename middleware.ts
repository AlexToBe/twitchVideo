
// import {
//   clerkMiddleware,
//   createRouteMatcher
// } from '@clerk/nextjs/server';

// const isProtectedRoute = createRouteMatcher([
//   '/','/api/webhooks(.*)'
// ]);

// export default clerkMiddleware((auth, req) => {
//   if (isProtectedRoute(req)) auth().protect();
// });

import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes:['/','/api/webhooks(.*)','/api/uploadthing','/:username','/search']
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
};