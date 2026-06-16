import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/diagnosis(.*)",
  "/ranking",
  "/api/health",
]);

function isClerkConfigured() {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  return (
    (key.startsWith("pk_test_") || key.startsWith("pk_live_")) &&
    key.length >= 40 &&
    /^[\x20-\x7E]+$/.test(key)
  );
}

// Clerk 未設定時はすべてのリクエストをそのまま通す
function bypassMiddleware(_request: NextRequest) {
  return NextResponse.next();
}

export default isClerkConfigured()
  ? clerkMiddleware(async (auth, request: NextRequest) => {
      if (!isPublicRoute(request)) {
        await auth.protect();
      }
      return NextResponse.next();
    })
  : bypassMiddleware;

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
