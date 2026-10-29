"""Oferta va maxfiylik siyosati sahifalarini yig'adi: legal/*.md -> ../oferta.html, ../privacy.html
Matnni o'zgartirish uchun faqat .md fayllarni tahrirlang va shu skriptni ishga tushiring."""
import html, re, pathlib
HERE = pathlib.Path(__file__).parent
SHELL = """<!doctype html>
<html lang="uz"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title} — TadrisAI</title>
<link rel="icon" href="favicon.svg">
<style>
:root{{--bg:#F8FAFC;--card:#FFFFFF;--text:#0F172A;--muted:#64748B;--line:#E2E8F0;--accent:#5D45F5}}
@media (prefers-color-scheme:dark){{:root{{--bg:#0F172A;--card:#111C34;--text:#E2E8F0;--muted:#94A3B8;--line:#1E2A47;--accent:#A78BFA}}}}
*{{box-sizing:border-box}}
body{{margin:0;background:var(--bg);color:var(--text);font:16px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}}
main{{max-width:760px;margin:0 auto;padding:28px 16px 60px}}
.brand{{font-weight:800;letter-spacing:-.02em;color:var(--accent);font-size:15px}}
h1{{font-size:26px;line-height:1.25;margin:6px 0 4px}}
.meta{{color:var(--muted);font-size:14px;margin-bottom:22px}}
section{{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px 18px;margin:12px 0}}
h2{{font-size:18px;margin:0 0 8px}}
p{{margin:6px 0}}
ul{{margin:6px 0;padding-left:20px}}
li{{margin:3px 0}}
.fill{{background:rgba(250,204,21,.25);border-radius:4px;padding:0 4px}}
.sign{{margin-top:26px;font-weight:600}}
a{{color:var(--accent)}}
</style></head><body><main>
<div class="brand">TadrisAI</div>
<h1>{title}</h1>
<div class="meta">{meta}</div>
{body}
<p class="sign">Hurmat bilan,<br>TadrisAI jamoasi</p>
</main></body></html>
"""

def inline(t):
    t = html.escape(t)
    t = re.sub(r"\[\[(.+?)\]\]", r'<span class="fill">\1</span>', t)          # [[to'ldiriladi]]
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    t = re.sub(r"\((https?://[^)\s]+|[\w.-]+\.html)\)\{(.+?)\}", r'<a href="\1">\2</a>', t)  # (url){matn}
    return t

def render(md):
    lines = md.strip().splitlines()
    title = lines[0].lstrip("# ").strip()
    meta = lines[1].strip()
    out, sec, lst = [], False, False
    for ln in lines[2:]:
        s = ln.strip()
        if not s:
            continue
        if s.startswith("## "):
            if lst: out.append("</ul>"); lst = False
            if sec: out.append("</section>")
            out.append(f"<section><h2>{inline(s[3:])}</h2>"); sec = True
        elif s.startswith("- "):
            if not lst: out.append("<ul>"); lst = True
            out.append(f"<li>{inline(s[2:])}</li>")
        else:
            if lst: out.append("</ul>"); lst = False
            out.append(f"<p>{inline(s)}</p>")
    if lst: out.append("</ul>")
    if sec: out.append("</section>")
    return SHELL.format(title=html.escape(title), meta=inline(meta), body="\n".join(out))

for name in ("oferta", "privacy"):
    md = (HERE / f"{name}.md").read_text(encoding="utf-8")
    (HERE.parent / f"{name}.html").write_text(render(md), encoding="utf-8")
    print("tayyor:", name)
