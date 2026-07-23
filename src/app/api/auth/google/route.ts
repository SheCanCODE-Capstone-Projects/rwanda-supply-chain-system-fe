import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null) as Record<string, unknown> | null;
  const intent = String(body?.intent ?? "login");
  const role = body?.role ? String(body.role) : undefined;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json({
      ok: false,
      error: "Google OAuth is not configured yet. Add GOOGLE_CLIENT_ID and GOOGLE_REDIRECT_URI on the backend to enable this provider.",
    }, { status: 501 });
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state: JSON.stringify({ intent, role }),
  });
  return NextResponse.json({ ok: true, authUrl: `https://accounts.google.com/o/oauth2/v2/auth?${params}` });
}
