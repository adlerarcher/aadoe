#!/usr/bin/env python3
"""Write the hackathons site nested at /gpic/."""
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TODAY = date(2026, 9, 11)
CSS = Path(__file__).with_name("gpic.css").read_text()
MAIL = "hackathons@thermalunderground.org"
FOOTER = "Thermal Underground. Hackathons with CEQ PIC and PNNL."

EVENTS = [
    {
        "date": date(2026, 10, 15),
        "kind": "Briefing",
        "title": "Problem statements briefing",
        "where": "Virtual",
        "mode": "Virtual",
        "time": "12:00-1:00 PM ET",
        "host": "CEQ PIC and PNNL",
        "photo": "documents.jpg",
        "blurb": "Published statements for the Denver sprint. Tracks, data access, and how teams register.",
    },
    {
        "date": date(2027, 2, 3),
        "end": date(2027, 2, 4),
        "kind": "Hackathon",
        "title": "Denver permitting hackathon",
        "where": "Denver, CO · hybrid",
        "mode": "Hybrid",
        "time": "Two days · 9:00 AM MT start",
        "host": "CEQ PIC and PNNL",
        "photo": "workshop.jpg",
        "featured": True,
        "blurb": "First sprint. Teams work published statements on authorization records, coordination sequences, and field tools.",
    },
    {
        "date": date(2027, 5, 5),
        "end": date(2027, 5, 6),
        "kind": "Hackathon",
        "title": "Second permitting hackathon",
        "where": "Hybrid · site posted with the statements",
        "mode": "Hybrid",
        "time": "Two days · 9:00 AM local",
        "host": "CEQ PIC and PNNL",
        "photo": "field.jpg",
        "blurb": "Second sprint. New statements from the coordination backlog. Selected demos enter the queue.",
    },
    {
        "date": date(2027, 8, 4),
        "end": date(2027, 8, 5),
        "kind": "Hackathon",
        "title": "State co-hosted hackathon",
        "where": "Co-hosted with a partner state",
        "mode": "Hybrid",
        "time": "Two days · 9:00 AM local",
        "host": "Partner state · CEQ PIC · PNNL",
        "photo": "gathering.jpg",
        "featured": True,
        "blurb": "Third sprint. A state agency co-hosts. Teams work a live permitting problem from that jurisdiction.",
    },
]

TRACKS = [
    {
        "id": "records",
        "kicker": "Track 01",
        "title": "Authorization records",
        "lede": "Make federal and state authorization records usable in one place.",
        "body": "A lease serial, a well, a water right, a consultation: each lives in its home agency. Teams map those systems and show a path to a shared index.",
        "photo": "documents.jpg",
    },
    {
        "id": "sequences",
        "kicker": "Track 02",
        "title": "Coordination sequences",
        "lede": "For a specified project: the reviews, the responsible agency, the dependencies, and the duration of the sequence.",
        "body": "Built on the records track. Teams take one geothermal project and make the review order visible to applicants and reviewers.",
        "photo": "maps.jpg",
    },
    {
        "id": "field",
        "kicker": "Track 03",
        "title": "Field tools",
        "lede": "Carry findings into the work people already do.",
        "body": "Handbooks, checklists, and session materials that use the records and sequences. Lab methods and field practice in the same packet.",
        "photo": "field.jpg",
    },
]

PARTNERS = [
    {
        "kicker": "CEQ PIC",
        "title": "Permitting Innovation Center",
        "lede": "Council on Environmental Quality Permitting Innovation Center.",
        "body": "Sets problem statements and judging. Ties each sprint to a live permitting backlog.",
        "photo": "workshop.jpg",
    },
    {
        "kicker": "PNNL",
        "title": "Pacific Northwest National Laboratory",
        "lede": "Technical host for data access, lab methods, and sprint infrastructure.",
        "body": "Teams work published data arrangements. Selected outputs move into the coordination queue with the lab.",
        "photo": "basin.jpg",
    },
]


def event_slug(ev):
    raw = f'{ev["date"].isoformat()}-{ev["title"]}'
    return "".join(c.lower() if c.isalnum() else "-" for c in raw).strip("-")[:56]


def fmt_range(ev):
    start = ev["date"]
    end = ev.get("end")
    if not end or end == start:
        return start.strftime("%-d %B %Y")
    if start.month == end.month:
        return f"{start.day}-{end.strftime('%-d %B %Y')}"
    if start.year == end.year:
        return f"{start.strftime('%-d %B')} to {end.strftime('%-d %B %Y')}"
    return f"{start.strftime('%-d %B %Y')} to {end.strftime('%-d %B %Y')}"


def weekday_line(ev):
    start = ev["date"]
    end = ev.get("end")
    extra = " · ".join(x for x in (ev.get("time"), ev.get("mode")) if x)
    if end and end != start:
        if start.month == end.month:
            days = f"{start.strftime('%a')}–{end.strftime('%a')}, {start.strftime('%b')} {start.day}–{end.day}"
        else:
            days = f"{start.strftime('%a %b %-d')} to {end.strftime('%a %b %-d')}"
        return f"{days} · {extra}" if extra else days
    line = start.strftime("%a, %b %-d")
    return f"{line} · {extra}" if extra else line


def date_badge_html(ev):
    start = ev["date"]
    end = ev.get("end")
    mon = start.strftime("%b").upper()
    if end and end != start:
        day = f"{start.day}–{end.day}"
    else:
        day = f"{start.day:02d}" if start.day < 10 else str(start.day)
    return (
        f'<div class="date-badge" aria-hidden="true">'
        f'<span class="mon">{mon}</span>'
        f'<span class="dom">{day}</span>'
        f"</div>"
    )


def rsvp_href(ev):
    subj = f'RSVP: {ev["title"]} ({ev["date"].isoformat()})'
    from urllib.parse import quote
    return f"mailto:{MAIL}?subject={quote(subj)}"


def upcoming():
    return [ev for ev in EVENTS if ev["date"] >= TODAY]


def past_events():
    return [ev for ev in reversed(EVENTS) if ev["date"] < TODAY]


def nav(active, depth):
    p = "../" * depth

    def item(href, label, key):
        cur = ' aria-current="page"' if active == key else ""
        return f'        <a href="{p}{href}"{cur}>{label}</a>'

    return "\n".join([
        '      <nav aria-label="Site">',
        item("events/", "Events", "events"),
        item("challenges/", "Challenges", "challenges"),
        item("partners/", "Partners", "partners"),
        item("participate/", "Participate", "participate"),
        item("about/", "About", "about"),
        "      </nav>",
    ])


def hero_atmos_html(depth):
    p = "../" * depth
    tiles = [
        ("desert.jpg", ""),
        ("steam.jpg", "portrait"),
        ("field.jpg", "wide"),
        ("workshop.jpg", ""),
        ("sinter.jpg", "portrait"),
        ("basin.jpg", ""),
    ]
    tiles_html = "\n".join(
        f'      <div class="hero-tile {klass}"><img src="{p}images/{img}" alt="" width="800" height="600"></div>'
        for img, klass in tiles
    )
    return (
        f'    <div class="hero-atmos" aria-hidden="true">\n'
        f'      <div class="rays"></div>\n'
        f'      <div class="hero-mosaic">\n{tiles_html}\n      </div>\n'
        f'    </div>\n'
    )


def page(*, title, heading, lede, body, active, depth, eyebrow="", show_rule=False,
         home=False, compact=False, about=False, actions="", wrap_body=True,
         photo=None, hero_mosaic=False):
    p = "../" * depth
    rule = '      <span class="rule" aria-hidden="true"></span>\n' if show_rule else ""
    eye = f'      <p class="eyebrow">{eyebrow}</p>\n' if eyebrow else ""
    classes = []
    if home:
        classes.append("home")
    if compact:
        classes.append("compact")
    if about:
        classes.append("about")
    body_class = f' class="{" ".join(classes)}"' if classes else ""
    inner = f'  <div class="wrap">\n{body}\n  </div>' if wrap_body else body
    photo_el = (
        f'    <div class="mast-photo" style="background-image:url(\'{p}images/{photo}\')" aria-hidden="true"></div>\n'
        if photo else ""
    )
    atmos = hero_atmos_html(depth) if hero_mosaic else ""
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>{title}</title>
<meta name="description" content="Hackathons on geothermal and subsurface permitting. Partnership of CEQ PIC and Pacific Northwest National Laboratory.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500;1,9..144,600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>{CSS}
</style>
</head>
<body{body_class}>
<div class="page">
  <header class="mast">
{photo_el}{atmos}    <div class="wrap site-nav">
      <a class="brand" href="{p or './'}">
        <img src="{p}thermal-underground-logo.png" width="256" height="256" alt="">
        <span class="brand-name">Permitting <i>Hackathons</i></span>
      </a>
{nav(active, depth)}
    </div>
    <div class="wrap mast-copy">
{eye}      <h1>{heading}</h1>
{rule}      <p class="lede">{lede}</p>
{actions}    </div>
  </header>

  {inner}

  <footer class="wrap">
    <p>{FOOTER}</p>
  </footer>
</div>
<script>
(function(){{
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nodes = document.querySelectorAll('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) {{
    nodes.forEach(function(el){{ el.classList.add('in'); }});
  }} else {{
    var io = new IntersectionObserver(function(entries){{
      entries.forEach(function(e){{
        if (e.isIntersecting) {{ e.target.classList.add('in'); io.unobserve(e.target); }}
      }});
    }}, {{ threshold: 0.12, rootMargin: '0px 0px -32px 0px' }});
    nodes.forEach(function(el){{ io.observe(el); }});
  }}
}})();
</script>
</body>
</html>
"""


def event_card(ev, depth, *, variant="row"):
    p = "../" * depth
    slug = event_slug(ev)
    detail = f"{p}events/#{slug}" if depth else f"events/#{slug}"
    past = ev["date"] < TODAY
    klass = "meetup-card" + (" is-past" if past else "") + (" is-hero" if variant == "hero" else "")
    photo = ""
    if variant == "hero":
        photo = (
            f'<div class="meetup-hero-media">'
            f'<img src="{p}images/{ev.get("photo", "workshop.jpg")}" alt="" width="900" height="560">'
            f"</div>"
        )
    cta = (
        f'    <a class="btn ghost" href="{detail}">View</a>\n'
        if past else
        f'    <a class="btn primary rsvp" href="{rsvp_href(ev)}">Register</a>\n'
        f'    <a class="btn ghost" href="{detail}">Details</a>\n'
    )
    blurb = f'    <p class="meetup-blurb">{ev["blurb"]}</p>\n' if ev.get("blurb") else ""
    return (
        f'<article class="{klass}" id="{slug}" data-reveal>\n'
        f'  {date_badge_html(ev)}\n'
        f'  <div class="meetup-main">\n'
        f"{photo}"
        f'    <p class="meetup-when">{weekday_line(ev)}</p>\n'
        f'    <h3 class="meetup-title"><a href="{detail}">{ev["title"]}</a></h3>\n'
        f'    <p class="meetup-where">{ev["where"]}</p>\n'
        f'    <p class="meetup-host">Hosted by {ev["host"]} · {ev["kind"]}</p>\n'
        f"{blurb}"
        f"  </div>\n"
        f'  <div class="meetup-cta">\n'
        f"{cta}"
        f"  </div>\n"
        f"</article>"
    )


def guide_card(href, kicker, title, lede, photo, depth=0):
    p = "../" * depth
    return f'''    <a class="guide-card" href="{href}">
      <span class="guide-card-media"><img src="{p}images/{photo}" alt="" width="800" height="500"></span>
      <span class="guide-card-body">
        <span class="guide-kicker">{kicker}</span>
        <h2>{title}</h2>
        <p>{lede}</p>
        <span class="guide-arrow">Read →</span>
      </span>
    </a>'''


def story(partner, depth, reverse=False):
    p = "../" * depth
    klass = "story reverse" if reverse else "story"
    return f'''    <article class="{klass}" data-reveal>
      <div class="story-media"><img src="{p}images/{partner["photo"]}" alt="" width="1200" height="800"></div>
      <div class="story-body">
        <span class="k">{partner["kicker"]}</span>
        <h3>{partner["title"]}</h3>
        <p>{partner["lede"]}</p>
        <p>{partner["body"]}</p>
      </div>
    </article>'''


def home_body():
    up = upcoming()
    next_ev = up[0] if up else None
    rest = up[1:] if next_ev else []
    next_html = ""
    if next_ev:
        next_html = (
            '  <section class="home-band next-meetup-band" data-reveal>\n'
            '    <div class="wrap">\n'
            '      <header class="home-guide-intro">\n'
            '        <p class="guide-kicker">Next</p>\n'
            '        <h2>Next on the calendar</h2>\n'
            '        <p>Register for the nearest briefing or sprint.</p>\n'
            '      </header>\n'
            + event_card(next_ev, 0, variant="hero") + "\n"
            '    </div>\n'
            '  </section>\n'
        )
    feed = "\n".join(event_card(ev, 0) for ev in rest)
    feed_section = ""
    if rest:
        feed_section = (
            '  <section class="home-band" data-reveal>\n'
            '    <div class="wrap">\n'
            '      <header class="home-guide-intro">\n'
            '        <p class="guide-kicker">Calendar</p>\n'
            '        <h2>Coming sprints</h2>\n'
            '        <p>Three two-day sprints through August 2027.</p>\n'
            '      </header>\n'
            '      <div class="meetup-list">\n'
            + feed + "\n"
            '      </div>\n'
            '      <p class="home-more"><a href="events/">Full calendar →</a></p>\n'
            '    </div>\n'
            '  </section>\n'
        )
    track_cards = "\n".join(
        guide_card(f'challenges/#{t["id"]}', t["kicker"], t["title"], t["lede"], t["photo"])
        for t in TRACKS
    )
    return (
        '  <section class="group-strip home-group" data-reveal>\n'
        '    <div class="wrap group-strip-inner">\n'
        '      <div class="group-identity">\n'
        '        <p class="guide-kicker">Partners</p>\n'
        '        <h2>CEQ PIC and PNNL</h2>\n'
        '        <p class="group-meta">Council on Environmental Quality Permitting Innovation Center · Pacific Northwest National Laboratory</p>\n'
        '        <p>Timed sprints on geothermal and subsurface permitting. Problem statements from the backlog. Lab hosts and data access. Selected demos enter the coordination queue.</p>\n'
        '      </div>\n'
        '      <div class="group-actions">\n'
        '        <a class="btn primary" href="participate/">Take part</a>\n'
        '        <a class="btn ghost" href="partners/">Partners</a>\n'
        '      </div>\n'
        '    </div>\n'
        '  </section>\n'
        + next_html
        + feed_section
        + '  <section class="home-band topics-band" data-reveal>\n'
        '    <div class="wrap">\n'
        '      <header class="home-guide-intro">\n'
        '        <p class="guide-kicker">Tracks</p>\n'
        '        <h2>Three challenge tracks</h2>\n'
        '        <p>Each sprint publishes statements under these tracks.</p>\n'
        '      </header>\n'
        '      <div class="home-guide-grid">\n'
        + track_cards + "\n"
        '      </div>\n'
        '      <p class="home-more"><a href="challenges/">All challenges →</a></p>\n'
        '    </div>\n'
        '  </section>\n'
        '  <section class="home-band" data-reveal>\n'
        '    <div class="wrap">\n'
        '      <header class="home-guide-intro">\n'
        '        <p class="guide-kicker">How a sprint runs</p>\n'
        '        <h2>Before, during, after</h2>\n'
        '      </header>\n'
        '      <ul class="steps">\n'
        '        <li><span class="n">Before</span><p>Problem statements, judging criteria, and data-access arrangements are posted before the event.</p></li>\n'
        '        <li><span class="n">During</span><p>Teams work the published statements. Federal, lab, state, and industry seats in the same room.</p></li>\n'
        '        <li><span class="n">After</span><p>Demos are assessed with PNNL. Selected work enters the coordination backlog.</p></li>\n'
        '      </ul>\n'
        '    </div>\n'
        '  </section>\n'
        '  <section class="home-band join-cta-band" data-reveal>\n'
        '    <div class="wrap join-cta">\n'
        '      <div>\n'
        '        <p class="guide-kicker">Participate</p>\n'
        '        <h2>Form a team and register</h2>\n'
        '        <p>Open to federal, lab, state, Tribal, industry, and applicant teams.</p>\n'
        '      </div>\n'
        '      <div class="group-actions">\n'
        '        <a class="btn primary" href="participate/">How to take part</a>\n'
        '        <a class="btn ghost" href="events/">See dates</a>\n'
        '      </div>\n'
        '    </div>\n'
        '  </section>'
    )


def events_body(depth):
    up = upcoming()
    past = past_events()
    parts = [
        '  <section class="home-band" data-reveal>',
        '    <header class="home-guide-intro">',
        '      <p class="guide-kicker">FY 2027</p>',
        '      <h2>Upcoming</h2>',
        '      <p>Briefing in October 2026. Three two-day sprints through August 2027.</p>',
        '    </header>',
        '    <div class="meetup-list">',
        "\n".join(event_card(ev, depth) for ev in up),
        '    </div>',
        '  </section>',
    ]
    if past:
        parts += [
            '  <section class="home-band" data-reveal>',
            '    <header class="home-guide-intro">',
            '      <p class="guide-kicker">Past</p>',
            '      <h2>Already held</h2>',
            '    </header>',
            '    <div class="meetup-list">',
            "\n".join(event_card(ev, depth) for ev in past),
            '    </div>',
            '  </section>',
        ]
    return "\n".join(parts)


def challenges_body(depth):
    stories = "\n".join(
        f'''    <article class="story{" reverse" if i % 2 else ""}" id="{t["id"]}" data-reveal>
      <div class="story-media"><img src="{"../" * depth}images/{t["photo"]}" alt="" width="1200" height="800"></div>
      <div class="story-body">
        <span class="k">{t["kicker"]}</span>
        <h3>{t["title"]}</h3>
        <p>{t["lede"]}</p>
        <p>{t["body"]}</p>
      </div>
    </article>'''
        for i, t in enumerate(TRACKS)
    )
    return f'''  <article>
    <h2>Published tracks</h2>
    <p>Each hackathon posts problem statements under these three tracks. Statements, judging, and data access go up before the event.</p>
  </article>
{stories}
  <article data-reveal>
    <h2>Dates</h2>
    <p>See the <a href="../events/">events calendar</a> for the briefing and the three FY 2027 sprints.</p>
  </article>'''


def partners_body(depth):
    stories = "\n".join(story(p, depth, reverse=i % 2 == 1) for i, p in enumerate(PARTNERS))
    return f'''  <article>
    <h2>Who runs the room</h2>
    <p>Hackathons in partnership with CEQ PIC and Pacific Northwest National Laboratory. Thermal Underground hosts this site on the AADOE hub.</p>
  </article>
{stories}
  <article data-reveal>
    <h2>Thermal Underground</h2>
    <p>Research and translation for geothermal and other subsurface energy. The field guide sits next to these hackathons on the hub.</p>
  </article>'''


def participate_body():
    return '''  <article class="join-block" id="join" data-reveal>
    <p class="guide-kicker">Four steps</p>
    <h2>How to take part</h2>
    <ol class="join-steps">
      <li>
        <span class="n">01</span>
        <h3>Read the statements</h3>
        <p>Tracks live on <a href="../challenges/">Challenges</a>. Event-specific statements post before each sprint.</p>
      </li>
      <li>
        <span class="n">02</span>
        <h3>Form a team</h3>
        <p>Federal, lab, state, Tribal, industry, and applicant seats. Mixed teams are welcome.</p>
      </li>
      <li>
        <span class="n">03</span>
        <h3>Register</h3>
        <p>Use Register on the event card, or write <a href="mailto:hackathons@thermalunderground.org">hackathons@thermalunderground.org</a> with your team and the date.</p>
      </li>
      <li>
        <span class="n">04</span>
        <h3>Demo</h3>
        <p>Present against the published criteria. Selected work enters the coordination backlog with PNNL.</p>
      </li>
    </ol>
    <div class="actions">
      <a class="btn primary" href="../events/">See dates</a>
      <a class="btn ghost" href="mailto:hackathons@thermalunderground.org">Write the desk</a>
    </div>
  </article>'''


def about_body(depth):
    p = "../" * depth
    return (
        f'  <div class="folio">\n'
        f'    <article class="dek">\n'
        f'      <h2>Purpose</h2>\n'
        f'      <p>Timed hackathons on geothermal and subsurface permitting. Teams work published problem statements. Selected demos enter the coordination queue.</p>\n'
        f'      <p>Partnership of CEQ PIC and Pacific Northwest National Laboratory. This site sits on the Thermal Underground AADOE hub.</p>\n'
        f'    </article>\n'
        f'    <article class="story" data-reveal>\n'
        f'      <div class="story-media"><img src="{p}images/workshop.jpg" alt="" width="1600" height="1067"></div>\n'
        f'      <div class="story-body">\n'
        f'        <span class="k">What happens</span>\n'
        f'        <h3>A two-day sprint</h3>\n'
        f'        <p>Statements, judging, and data access are posted first. Teams work the tracks. Demos are assessed with PNNL.</p>\n'
        f'        <p>Three sprints in FY 2027. One briefing in October 2026.</p>\n'
        f'      </div>\n'
        f'    </article>\n'
        f'    <article class="story reverse" data-reveal>\n'
        f'      <div class="story-media"><img src="{p}images/desert.jpg" alt="" width="1600" height="1067"></div>\n'
        f'      <div class="story-body">\n'
        f'        <span class="k">Partners</span>\n'
        f'        <h3>CEQ PIC and PNNL</h3>\n'
        f'        <p>CEQ PIC is the Council on Environmental Quality Permitting Innovation Center. It sets statements and judging.</p>\n'
        f'        <p>PNNL is the technical host: data access, lab methods, and disposition of selected work.</p>\n'
        f'      </div>\n'
        f'    </article>\n'
        f'  </div>\n'
        f'  <div class="mosaic" aria-hidden="true">\n'
        f'    <figure><img src="{p}images/basin.jpg" alt="" width="1600" height="2131"></figure>\n'
        f'    <figure><img src="{p}images/steam.jpg" alt="" width="1024" height="689"></figure>\n'
        f'  </div>\n'
        f'  <div class="folio">\n'
        f'    <article class="roster-block" data-reveal>\n'
        f'      <h2>Who shows up</h2>\n'
        f'      <ul class="roster">\n'
        f'        <li>Federal permitting staff</li>\n'
        f'        <li>National laboratory analysts</li>\n'
        f'        <li>State energy office and regulator teams</li>\n'
        f'        <li>Tribal environmental staff</li>\n'
        f'        <li>Industry builders and applicants</li>\n'
        f'        <li>CEQ PIC and PNNL hosts</li>\n'
        f'      </ul>\n'
        f'    </article>\n'
        f'  </div>'
    )


def redirect_page(title, dest):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta http-equiv="refresh" content="0; url={dest}">
<link rel="canonical" href="{dest}">
<title>{title}</title>
<script>location.replace({dest!r});</script>
</head>
<body>
<p><a href="{dest}">{title}</a></p>
</body>
</html>
"""


def write(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text)
    print("wrote", path.relative_to(ROOT))


def main():
    home_actions = (
        '      <div class="actions">\n'
        '        <a class="btn primary" href="participate/">Take part</a>\n'
        '        <a class="btn ghost" href="events/">See dates</a>\n'
        '      </div>\n'
    )
    write(ROOT / "index.html", page(
        title="Hackathons · CEQ PIC and PNNL",
        heading="Hackathons",
        lede="Timed sprints on geothermal and subsurface permitting. Partnership of CEQ PIC and Pacific Northwest National Laboratory.",
        body=home_body(),
        active="",
        depth=0,
        home=True,
        show_rule=True,
        wrap_body=False,
        photo="workshop.jpg",
        hero_mosaic=True,
        actions=home_actions,
    ))

    write(ROOT / "events" / "index.html", page(
        title="Events · Hackathons",
        eyebrow="Calendar",
        heading="Events",
        lede="One briefing and three two-day sprints. Register from the event card.",
        body=events_body(1),
        active="events",
        depth=1,
        photo="gathering.jpg",
    ))

    write(ROOT / "challenges" / "index.html", page(
        title="Challenges · Hackathons",
        eyebrow="Tracks",
        heading="Challenges",
        lede="Authorization records, coordination sequences, and field tools. Statements post before each sprint.",
        body=challenges_body(1),
        active="challenges",
        depth=1,
        show_rule=True,
        photo="maps.jpg",
        hero_mosaic=True,
    ))

    write(ROOT / "partners" / "index.html", page(
        title="Partners · Hackathons",
        eyebrow="Partners",
        heading="CEQ PIC and PNNL",
        lede="Council on Environmental Quality Permitting Innovation Center and Pacific Northwest National Laboratory.",
        body=partners_body(1),
        active="partners",
        depth=1,
        show_rule=True,
        photo="desert.jpg",
    ))

    write(ROOT / "participate" / "index.html", page(
        title="Participate · Hackathons",
        eyebrow="Participate",
        heading="Take part",
        lede="Read the statements, form a team, register, demo.",
        body=participate_body(),
        active="participate",
        depth=1,
        photo="classroom.jpg",
        actions=(
            '      <div class="actions">\n'
            '        <a class="btn primary" href="../events/">See dates</a>\n'
            f'        <a class="btn ghost" href="mailto:{MAIL}">Write the desk</a>\n'
            '      </div>\n'
        ),
    ))

    write(ROOT / "about" / "index.html", page(
        title="About · Hackathons",
        heading="About these <i>hackathons</i>",
        lede="Timed sprints with CEQ PIC and PNNL. This site lives on the Thermal Underground AADOE hub.",
        body=about_body(1),
        active="about",
        depth=1,
        about=True,
        show_rule=True,
        wrap_body=False,
        photo="steam.jpg",
        actions=(
            '      <div class="actions">\n'
            '        <a class="btn primary" href="../participate/">Take part</a>\n'
            '        <a class="btn ghost" href="../partners/">Partners</a>\n'
            '      </div>\n'
        ),
    ))

    retired = (
        ("programs", "../", "Hackathons"),
        ("support-team", "../", "Hackathons"),
        ("accelerator", "../", "Hackathons"),
        ("innovation", "../challenges/", "Challenges"),
        ("edoh", "../", "Hackathons"),
        ("fellows", "../", "Hackathons"),
        ("operations", "../", "Hackathons"),
        ("training", "../", "Hackathons"),
        ("evidence", "../", "Hackathons"),
        ("research", "../", "Hackathons"),
        ("exchange", "../", "Hackathons"),
        ("federal", "../", "Hackathons"),
        ("states", "../", "Hackathons"),
        ("tribal", "../", "Hackathons"),
        ("work", "../", "Hackathons"),
        ("resources", "../", "Hackathons"),
        ("resources/federal", "../../", "Hackathons"),
        ("resources/state", "../../", "Hackathons"),
        ("resources/tribal", "../../", "Hackathons"),
        ("resources/applicants", "../../", "Hackathons"),
    )
    for slug, dest, title in retired:
        write(ROOT / Path(slug) / "index.html", redirect_page(title, dest))


if __name__ == "__main__":
    main()
