import { NextResponse } from "next/server";
import { getOAuthClient } from "@/lib/google";

export const runtime = "nodejs";

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[ch] as string));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const errorParam = searchParams.get("error");

  if (errorParam) {
    return new NextResponse(
      `<pre style="font-family:monospace;padding:24px;background:#0a0a0a;color:#ff3d71">OAuth error: ${escapeHtml(errorParam)}</pre>`,
      { status: 400, headers: { "Content-Type": "text/html" } },
    );
  }

  if (!code) {
    return NextResponse.json({ error: "Missing code parameter" }, { status: 400 });
  }

  try {
    const oauth = getOAuthClient();
    const { tokens } = await oauth.getToken(code);

    if (!tokens.refresh_token) {
      return new NextResponse(
        `<!doctype html><html><body style="font-family:monospace;padding:24px;background:#0a0a0a;color:#ffaa00;line-height:1.6">
          <h2>No refresh_token returned</h2>
          <p>Google only returns a refresh_token on FIRST authorization. To force a new one:</p>
          <ol>
            <li>Go to <a href="https://myaccount.google.com/permissions" style="color:#00c1f4">Google Account → Security → Third-party apps</a></li>
            <li>Remove <b>Nodo Booking</b> (revoke access)</li>
            <li>Visit <a href="/api/google/auth" style="color:#00c1f4">/api/google/auth</a> again</li>
          </ol>
          <p>Raw response:</p>
          <pre>${escapeHtml(JSON.stringify(tokens, null, 2))}</pre>
        </body></html>`,
        { status: 200, headers: { "Content-Type": "text/html" } },
      );
    }

    const refreshToken = tokens.refresh_token;

    return new NextResponse(
      `<!doctype html><html><body style="font-family:'JetBrains Mono',monospace;padding:40px;background:#0a0a0a;color:#ffffff;line-height:1.6">
        <h1 style="background:linear-gradient(135deg,#8b2fef,#00c1f4);-webkit-background-clip:text;background-clip:text;color:transparent">Authorization successful</h1>
        <p style="color:#b0b0cc">Copy the refresh_token below and paste it into <code style="color:#00c1f4">.env.local</code> as <code style="color:#00c1f4">GOOGLE_REFRESH_TOKEN=</code> — then restart the dev server.</p>
        <div style="margin:24px 0;padding:20px;border:1px solid rgba(255,255,255,0.06);border-radius:8px;background:rgba(26,26,46,0.6);word-break:break-all">
          <div style="color:#8888aa;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:12px">REFRESH_TOKEN</div>
          <code style="color:#00c1f4;font-size:14px">${escapeHtml(refreshToken)}</code>
        </div>
        <details style="margin-top:24px;color:#8888aa">
          <summary style="cursor:pointer">Full token response (debug)</summary>
          <pre style="margin-top:12px;font-size:11px">${escapeHtml(JSON.stringify(tokens, null, 2))}</pre>
        </details>
      </body></html>`,
      { status: 200, headers: { "Content-Type": "text/html" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new NextResponse(
      `<pre style="font-family:monospace;padding:24px;background:#0a0a0a;color:#ff3d71">Token exchange failed: ${escapeHtml(message)}</pre>`,
      { status: 500, headers: { "Content-Type": "text/html" } },
    );
  }
}
