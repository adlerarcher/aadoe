#!/usr/bin/env python3
"""Write the GPIC community site: programs, events, and resources."""
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TODAY = date(2026, 9, 8)

CSS = Path(__file__).with_name("gpic.css").read_text()


# FY 2027 = 1 Oct 2026 through 30 Sep 2027.
# Dates are estimated from Year 1 quarters. Meetup metadata (time, host, going) is demo-facing.
INTERESTS = ["Federal", "State", "Tribal", "Applicant", "Exchange", "Training"]
GROUP_MEMBERS = 186

EVENTS = [
    # Recent past (social proof before FY27 calendar opens)
    {"date": date(2026, 8, 19), "kind": "Workshop", "title": "Charter drafting workshop",
     "where": "Virtual", "mode": "Virtual", "audience": "Founding participants",
     "program": "operations", "photo": "workshop.jpg",
     "time": "1:00–2:30 PM MT", "host": "Program operations", "going": 34, "interest": "Exchange",
     "attendees": ["Operations", "BLM", "NASEO", "Fellow"],
     "blurb": "Closed session that locked Year 1 purpose language and membership terms."},
    {"date": date(2026, 8, 27), "kind": "Exchange", "title": "Nevada permitting exchange (preview)",
     "where": "Nevada monthly interagency call", "mode": "Virtual", "audience": "Federal, state, Tribal seats",
     "program": "accelerator", "photo": "gathering.jpg",
     "time": "10:00–11:30 AM PT", "host": "BLM Nevada · exchange desk", "going": 41, "interest": "Exchange",
     "attendees": ["BLM", "NDOM", "Tribal", "Applicant"],
     "blurb": "Dry run of the FY27 monthly spine. Materials posted afterward."},
    {"date": date(2026, 9, 3), "kind": "Office hours", "title": "September open office hours",
     "where": "Virtual", "mode": "Virtual", "audience": "Anyone joining the Collaborative",
     "program": "operations", "photo": "classroom.jpg",
     "time": "12:00–1:00 PM MT", "host": "Program operations", "going": 22, "interest": "Exchange",
     "attendees": ["Federal", "State", "Applicant"],
     "blurb": "How to get on the membership map before October events open."},
    # October 2026
    {"date": date(2026, 10, 7), "kind": "Office hours", "title": "New participant office hours",
     "where": "Virtual", "mode": "Virtual", "audience": "Anyone joining the Collaborative",
     "program": "operations", "featured": True, "photo": "gathering.jpg",
     "time": "12:00–1:00 PM MT", "host": "Program operations", "going": 28, "interest": "Exchange",
     "attendees": ["Federal", "State", "Tribal", "Applicant"],
     "blurb": "Drop-in for new members: how the calendar works, where materials live, and how to get on a working group."},
    {"date": date(2026, 10, 14), "kind": "Workshop", "title": "Reading a geothermal lease file",
     "where": "BLM Nevada State Office, Reno · hybrid", "mode": "Hybrid", "audience": "Federal field staff & state reviewers",
     "program": "support-team", "featured": True, "photo": "documents.jpg",
     "time": "9:00 AM–12:00 PM PT", "host": "BLM Nevada geothermal team", "going": 46, "interest": "Federal",
     "attendees": ["BLM", "NDOM", "Reviewer", "Fellow"],
     "blurb": "Walk a live lease packet end to end with BLM mentors. Bring a laptop; sample files posted the week before."},
    {"date": date(2026, 10, 21), "kind": "Exchange", "title": "Nevada permitting exchange",
     "where": "Nevada monthly interagency call", "mode": "Virtual", "audience": "Federal, state, Tribal, applicant seats",
     "program": "accelerator",
     "time": "10:00–11:30 AM PT", "host": "BLM Nevada · exchange desk", "going": 52, "interest": "Exchange",
     "attendees": ["BLM", "State", "Tribal", "Applicant"],
     "blurb": "First of eight. Documented participation from BLM, one state agency, and one Tribal-facing office."},
    {"date": date(2026, 10, 28), "kind": "Fellows", "title": "Fellow kickoff convening",
     "where": "Golden, CO · hybrid", "mode": "Hybrid", "audience": "Year 1 fellows & host supervisors",
     "program": "fellows", "featured": True, "photo": "classroom.jpg",
     "time": "9:00 AM–4:00 PM MT", "host": "Intergovernmental fellow lead", "going": 31, "interest": "Exchange",
     "attendees": ["Fellow", "Host", "Lab", "NASEO"],
     "blurb": "Scope, host expectations, and the shared workspace. Fellows meet the Intergovernmental lead."},
    # November 2026
    {"date": date(2026, 11, 4), "kind": "Office hours", "title": "Applicant readiness office hours",
     "where": "Virtual", "mode": "Virtual", "audience": "Developers without in-house counsel",
     "program": "training",
     "time": "11:00 AM–12:30 PM MT", "host": "Applicant readiness desk", "going": 19, "interest": "Applicant",
     "attendees": ["Developer", "Counsel", "State"],
     "blurb": "30-minute slots on pre-application checklists. Readiness support only."},
    {"date": date(2026, 11, 12), "kind": "Workshop", "title": "State roadmap clinic",
     "where": "Virtual", "mode": "Virtual", "audience": "State energy offices & regulators",
     "program": "accelerator", "photo": "field.jpg",
     "time": "1:00–3:00 PM ET", "host": "NASEO geothermal desk", "going": 37, "interest": "State",
     "attendees": ["Energy office", "Regulator", "Lab"],
     "blurb": "How requesting states pull federal RAPID and lab timeline products into a state permitting roadmap."},
    {"date": date(2026, 11, 18), "kind": "Exchange", "title": "Nevada permitting exchange",
     "where": "Nevada monthly interagency call", "mode": "Virtual", "audience": "Federal, state, Tribal, applicant seats",
     "program": "accelerator",
     "time": "10:00–11:30 AM PT", "host": "BLM Nevada · exchange desk", "going": 48, "interest": "Exchange",
     "attendees": ["BLM", "State", "Tribal", "Applicant"],
     "blurb": "Recurring session on the Nevada monthly interagency call."},
    {"date": date(2026, 11, 20), "kind": "Fellows", "title": "Research fellow check-in",
     "where": "Virtual", "mode": "Virtual", "audience": "Research & pathway fellows",
     "program": "fellows",
     "time": "2:00–3:00 PM MT", "host": "Research fellows lead", "going": 14, "interest": "Exchange",
     "attendees": ["Fellow", "Lab"],
     "blurb": "Interview sampling frame and draft timeline tables for the research meeting."},
    # December 2026
    {"date": date(2026, 12, 3), "kind": "Office hours", "title": "Tribal staff office hours",
     "where": "Virtual", "mode": "Virtual", "audience": "Tribal environmental & cultural staff",
     "program": "accelerator",
     "time": "12:00–1:30 PM MT", "host": "Tribal engagement desk", "going": 17, "interest": "Tribal",
     "attendees": ["Tribal env", "Cultural", "BIA"],
     "blurb": "Questions about convening design and training cohorts. Coordination only; consultation stays with the responsible agency."},
    {"date": date(2026, 12, 9), "kind": "Workshop", "title": "Categorical exclusion deep dive",
     "where": "Virtual", "mode": "Virtual", "audience": "BLM NEPA & geothermal staff",
     "program": "support-team",
     "time": "10:00 AM–12:00 PM MT", "host": "BLM NEPA partners", "going": 39, "interest": "Federal",
     "attendees": ["BLM", "NEPA", "Field"],
     "blurb": "Draft substantiation packets reviewed against Federal Register standards."},
    {"date": date(2026, 12, 16), "kind": "Exchange", "title": "Nevada permitting exchange",
     "where": "Nevada monthly interagency call", "mode": "Virtual", "audience": "Federal, state, Tribal, applicant seats",
     "program": "accelerator",
     "time": "10:00–11:30 AM PT", "host": "BLM Nevada · exchange desk", "going": 44, "interest": "Exchange",
     "attendees": ["BLM", "State", "Tribal", "Applicant"],
     "blurb": "Last session of the first quarter."},
    # January 2027
    {"date": date(2027, 1, 13), "kind": "Office hours", "title": "Open Collaborative office hours",
     "where": "Virtual", "mode": "Virtual", "audience": "All participants",
     "program": "operations",
     "time": "12:00–1:00 PM MT", "host": "Program operations", "going": 26, "interest": "Exchange",
     "attendees": ["Federal", "State", "Applicant"],
     "blurb": "Monthly drop-in with program staff. Bring calendar and resource questions."},
    {"date": date(2027, 1, 20), "kind": "Exchange", "title": "Nevada permitting exchange",
     "where": "Nevada monthly interagency call", "mode": "Virtual", "audience": "Federal, state, Tribal, applicant seats",
     "program": "accelerator",
     "time": "10:00–11:30 AM PT", "host": "BLM Nevada · exchange desk", "going": 50, "interest": "Exchange",
     "attendees": ["BLM", "State", "Tribal", "Applicant"],
     "blurb": "Continuing Nevada monthly interagency call."},
    {"date": date(2027, 1, 27), "kind": "Working group", "title": "Energy determinants working group",
     "where": "Interagency, virtual", "mode": "Virtual", "audience": "HHS, IHS, VA, DOL & pathway fellows",
     "program": "edoh",
     "time": "1:00–2:30 PM ET", "host": "Pathway fellows · exchange", "going": 23, "interest": "Exchange",
     "attendees": ["HHS", "IHS", "VA", "Fellow"],
     "blurb": "First of six. Tests one pathway against the agency that holds the indicator."},
    {"date": date(2027, 1, 29), "kind": "Fellows", "title": "Fellow mid-year convening",
     "where": "Washington, DC · hybrid", "mode": "Hybrid", "audience": "Fellows, host agencies, NASEO",
     "program": "fellows", "featured": True, "photo": "basin.jpg",
     "time": "9:00 AM–3:00 PM ET", "host": "Intergovernmental fellow lead", "going": 36, "interest": "Exchange",
     "attendees": ["Fellow", "Host", "NASEO", "Lab"],
     "blurb": "Progress on host placements for Year 2 and draft research briefs."},
    # February 2027
    {"date": date(2027, 2, 3), "end": date(2027, 2, 4), "kind": "Challenge", "title": "Permitting innovation challenge",
     "where": "Denver, CO · hybrid", "mode": "Hybrid", "audience": "Federal & non-federal teams",
     "program": "innovation", "featured": True, "photo": "workshop.jpg",
     "feat": "Innovation challenge · Denver",
     "time": "Two days · 9:00 AM MT start", "host": "Innovation challenge desk", "going": 78, "interest": "Exchange",
     "attendees": ["Federal", "Startup", "State", "Lab"],
     "blurb": "Problem statements from the coordination backlog. Outside teams welcome. Demos enter the backlog as candidates."},
    {"date": date(2027, 2, 10), "end": date(2027, 2, 11), "kind": "Convening", "title": "Tribal Government convening",
     "where": "Alongside ICEIWG · Albuquerque, NM", "mode": "Hybrid", "audience": "Tribal Governments & partners",
     "program": "accelerator", "featured": True, "photo": "sinter.jpg",
     "time": "Two days · morning start MT", "host": "Tribal Government co-hosts", "going": 64, "interest": "Tribal",
     "attendees": ["Tribal Gov", "BIA", "Partner", "Fellow"],
     "blurb": "Co-designed with participating Tribal Governments. Coordination only; consultation stays with the responsible agency."},
    {"date": date(2027, 2, 17), "kind": "Exchange", "title": "Nevada permitting exchange",
     "where": "Nevada monthly interagency call", "mode": "Virtual", "audience": "Federal, state, Tribal, applicant seats",
     "program": "accelerator",
     "time": "10:00–11:30 AM PT", "host": "BLM Nevada · exchange desk", "going": 49, "interest": "Exchange",
     "attendees": ["BLM", "State", "Tribal", "Applicant"],
     "blurb": "Fifth session."},
    {"date": date(2027, 2, 24), "kind": "Working group", "title": "Energy determinants working group",
     "where": "Interagency, virtual", "mode": "Virtual", "audience": "Health & workforce agencies",
     "program": "edoh",
     "time": "1:00–2:30 PM ET", "host": "Pathway fellows · exchange", "going": 21, "interest": "Exchange",
     "attendees": ["HHS", "DOL", "Fellow"],
     "blurb": "Second pathway test."},
    # March 2027
    {"date": date(2027, 3, 4), "kind": "Office hours", "title": "Handbook authors office hours",
     "where": "Virtual", "mode": "Virtual", "audience": "BLM design partners & writers",
     "program": "support-team",
     "time": "11:00 AM–12:00 PM MT", "host": "Federal handbook team", "going": 18, "interest": "Federal",
     "attendees": ["BLM", "Writer", "Lab"],
     "blurb": "Open questions on leasing and exploration volumes before spring field training."},
    {"date": date(2027, 3, 11), "kind": "Workshop", "title": "UIC Class V primacy workshop",
     "where": "Oklahoma City · with GWPC", "mode": "In person", "audience": "State UIC & geothermal regulators",
     "program": "accelerator", "photo": "maps.jpg",
     "time": "9:00 AM–4:00 PM CT", "host": "GWPC · state partners", "going": 42, "interest": "State",
     "attendees": ["UIC", "GWPC", "Energy office"],
     "blurb": "Primacy pathway clinic with the Groundwater Protection Council."},
    {"date": date(2027, 3, 17), "kind": "Exchange", "title": "Nevada permitting exchange",
     "where": "Nevada monthly interagency call", "mode": "Virtual", "audience": "Federal, state, Tribal, applicant seats",
     "program": "accelerator",
     "time": "10:00–11:30 AM PT", "host": "BLM Nevada · exchange desk", "going": 47, "interest": "Exchange",
     "attendees": ["BLM", "State", "Tribal", "Applicant"],
     "blurb": "Sixth session."},
    {"date": date(2027, 3, 24), "end": date(2027, 3, 25), "kind": "Regional", "title": "Intermountain regional session",
     "where": "BLM Utah State Office, Salt Lake City", "mode": "Hybrid", "audience": "District & state office staff",
     "program": "accelerator", "featured": True, "photo": "desert.jpg",
     "time": "Two days · 8:30 AM MT", "host": "BLM Utah State Office", "going": 71, "interest": "Federal",
     "attendees": ["BLM", "District", "State", "Field"],
     "blurb": "First of two regionals. Hosted by BLM."},
    {"date": date(2027, 3, 31), "kind": "Working group", "title": "Energy determinants working group",
     "where": "Interagency, virtual", "mode": "Virtual", "audience": "Health & workforce agencies",
     "program": "edoh",
     "time": "1:00–2:30 PM ET", "host": "Pathway fellows · exchange", "going": 20, "interest": "Exchange",
     "attendees": ["VA", "IHS", "Fellow"],
     "blurb": "Third pathway test."},
    # April 2027
    {"date": date(2027, 4, 6), "end": date(2027, 6, 11), "kind": "Training", "title": "Federal training cohort",
     "where": "Cohort · virtual modules + field days", "mode": "Hybrid", "audience": "Federal geothermal staff",
     "program": "training", "featured": True, "photo": "classroom.jpg",
     "time": "Cohort window · modules weekly", "host": "Training cohort desk", "going": 45, "interest": "Training",
     "attendees": ["BLM", "Field", "Lab"],
     "blurb": "Permitting project management and applied AI. Graduates feed live-case onboarding."},
    {"date": date(2027, 4, 8), "kind": "Office hours", "title": "Cohort office hours",
     "where": "Virtual", "mode": "Virtual", "audience": "Federal cohort participants",
     "program": "training",
     "time": "12:00–1:00 PM MT", "host": "Training cohort desk", "going": 24, "interest": "Training",
     "attendees": ["Cohort", "Mentor"],
     "blurb": "Weekly drop-in while the federal cohort runs."},
    {"date": date(2027, 4, 20), "end": date(2027, 4, 21), "kind": "Convening", "title": "State geothermal convening",
     "where": "NASEO · Denver, CO", "mode": "In person", "audience": "State energy offices & Governors' staff",
     "program": "accelerator", "featured": True, "photo": "basin.jpg",
     "time": "Two days · 9:00 AM MT", "host": "NASEO", "going": 68, "interest": "State",
     "attendees": ["Energy office", "Governor staff", "Regulator"],
     "blurb": "Partner-state shortlist and Governor-level commitment conversations."},
    {"date": date(2027, 4, 28), "kind": "Working group", "title": "Energy determinants working group",
     "where": "Interagency, virtual", "mode": "Virtual", "audience": "Health & workforce agencies",
     "program": "edoh",
     "time": "1:00–2:30 PM ET", "host": "Pathway fellows · exchange", "going": 22, "interest": "Exchange",
     "attendees": ["HHS", "DOL", "Fellow"],
     "blurb": "Fourth pathway test."},
    # May 2027
    {"date": date(2027, 5, 4), "end": date(2027, 7, 16), "kind": "Training", "title": "Tribal environmental offices cohort",
     "where": "Cohort · virtual modules", "mode": "Virtual", "audience": "Tribal environmental offices",
     "program": "training",
     "time": "Cohort window · modules weekly", "host": "Training · Tribal desk", "going": 29, "interest": "Tribal",
     "attendees": ["Tribal env", "Mentor", "Fellow"],
     "blurb": "Same curriculum as the federal cohort."},
    {"date": date(2027, 5, 5), "end": date(2027, 5, 6), "kind": "Challenge", "title": "Second innovation challenge",
     "where": "Location TBD · hybrid", "mode": "Hybrid", "audience": "Federal & non-federal teams",
     "program": "innovation", "photo": "workshop.jpg",
     "time": "Two days · 9:00 AM local", "host": "Innovation challenge desk", "going": 66, "interest": "Exchange",
     "attendees": ["Federal", "Startup", "State"],
     "blurb": "Prototypes enter the backlog as candidates for later disposition."},
    {"date": date(2027, 5, 13), "kind": "Fellows", "title": "Pathway fellow studio",
     "where": "Virtual", "mode": "Virtual", "audience": "Pathway fellows & agency indicators",
     "program": "edoh",
     "time": "2:00–4:00 PM MT", "host": "Pathway fellows lead", "going": 16, "interest": "Exchange",
     "attendees": ["Fellow", "Agency"],
     "blurb": "Ranked pathway drafts before the June determinants convening."},
    {"date": date(2027, 5, 19), "kind": "Exchange", "title": "Nevada permitting exchange",
     "where": "Nevada monthly interagency call", "mode": "Virtual", "audience": "Federal, state, Tribal, applicant seats",
     "program": "accelerator",
     "time": "10:00–11:30 AM PT", "host": "BLM Nevada · exchange desk", "going": 51, "interest": "Exchange",
     "attendees": ["BLM", "State", "Tribal", "Applicant"],
     "blurb": "Seventh session."},
    {"date": date(2027, 5, 26), "kind": "Working group", "title": "Energy determinants working group",
     "where": "Interagency, virtual", "mode": "Virtual", "audience": "Health & workforce agencies",
     "program": "edoh",
     "time": "1:00–2:30 PM ET", "host": "Pathway fellows · exchange", "going": 19, "interest": "Exchange",
     "attendees": ["IHS", "VA", "Fellow"],
     "blurb": "Fifth pathway test."},
    # June 2027
    {"date": date(2027, 6, 8), "end": date(2027, 6, 10), "kind": "Convening", "title": "Annual in-person exchange",
     "where": "Reno, NV", "mode": "In person", "audience": "Federal, state, Tribal, applicants",
     "program": "accelerator", "featured": True, "photo": "gathering.jpg",
     "time": "Three days · 8:30 AM PT", "host": "GPIC Collaborative", "going": 124, "interest": "Exchange",
     "attendees": ["BLM", "State", "Tribal", "Applicant"],
     "blurb": "Three days. The room that makes the rest of the year make sense."},
    {"date": date(2027, 6, 22), "end": date(2027, 6, 23), "kind": "Convening", "title": "Energy determinants convening",
     "where": "Boise, ID · hybrid", "mode": "Hybrid", "audience": "Community, Tribal, health, workforce",
     "program": "edoh", "featured": True, "photo": "steam.jpg",
     "time": "Two days · 9:00 AM MT", "host": "Pathway convening desk", "going": 58, "interest": "Exchange",
     "attendees": ["Community", "Tribal", "HHS", "DOL"],
     "blurb": "Structured around the ranked pathways from the working group."},
    # July 2027
    {"date": date(2027, 7, 6), "end": date(2027, 9, 3), "kind": "Training", "title": "State regulatory staff cohort",
     "where": "Cohort · virtual modules", "mode": "Virtual", "audience": "State regulatory & energy-office staff",
     "program": "training",
     "time": "Cohort window · modules weekly", "host": "Training · state desk", "going": 38, "interest": "Training",
     "attendees": ["Regulator", "Energy office", "Mentor"],
     "blurb": "Reuses the Collaborative curriculum."},
    {"date": date(2027, 7, 14), "kind": "Office hours", "title": "State cohort office hours",
     "where": "Virtual", "mode": "Virtual", "audience": "State cohort participants",
     "program": "training",
     "time": "12:00–1:00 PM MT", "host": "Training · state desk", "going": 21, "interest": "State",
     "attendees": ["Cohort", "Mentor"],
     "blurb": "Clinic on model frameworks and lead-agency designation."},
    {"date": date(2027, 7, 21), "kind": "Exchange", "title": "Nevada permitting exchange",
     "where": "Nevada monthly interagency call", "mode": "Virtual", "audience": "Federal, state, Tribal, applicant seats",
     "program": "accelerator",
     "time": "10:00–11:30 AM PT", "host": "BLM Nevada · exchange desk", "going": 53, "interest": "Exchange",
     "attendees": ["BLM", "State", "Tribal", "Applicant"],
     "blurb": "Eighth session."},
    {"date": date(2027, 7, 28), "kind": "Working group", "title": "Energy determinants working group",
     "where": "Interagency, virtual", "mode": "Virtual", "audience": "Health & workforce agencies",
     "program": "edoh",
     "time": "1:00–2:30 PM ET", "host": "Pathway fellows · exchange", "going": 18, "interest": "Exchange",
     "attendees": ["HHS", "DOL", "Fellow"],
     "blurb": "Sixth and last. No pathway advances on a fellow's characterization alone."},
    # August 2027
    {"date": date(2027, 8, 4), "end": date(2027, 8, 5), "kind": "Challenge", "title": "State co-hosted innovation challenge",
     "where": "Co-hosted with a partner state", "mode": "Hybrid", "audience": "State agency + outside teams",
     "program": "innovation", "featured": True, "photo": "field.jpg",
     "feat": "State co-hosted challenge",
     "time": "Two days · 9:00 AM local", "host": "Partner state · innovation desk", "going": 72, "interest": "State",
     "attendees": ["State", "Startup", "Federal"],
     "blurb": "Third of three. At least one Year 1 event co-hosted with a state agency."},
    {"date": date(2027, 8, 11), "kind": "Fellows", "title": "Year 2 placement design session",
     "where": "Virtual", "mode": "Virtual", "audience": "Potential host agencies & fellows",
     "program": "support-team",
     "time": "1:00–3:00 PM MT", "host": "Support team · fellows", "going": 27, "interest": "Exchange",
     "attendees": ["Host", "Fellow", "HR"],
     "blurb": "Host commitments, supervision, and appointment vehicles before Year 2 rollout."},
    {"date": date(2027, 8, 18), "end": date(2027, 8, 19), "kind": "Convening", "title": "Tribal Government convening",
     "where": "Alongside BIA Federal Partners meeting", "mode": "Hybrid", "audience": "Tribal Governments & partners",
     "program": "accelerator", "photo": "sinter.jpg",
     "time": "Two days · morning start", "host": "Tribal Government co-hosts", "going": 55, "interest": "Tribal",
     "attendees": ["Tribal Gov", "BIA", "Partner"],
     "blurb": "Second of two. Held alongside an existing venue."},
    # September 2027
    {"date": date(2027, 9, 8), "end": date(2027, 9, 9), "kind": "Research", "title": "Permitting research meeting",
     "where": "Golden, CO · hybrid", "mode": "Hybrid", "audience": "Practitioners, labs, fellows",
     "program": "research", "featured": True, "photo": "documents.jpg",
     "feat": "Permitting research meeting",
     "time": "Two days · 9:00 AM MT", "host": "Research meeting desk", "going": 61, "interest": "Exchange",
     "attendees": ["Practitioner", "Lab", "Fellow"],
     "blurb": "Observed durations practitioners can use in handbooks, curriculum, and TA."},
    {"date": date(2027, 9, 15), "end": date(2027, 9, 16), "kind": "Regional", "title": "Cascades regional session",
     "where": "Geothermal-active state · host TBD", "mode": "Hybrid", "audience": "Regional field offices & states",
     "program": "accelerator",
     "time": "Two days · 8:30 AM local", "host": "Regional host office", "going": 57, "interest": "Federal",
     "attendees": ["Field", "State", "BLM"],
     "blurb": "Second of two regional sessions."},
    {"date": date(2027, 9, 22), "kind": "Office hours", "title": "Year 1 wrap office hours",
     "where": "Virtual", "mode": "Virtual", "audience": "All participants",
     "program": "operations",
     "time": "12:00–1:30 PM MT", "host": "Program operations", "going": 33, "interest": "Exchange",
     "attendees": ["Federal", "State", "Tribal", "Applicant"],
     "blurb": "What carried, what rolls into Year 2, and how to stay on the membership map."},
]

def _fill_event_defaults():
    """Ensure Meetup fields exist on every event."""
    host_by = {
        "accelerator": "Accelerator desk",
        "training": "Training cohort desk",
        "fellows": "Fellows lead",
        "innovation": "Innovation Exchange desk",
        "research": "Research desk",
        "operations": "Program operations",
        "support-team": "Support team",
        "evidence": "Evidence & diffusion",
        "edoh": "EDoH fellow lead",
    }
    time_by_kind = {
        "Office hours": "12:00–1:00 PM MT",
        "Workshop": "9:00 AM–12:00 PM local",
        "Exchange": "10:00–11:30 AM PT",
        "Fellows": "1:00–3:00 PM MT",
        "Working group": "1:00–2:30 PM ET",
        "Challenge": "Two days · 9:00 AM local",
        "Convening": "Two days · 9:00 AM local",
        "Regional": "Two days · 8:30 AM local",
        "Training": "Cohort window · modules weekly",
        "Research": "Two days · 9:00 AM MT",
    }
    interest_by = {
        "accelerator": "State",
        "training": "Training",
        "fellows": "Exchange",
        "innovation": "Exchange",
        "research": "Exchange",
        "operations": "Exchange",
        "support-team": "Exchange",
        "evidence": "Exchange",
        "edoh": "Exchange",
    }
    for i, ev in enumerate(EVENTS):
        aud = (ev.get("audience") or "").lower()
        if "going" not in ev:
            base = 12 + (i * 7) % 40
            if ev.get("featured"):
                base += 28
            if ev.get("kind") in ("Challenge", "Convening", "Regional"):
                base += 20
            ev["going"] = base
        if "host" not in ev:
            ev["host"] = host_by.get(ev["program"], "GPIC Collaborative")
        if "time" not in ev:
            ev["time"] = time_by_kind.get(ev.get("kind"), "1:00–2:00 PM MT")
        if "interest" not in ev:
            if "applicant" in aud or "developer" in aud:
                ev["interest"] = "Applicant"
            elif "tribal" in aud and ev["program"] == "training":
                ev["interest"] = "Tribal"
            else:
                ev["interest"] = interest_by.get(ev["program"], "Exchange")
        if "attendees" not in ev:
            chips = {
                "Federal": ["BLM", "Field", "NEPA"],
                "State": ["Energy office", "Regulator", "NASEO"],
                "Tribal": ["Tribal env", "Cultural", "Partner"],
                "Applicant": ["Developer", "Counsel", "State"],
                "Exchange": ["BLM", "State", "Tribal", "Applicant"],
                "Training": ["Cohort", "Mentor", "Lab"],
            }
            ev["attendees"] = chips.get(ev["interest"], ["Member", "Host"])[:4]
        if "photo" not in ev:
            ev["photo"] = "gathering.jpg"

_fill_event_defaults()

PROGRAMS = [
    {
        "slug": "support-team",
        "kicker": "Program",
        "title": "Permitting Support Team",
        "lede": "Fellows and scholars placed inside host agencies, adding geothermal review capacity where the work already runs.",
        "card": "Host commitments first. Placements inside agencies under host supervision.",
        "photo": "gathering.jpg",
        "primary": True,
        "related": ["accelerator", "fellows", "innovation"],
        "resource": "federal",
        "sections": [
            ("Who", [
                "Host agencies that need geothermal capacity inside a review, and fellows who work under that agency's supervision.",
            ]),
            ("What", [
                "Year 1 locks the team model and signed host commitments. Year 2 runs the cohort. Design covers which agencies host, what fellows and scholars do while placed there, which appointment vehicle applies, and what the host provides.",
            ]),
            ("Success", [
                "Written host commitments covering placement, supervision, workspace, and return arrangements, plus a costed Year 2 rollout: cohort size, recruitment timeline, and placement sequence.",
            ]),
            ("Participation", [
                "Agencies that can host a fellow in Year 2 join Year 1 design. The Intergovernmental fellow holds the design. Placements are announced after the host has signed.",
            ]),
        ],
    },
    {
        "slug": "accelerator",
        "kicker": "Program",
        "title": "Intergovernmental Geothermal Accelerator",
        "lede": "A NASEO-style cohort for governments that share geothermal permitting work: peer learning, technical assistance, and capacity that travels across agencies.",
        "card": "State and intergovernmental cohorts. Peer learning, technical assistance, and shared permitting playbooks.",
        "photo": "field.jpg",
        "primary": True,
        "related": ["support-team", "innovation", "training"],
        "resource": "state",
        "sections": [
            ("Who", [
                "State energy offices, geothermal regulators, federal field partners, Tribal environmental offices, and Governors' staff building geothermal permitting capacity together.",
            ]),
            ("What", [
                "Modeled on NASEO accelerator practice: multi-jurisdiction cohorts, strategy sessions with federal and industry experts, peer problem-solving, and technical assistance that states and partners put to work.",
                "Year 1 delivers federal products into state roadmaps, regulatory program support, partner-state selection with Governor-level commitment, monthly Nevada interagency exchange, regional sessions, and Tribal convenings co-designed with participating Tribal Governments.",
            ]),
            ("Cohort pattern", [
                "Participating offices join a structured cohort. Sessions cover permitting barriers, policy levers, and deployment tactics. Peers compare approaches. Experts and labs supply analysis. Each office leaves with actions scoped to its authority.",
            ]),
            ("Capacity delivered", [
                "RAPID, PermitAI and NEPATEC, and laboratory timelines completed into federal portions of state permitting roadmaps for requesting states.",
                "Direct support standing up or adapting geothermal regulatory programs: model frameworks, ownership and regulatory alignment, lead-agency designation, and the UIC Class V primacy pathway with the Groundwater Protection Council.",
                "A shortlist of partner states with Governor-level commitment to advance geothermal through policy, permitting, procurement, and partnership.",
            ]),
            ("Rooms that run", [
                "At least eight Nevada monthly interagency exchange sessions with documented participation from BLM, one state agency, and one Tribal-facing office.",
                "One multi-day in-person exchange. Two regional sessions in geothermal-active states, at least one hosted by a BLM state or district office.",
                "Two Tribal convenings held alongside existing venues. Consultation authority remains with the responsible federal agency.",
            ]),
            ("Success", [
                "Partner states named, roadmaps in use, cohort offices shipping concrete permitting actions, and the monthly exchange spine filled with the right seats.",
            ]),
        ],
    },
    {
        "slug": "innovation",
        "kicker": "Program",
        "title": "Permitting Innovation Exchange",
        "lede": "Hackathons, shark tanks, and challenge events where industry, government, and applicants solve live permitting problems together.",
        "card": "Three challenge events. Outside teams welcome. One state co-host. Demos enter the backlog.",
        "photo": "workshop.jpg",
        "primary": True,
        "related": ["accelerator", "support-team", "research"],
        "resource": None,
        "sections": [
            ("Who", [
                "Federal and non-federal teams working under published problem statements. Industry builders, agency staff, applicants, and labs in the same room.",
            ]),
            ("What", [
                "Three Year 1 events built from coordination-backlog problem statements. Judging criteria and data-access arrangements are settled before each event. Selected prototypes enter the backlog as candidate requirements.",
            ]),
            ("Event shape", [
                "Hackathon sprints, shark-tank pitches, and structured judging. At least one non-federal team participates during the year. At least one event is co-hosted with a state agency.",
            ]),
            ("Success", [
                "Problem statements published on time, teams demoed under those statements, and outputs dispositioned with NLR into the backlog.",
            ]),
        ],
    },
    {
        "slug": "edoh",
        "kicker": "Program",
        "title": "Energy Determinants of Health",
        "lede": "How energy conditions shape health and workforce outcomes in geothermal communities, and how GPIC turns those links into work agencies can use.",
        "card": "Pathway inventory, interagency working group, and a Year 1 convening that advances the strongest energy-to-health links.",
        "photo": "steam.jpg",
        "primary": False,
        "spotlight": True,
        "related": ["fellows", "accelerator", "research"],
        "resource": None,
        "sections": [
            ("Who", [
                "Health, workforce, and energy agencies (including HHS, IHS, VA, and DOL seats); Tribal Governments and community participants; and permitting practitioners whose decisions change local heat, power, and jobs.",
            ]),
            ("What", [
                "A shared pathway map that links geothermal and related energy conditions to health and workforce outcomes, tested in an interagency working group and advanced at a Year 1 convening.",
            ]),
            ("The idea", [
                "Energy Determinants of Health names the ways energy conditions shape health. Safe and affordable heat and power, reliable service for people who depend on medical equipment, cleaner indoor environments, and stable energy-sector jobs all sit on that map.",
                "In GPIC's geothermal permitting context, EDoH is a practical program: document those links, rank them by evidence, and put them in front of the agencies that already hold related indicators so permitting decisions account for health and workforce consequences.",
            ]),
            ("Why it matters", [
                "Households that cannot keep homes safe and warm carry higher respiratory and cardiovascular strain. Outages hit medically vulnerable people first. Production and heating choices change local exposures. Energy jobs change household income and community stability.",
                "Geothermal projects alter heat, power, and workforce conditions where they land. When permitting rooms treat those effects as afterthoughts, health and workforce agencies work from incomplete pictures. EDoH closes that gap with a shared language and a ranked inventory.",
            ]),
            ("Pathways", [
                "Four pathways sit under one structure: affordability and thermal conditions; reliability for medically vulnerable populations; exposures from production and heating; and energy-sector employment as a mediated pathway.",
                "Each inventory entry names the energy condition, the affected population or workforce, the downstream mechanism, an existing indicator held by another agency, and the evidentiary maturity of the link.",
            ]),
            ("Work products and activities", [
                "A ranked pathway inventory agencies confirm they can use in their own programs.",
                "Six working-group sessions that pressure-test entries against agency-owned indicators.",
                "Briefs and session materials that travel into Accelerator rooms, research cases, and technical assistance.",
                "A Year 1 convening with community, Tribal, health-agency, and workforce participation, structured around the strongest pathways and the handoff into Year 2.",
            ]),
            ("Inside GPIC", [
                "Research supplies observed practice and evidence maturity for pathway entries. Fellows help staff the map, working group, and convening. The Accelerator and Innovation Exchange carry usable findings to state, Tribal, and federal partners. Permitting Support Team placements put capacity inside host agencies when Year 2 rolls.",
                "The outcome GPIC cares about is clearer permitting work that accounts for how energy conditions land on community health and workforce.",
            ]),
            ("Fellow leadership", [
                "An Energy Determinants Fellow helps lead the pathway map, working group, and convening. Agency seats stay with the agency that owns each indicator.",
            ]),
            ("Success", [
                "A ranked pathway inventory agencies confirm they can use, six working-group sessions on the calendar, and a convening that advances the strongest pathways into Year 2.",
            ]),
        ],
    },
    {
        "slug": "operations",
        "kicker": "Operations",
        "title": "Program operations",
        "lede": "The room that holds the Collaborative together: charter, membership, public site, and how we know the work landed.",
        "card": "Charter, membership, shared workspace, and measurement: the operating spine.",
        "photo": "basin.jpg",
        "related": ["accelerator", "fellows", "support-team"],
        "resource": None,
        "sections": [
            ("Who", [
                "Program staff, the Intergovernmental fellow, and every organization that sits at the table.",
            ]),
            ("What", [
                "Adopt a charter, map membership, keep the public site and shared workspace current, and measure participation against the capabilities each workstream advances.",
            ]),
            ("Success", [
                "A living membership map, a site people actually use, and outcome measures that trace back to real permitting capacity.",
            ]),
        ],
    },
    {
        "slug": "training",
        "kicker": "Training",
        "title": "Training",
        "lede": "One curriculum for federal, Tribal, and state staff, plus applicant readiness and published templates.",
        "card": "Same course across governments. Templates that point to RAPID and BLM.",
        "photo": "classroom.jpg",
        "related": ["accelerator", "support-team", "innovation"],
        "resource": "federal",
        "sections": [
            ("Who", [
                "Federal permitting staff, Tribal environmental offices, state regulatory and energy-office staff, and project proponents without in-house permitting counsel.",
            ]),
            ("What", [
                "Year 1 establishes a common curriculum for the tools staff are required to use. A federal cohort and a Tribal environmental-offices cohort run first. A later window covers state regulatory staff.",
            ]),
            ("Success", [
                "Cohorts completed, applicant readiness delivered to at least eight proponents, and checklists posted to the applicant resources library.",
            ]),
        ],
    },
    {
        "slug": "evidence",
        "kicker": "Evidence",
        "title": "Evidence & diffusion",
        "lede": "Turn lab research and practitioner cases into briefs and sessions people can use on the job.",
        "card": "Practitioner voices, lab synthesis, and briefs that move into the room.",
        "photo": "sinter.jpg",
        "related": ["research", "accelerator", "training"],
        "resource": None,
        "sections": [
            ("Who", [
                "Practitioners who sit for interviews, lab researchers who synthesize findings, and session facilitators who carry the story into the room.",
            ]),
            ("What", [
                "Recruit practitioners into applied research, synthesize lab evidence, and translate both into briefs, training cases, and Collaborative sessions.",
            ]),
            ("Success", [
                "Findings show up in handbooks, curriculum, and Accelerator sessions.",
            ]),
        ],
    },
    {
        "slug": "research",
        "kicker": "Research",
        "title": "Research",
        "lede": "Multi-perspective case studies that replace assumed timelines with observed practice.",
        "card": "Observed durations practitioners can use across cases.",
        "photo": "maps.jpg",
        "related": ["innovation", "fellows", "accelerator"],
        "resource": None,
        "sections": [
            ("Who", [
                "Practitioners who sit for interviews and comment on drafts. Laboratories and fellows who convert those cases into timelines, curriculum, and technical assistance.",
            ]),
            ("What", [
                "Four to six multi-perspective case studies from initial development activity through agency reviews and decisions. PNNL holds the research. The Applied Permitting Research fellow holds the agenda.",
            ]),
            ("Success", [
                "Observed durations practitioners can use in handbooks, curriculum, and technical assistance, reacted to in at least two sessions before finalization.",
            ]),
        ],
    },
    {
        "slug": "fellows",
        "kicker": "Fellows",
        "title": "Fellows",
        "lede": "People embedded in the work: research agenda, Energy Determinants of Health, and the convening spine.",
        "card": "Research and EDoH fellows who keep the pathway and research rooms moving.",
        "photo": "documents.jpg",
        "related": ["edoh", "research", "support-team"],
        "resource": None,
        "sections": [
            ("Who", [
                "The fellows, the practitioners they interview, and the agencies that sit on the working groups. Host agencies for Year 2 placements work through the Permitting Support Team.",
            ]),
            ("Applied Permitting Research Fellow", [
                "Research agenda, case selection, practitioner interviews, cross-lab inventory, the annual research meeting, and transfer of findings into requirements.",
            ]),
            ("Energy Determinants Fellow", [
                "Helps lead Energy Determinants of Health: pathway map, working group, and convening. Program detail lives on the EDoH page.",
            ]),
            ("Across the portfolio", [
                "A Permitting Systems fellow holds requirements, acceptance criteria, interoperability, and performance measures.",
                "An Intergovernmental Permitting fellow holds access pathfinding, the source registry, jurisdictional overlap, and convening. That fellow also runs Collaborative sessions.",
            ]),
            ("Participation", [
                "Working-group seats are for the agency that holds the indicator. Research interviews are scheduled with practitioners in the membership. Placement design for Year 2 is the Permitting Support Team.",
            ]),
        ],
    },
]

INNOVATION_SITS = [
    {
        "id": "open-lab",
        "kicker": "Event 1 · February 3–4, 2027",
        "title": "Permitting innovation challenge",
        "photo": "workshop.jpg",
        "lede": "Hackathon sprint on problem statements drawn from the coordination backlog.",
        "body": "Judging criteria and data-access arrangements are required. Federal and non-federal teams work the same published statements.",
    },
    {
        "id": "outside",
        "kicker": "Event 2 · May 5–6, 2027",
        "title": "Shark tank challenge",
        "photo": "gathering.jpg",
        "lede": "Industry, government, and applicant teams pitch solutions under live judging.",
        "body": "At least one non-federal team participates. Selected demos enter the backlog as candidate requirements.",
    },
    {
        "id": "state-host",
        "kicker": "Event 3 · August 4–5, 2027",
        "title": "State co-hosted challenge",
        "photo": "field.jpg",
        "lede": "A partner state co-hosts the third Year 1 event.",
        "body": "State agencies that intend to co-host notify the Collaborative before the third event is sited.",
    },
]

RESOURCE_HUBS = [
    {
        "slug": "federal",
        "kicker": "Federal",
        "title": "Federal resources",
        "lede": "Guides, templates, and playbooks for people who run federal geothermal reviews, plus published agency sources.",
        "card": "Field handbooks, CX packets, open training modules, and BLM-facing templates.",
        "photo": "maps.jpg",
        "intro": [
            "BLM remains the design partner on materials written for adoption. BLM guidance remains the authority. This library holds published sources next to Collaborative drafts as they land.",
        ],
        "groups": [
            ("Guides & playbooks", [
                {"name": "BLM geothermal energy program page", "url": "https://www.blm.gov/programs/energy-and-minerals/renewable-energy/geothermal-energy",
                 "note": "Official leasing and development entry point on public lands.", "type": "Guide", "updated": "Live", "status": "now"},
                {"name": "Geothermal leasing handbook (draft)", "url": None,
                 "note": "Volume 1 of 5. Field-ready steps from nomination through lease issuance.", "type": "Playbook", "updated": "Aug 2026", "status": "draft"},
                {"name": "Exploration & drilling handbook (draft)", "url": None,
                 "note": "NOI through well field development. Cross-walks to RAPID.", "type": "Playbook", "updated": "Sep 2026", "status": "draft"},
                {"name": "Categorical exclusion substantiation packet", "url": None,
                 "note": "Written to Federal Register standards. BLM decides on any proposal.", "type": "Guide", "updated": "Jul 2026", "status": "draft"},
            ]),
            ("Templates", [
                {"name": "Lease file review checklist", "url": None,
                 "note": "One-pager for district reviewers. Points to eCFR Part 3200.", "type": "Template", "updated": "Sep 2026", "status": "now"},
                {"name": "NOI completeness worksheet", "url": None,
                 "note": "Applicant-facing fields a field office can share under existing process.", "type": "Template", "updated": "Aug 2026", "status": "now"},
                {"name": "OpenEI RAPID geothermal toolkit", "url": "https://openei.org/wiki/RAPID/Geothermal",
                 "note": "Published regulatory reference. Collaborative templates cross-reference RAPID.", "type": "Guide", "updated": "Live", "status": "now"},
                {"name": "eCFR Title 43, geothermal resources", "url": "https://www.ecfr.gov/current/title-43/subtitle-B/chapter-II/subchapter-C/part-3200",
                 "note": "Codified leasing and operations rules.", "type": "Guide", "updated": "Live", "status": "now"},
            ]),
            ("Training modules", [
                {"name": "Field training module index", "url": None,
                 "note": "Leasing, exploration, well field, utilization: updated as handbooks finalize.", "type": "Playbook", "updated": "Sep 2026", "status": "draft"},
                {"name": "Rulemaking analysis & options brief", "url": None,
                 "note": "Administrative burden and clarity. Analysis only; BLM drafts regulatory text.", "type": "Guide", "updated": "Jun 2026", "status": "draft"},
            ]),
        ],
    },
    {
        "slug": "state",
        "kicker": "State and local",
        "title": "State and local resources",
        "lede": "Roadmap kits, model frameworks, and training for state energy offices, regulators, and local governments.",
        "card": "Roadmap kits, UIC primacy playbooks, and partner-state materials.",
        "photo": "field.jpg",
        "intro": [
            "NASEO convenes. Laboratories analyze. Requesting states receive federal products translated into a roadmap.",
        ],
        "groups": [
            ("Guides & playbooks", [
                {"name": "NASEO first-movers overview", "url": "https://www.naseo.org/",
                 "note": "State energy office association and partner-state selection model.", "type": "Guide", "updated": "Live", "status": "now"},
                {"name": "State geothermal roadmap starter kit", "url": None,
                 "note": "How to pull RAPID, PermitAI/NEPATEC, and lab timelines into a state roadmap.", "type": "Playbook", "updated": "Sep 2026", "status": "now"},
                {"name": "Model regulatory framework outline", "url": None,
                 "note": "Ownership alignment, lead-agency designation, and program stand-up steps.", "type": "Playbook", "updated": "Aug 2026", "status": "draft"},
                {"name": "UIC Class V primacy pathway brief", "url": None,
                 "note": "Worked with the Groundwater Protection Council for geothermal Class V wells.", "type": "Guide", "updated": "Jul 2026", "status": "draft"},
            ]),
            ("Templates", [
                {"name": "Partner-state commitment worksheet", "url": None,
                 "note": "Governor-level policy, permitting, procurement, and partnership checklist.", "type": "Template", "updated": "Sep 2026", "status": "now"},
                {"name": "Local government permitting liaison sheet", "url": None,
                 "note": "One-pager for counties and cities sitting in exchange sessions.", "type": "Template", "updated": "Aug 2026", "status": "now"},
                {"name": "EPA underground injection control", "url": "https://www.epa.gov/uic",
                 "note": "Class V wells reference for primacy conversations.", "type": "Guide", "updated": "Live", "status": "now"},
                {"name": "Groundwater Protection Council", "url": "https://www.gwpc.org/",
                 "note": "State UIC and groundwater programs.", "type": "Guide", "updated": "Live", "status": "now"},
            ]),
            ("Analyses & training", [
                {"name": "Interconnection & surface resource briefing template", "url": None,
                 "note": "Scoped analysis outline for partner states ready to act.", "type": "Template", "updated": "Jun 2026", "status": "draft"},
                {"name": "State regulatory staff training syllabus", "url": None,
                 "note": "Same Collaborative curriculum as federal cohorts.", "type": "Playbook", "updated": "Sep 2026", "status": "draft"},
            ]),
        ],
    },
    {
        "slug": "tribal",
        "kicker": "Tribal Governments",
        "title": "Tribal resources",
        "lede": "Session packs, training, and coordination materials. Coordination only; consultation stays with the responsible agency.",
        "card": "Convening packs, cohort materials, and a clear consultation boundary.",
        "photo": "sinter.jpg",
        "intro": [
            "Consultation authority remains with the responsible federal agency.",
        ],
        "groups": [
            ("Guides & playbooks", [
                {"name": "DOE Office of Indian Energy", "url": "https://www.energy.gov/indianenergy",
                 "note": "Co-design partner on the two Tribal convenings.", "type": "Guide", "updated": "Live", "status": "now"},
                {"name": "Tribal convening design pack", "url": None,
                 "note": "Agenda scaffolds, facilitator notes, and post-session posting checklist.", "type": "Playbook", "updated": "Sep 2026", "status": "now"},
                {"name": "ICEIWG working group page", "url": "https://www.energy.gov/indianenergy/indian-country-energy-and-infrastructure-working-group",
                 "note": "Existing venue the convenings sit alongside.", "type": "Guide", "updated": "Live", "status": "now"},
                {"name": "Consultation boundary one-pager", "url": None,
                 "note": "What Collaborative sessions cover, and where consultation stays. Share with every invite.", "type": "Guide", "updated": "Aug 2026", "status": "now"},
            ]),
            ("Templates & training", [
                {"name": "Tribal environmental office cohort syllabus", "url": None,
                 "note": "Same modules as the federal cohort, scheduled for Tribal offices.", "type": "Playbook", "updated": "Sep 2026", "status": "draft"},
                {"name": "Session priority intake form", "url": None,
                 "note": "Capture stated geothermal and permitting priorities before each convening.", "type": "Template", "updated": "Jul 2026", "status": "now"},
                {"name": "Post-session materials index", "url": None,
                 "note": "Where slides, notes, and action items land after each Tribal session.", "type": "Template", "updated": "Aug 2026", "status": "draft"},
            ]),
        ],
    },
    {
        "slug": "applicants",
        "kicker": "Applicants",
        "title": "Applicant resources",
        "lede": "Readiness checklists, submission templates, and office-hours notes. Assistance is readiness support.",
        "card": "Checklists, RAPID cross-walks, and readiness support for lean teams.",
        "photo": "documents.jpg",
        "intro": [
            "Direct assistance prioritizes developers without in-house permitting counsel. Assistance is readiness support.",
        ],
        "groups": [
            ("Guides & playbooks", [
                {"name": "Pre-application readiness guide", "url": None,
                 "note": "What to have ready before a federal or state conversation under existing process.", "type": "Guide", "updated": "Sep 2026", "status": "now"},
                {"name": "OpenEI RAPID geothermal toolkit", "url": "https://openei.org/wiki/RAPID/Geothermal",
                 "note": "Published process. Templates point here.", "type": "Guide", "updated": "Live", "status": "now"},
                {"name": "BLM geothermal energy", "url": "https://www.blm.gov/programs/energy-and-minerals/renewable-energy/geothermal-energy",
                 "note": "Leasing and development on public lands.", "type": "Guide", "updated": "Live", "status": "now"},
                {"name": "Applicant exchange playbook", "url": None,
                 "note": "How local government and developer seats work in the monthly exchange.", "type": "Playbook", "updated": "Aug 2026", "status": "now"},
            ]),
            ("Templates", [
                {"name": "Submission completeness checklist", "url": None,
                 "note": "Cross-referenced to RAPID and BLM guidance.", "type": "Template", "updated": "Sep 2026", "status": "now"},
                {"name": "Agency contact worksheet", "url": None,
                 "note": "Track lead agency, cooperating agencies, and Tribal contacts for a proposal.", "type": "Template", "updated": "Aug 2026", "status": "now"},
                {"name": "Office-hours request form", "url": None,
                 "note": "Book a readiness slot. Assistance is readiness support.", "type": "Template", "updated": "Sep 2026", "status": "now"},
                {"name": "Process guidance packet (draft)", "url": None,
                 "note": "Narrative steps with RAPID/BLM citations for lean applicant teams.", "type": "Playbook", "updated": "Jul 2026", "status": "draft"},
            ]),
        ],
    },
]



def quarter_of(d):
    if d < date(2027, 1, 1):
        return ("Q1", "October–December 2026")
    if d < date(2027, 4, 1):
        return ("Q2", "January–March 2027")
    if d < date(2027, 7, 1):
        return ("Q3", "April–June 2027")
    return ("Q4", "July–September 2027")


def fmt_range(ev):
    start = ev["date"]
    end = ev.get("end")
    if not end or end == start:
        return start.strftime("%-d %B %Y")
    if start.month == end.month:
        return f"{start.day}–{end.strftime('%-d %B %Y')}"
    if start.year == end.year:
        return f"{start.strftime('%-d %B')} – {end.strftime('%-d %B %Y')}"
    return f"{start.strftime('%-d %B %Y')} – {end.strftime('%-d %B %Y')}"


def nav(active, depth):
    p = "../" * depth
    def item(href, label, key):
        cur = ' aria-current="page"' if active == key else ""
        return f'        <a href="{p}{href}"{cur}>{label}</a>'
    prog_keys = {"programs", "support-team", "accelerator", "innovation", "edoh", "fellows"}
    prog_page = active in prog_keys or active == "programs"
    if active == "programs":
        prog_cur = ' aria-current="page"'
    elif active in prog_keys:
        prog_cur = ' aria-current="true"'
    else:
        prog_cur = ""
    prog_links = []
    for slug, label in (
        ("support-team", "Permitting Support Team"),
        ("accelerator", "Geothermal Accelerator"),
        ("innovation", "Innovation Exchange"),
        ("edoh", "Energy Determinants of Health"),
    ):
        cur = ' aria-current="page"' if active == slug else ""
        prog_links.append(f'          <li><a href="{p}{slug}/"{cur}>{label}</a></li>')
    res_page = active == "resources"
    res_sub = isinstance(active, str) and active.startswith("resources/")
    if res_page:
        res_cur = ' aria-current="page"'
    elif res_sub:
        res_cur = ' aria-current="true"'
    else:
        res_cur = ""
    res_links = []
    for slug, label in (
        ("federal", "Federal"),
        ("state", "State and local"),
        ("tribal", "Tribal"),
        ("applicants", "Applicant"),
    ):
        key = f"resources/{slug}"
        cur = ' aria-current="page"' if active == key else ""
        res_links.append(f'          <li><a href="{p}resources/{slug}/"{cur}>{label}</a></li>')
    return "\n".join([
        '      <nav aria-label="Site">',
        f'        <div class="nav-drop">',
        f'          <a href="{p}programs/"{prog_cur} aria-haspopup="true">Programs</a>',
        '          <ul>',
        *prog_links,
        '          </ul>',
        '        </div>',
        item("events/", "Events", "events"),
        f'        <div class="nav-drop">',
        f'          <a href="{p}resources/"{res_cur} aria-haspopup="true">Resources</a>',
        '          <ul>',
        *res_links,
        '          </ul>',
        '        </div>',
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


def page(*, title, eyebrow, heading, lede, body, active, footer, depth, show_rule=False, home=False, compact=False, about=False, actions="", wrap_body=True, photo=None, hero_mosaic=False):
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
    photo_el = f'    <div class="mast-photo" style="background-image:url(\'{p}images/{photo}\')" aria-hidden="true"></div>\n' if photo else ""
    atmos = hero_atmos_html(depth) if hero_mosaic else ""
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>{title}</title>
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
        <span class="brand-name">Geothermal Permitting Innovation <i>Collaborative</i></span>
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
    <p>{footer}</p>
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
  document.querySelectorAll('[data-interest-filter]').forEach(function(bar){{
    var tabs = bar.querySelectorAll('.interest-tab');
    var scope = bar.parentElement || document;
    var list = scope.querySelector('[data-meetup-list]') || document.querySelector('[data-meetup-list]');
    if (!list) return;
    tabs.forEach(function(tab){{
      tab.addEventListener('click', function(){{
        var filter = tab.getAttribute('data-filter') || 'all';
        tabs.forEach(function(t){{
          var on = t === tab;
          t.classList.toggle('is-active', on);
          t.setAttribute('aria-pressed', on ? 'true' : 'false');
        }});
        list.querySelectorAll('.meetup-card').forEach(function(card){{
          var interest = card.getAttribute('data-interest') || '';
          var show = filter === 'all' || interest === filter;
          card.hidden = !show;
        }});
      }});
    }});
  }});
}})();
</script>
</body>
</html>
"""


def about_body(depth):
    p = "../" * depth
    roster = "\n".join(
        f"        <li>{name}</li>"
        for name in (
            "BLM geothermal specialists in field and state offices",
            "State energy office leads and geothermal regulators",
            "County and municipal permitting liaisons",
            "Tribal environmental and cultural resource staff",
            "Applicant teams without in-house counsel",
            "NASEO state energy coordinators",
            "National laboratory analysts and curriculum authors",
            "Office of Indian Energy program officers",
            "HHS, IHS, VA, and DOL pathway contacts",
            "Year 1 research and pathway fellows",
        )
    )
    return (
        f'  <div class="folio">\n'
        f'    <article class="dek">\n'
        f'      <h2>Purpose</h2>\n'
        f'      <p>The Geothermal Permitting Innovation Collaborative is the shared room for people who already work geothermal permitting: federal, state, Tribal, and applicant. We use existing meetings.</p>\n'
        f'      <p>Year 1 is a charter, a membership map, this site, session materials, and a shared workspace. Participation is measured by what capacity it advances.</p>\n'
        f'    </article>\n'
        f'    <article class="join-block" id="join" data-reveal>\n'
        f'      <p class="guide-kicker">Membership</p>\n'
        f'      <h2>How to participate</h2>\n'
        f'      <p class="program-note">There is no dues schedule. You join by showing up in a role the Collaborative already uses.</p>\n'
        f'      <ol class="join-steps">\n'
        f'        <li>\n'
        f'          <span class="n">01</span>\n'
        f'          <h3>Find your seat</h3>\n'
        f'          <p>Pick a program lane: Permitting Support Team, Intergovernmental Geothermal Accelerator, or Permitting Innovation Exchange. Audience libraries live under Resources.</p>\n'
        f'        </li>\n'
        f'        <li>\n'
        f'          <span class="n">02</span>\n'
        f'          <h3>Get on the calendar</h3>\n'
        f'          <p>Start with an Accelerator session, Innovation Exchange challenge, office hours, or a cohort window. Featured events and the full FY27 list are on the <a href="{p}events/">Events</a> page.</p>\n'
        f'        </li>\n'
        f'        <li>\n'
        f'          <span class="n">03</span>\n'
        f'          <h3>Use the libraries</h3>\n'
        f'          <p>Guides, templates, and playbooks live under <a href="{p}resources/">Resources</a>. Draft materials are labeled in progress; published sources stay linked.</p>\n'
        f'        </li>\n'
        f'        <li>\n'
        f'          <span class="n">04</span>\n'
        f'          <h3>Stay on the map</h3>\n'
        f'          <p>Program staff keep a living membership list. Tell us your organization, role, and which sessions you will attend. That is membership.</p>\n'
        f'        </li>\n'
        f'      </ol>\n'
        f'      <div class="actions">\n'
        f'        <a class="btn primary" href="{p}events/">See upcoming events</a>\n'
        f'        <a class="btn ghost" href="{p}programs/">Browse programs</a>\n'
        f'      </div>\n'
        f'    </article>\n'
        f'    <article class="story" data-reveal>\n'
        f'      <div class="story-media"><img src="{p}images/desert.jpg" alt="" width="1600" height="1067"></div>\n'
        f'      <div class="story-body">\n'
        f'        <span class="k">Year 1</span>\n'
        f'        <h3>What membership is</h3>\n'
        f'        <p>Membership is participation in existing roles. Tribal convenings are coordination only. Consultation stays with the responsible federal agency.</p>\n'
        f'        <p>Applicant assistance is readiness support.</p>\n'
        f'      </div>\n'
        f'    </article>\n'
        f'    <article class="story reverse" data-reveal>\n'
        f'      <div class="story-media"><img src="{p}images/sinter.jpg" alt="" width="502" height="768"></div>\n'
        f'      <div class="story-body">\n'
        f'        <span class="k">Administration</span>\n'
        f'        <h3>Charter and sessions</h3>\n'
        f'        <p>A charter covers purpose, membership terms, and the relationship to laboratory research. Participating organizations are named in the first quarter.</p>\n'
        f'        <p>The recurring spine is the Nevada monthly interagency call. Regionals, cohorts, challenges, and fellow convenings hang off that rhythm.</p>\n'
        f'      </div>\n'
        f'    </article>\n'
        f'  </div>\n'
        f'  <div class="mosaic" aria-hidden="true">\n'
        f'    <figure><img src="{p}images/basin.jpg" alt="" width="1600" height="2131"></figure>\n'
        f'    <figure><img src="{p}images/steam.jpg" alt="" width="1024" height="689"></figure>\n'
        f'  </div>\n'
        f'  <div class="folio">\n'
        f'    <article class="story" data-reveal>\n'
        f'      <div class="story-media"><img src="{p}images/gathering.jpg" alt="" width="1600" height="1068"></div>\n'
        f'      <div class="story-body">\n'
        f'        <span class="k">Partners</span>\n'
        f'        <h3>How it is run</h3>\n'
        f'        <p>BLM is the design partner on federal artifacts. NASEO convenes states. Tribal convenings are co-designed with participating Tribal Governments and sit with existing venues.</p>\n'
        f'        <p>Fellows keep research and pathway work moving between sessions. Host agencies supervise placements.</p>\n'
        f'      </div>\n'
        f'    </article>\n'
        f'    <article class="roster-block" data-reveal>\n'
        f'      <h2>Who is in the room</h2>\n'
        f'      <ul class="roster">\n'
        f'{roster}\n'
        f'      </ul>\n'
        f'    </article>\n'
        f'  </div>'
    )


def sections_html(sections):
    parts = ["  <article>"]
    for heading, paras in sections:
        parts.append(f"    <h2>{heading}</h2>")
        for para in paras:
            parts.append(f"    <p>{para}</p>")
    parts.append("  </article>")
    return "\n".join(parts)


def fmt_compact_day(ev, dense=False):
    start = ev["date"]
    end = ev.get("end")
    if not end or end == start:
        return str(start.day)
    if start.month == end.month and start.year == end.year:
        return f"{start.day}–{end.day}"
    if dense:
        return f"{start.day}–{end.strftime('%b')}"
    return f"{start.day} {start.strftime('%b')}–{end.day} {end.strftime('%b')}"


def event_slug(ev):
    raw = f'{ev["date"].isoformat()}-{ev["title"]}'
    return "".join(c.lower() if c.isalnum() else "-" for c in raw).strip("-")[:56]


def date_badge_html(ev):
    start = ev["date"]
    end = ev.get("end")
    mon = start.strftime("%b").upper()
    if end and end != start and not (start.month == end.month and start.year == end.year):
        day = f"{start.day}–{end.day}"
    elif end and end != start:
        day = f"{start.day}–{end.day}"
    else:
        day = f"{start.day:02d}" if start.day < 10 else str(start.day)
    return (
        f'<div class="date-badge" aria-hidden="true">'
        f'<span class="mon">{mon}</span>'
        f'<span class="dom">{day}</span>'
        f'</div>'
    )


def weekday_line(ev):
    start = ev["date"]
    end = ev.get("end")
    time = ev.get("time", "")
    mode = ev.get("mode", "")
    if end and end != start:
        if start.month == end.month:
            when = f"{start.strftime('%a')}–{end.strftime('%a')}, {start.strftime('%b')} {start.day}–{end.day}"
        else:
            when = f"{start.strftime('%b')} {start.day} – {end.strftime('%b')} {end.day}"
    else:
        when = start.strftime("%a, %b %-d") if hasattr(start, "strftime") else start.strftime("%a, %b %d").replace(" 0", " ")
        when = start.strftime("%a, %b ") + str(start.day)
    bits = [when]
    if time:
        bits.append(time)
    if mode:
        bits.append(mode)
    return " · ".join(bits)


def rsvp_href(ev):
    subj = f'RSVP: {ev["title"]} ({ev["date"].isoformat()})'
    return f'mailto:collaborate@gpic.thermalunderground.org?subject={subj.replace(" ", "%20")}'


def attendee_chips_html(ev):
    chips = ev.get("attendees") or []
    parts = [f'<span class="chip">{c}</span>' for c in chips[:4]]
    return f'<div class="attendee-chips">{"".join(parts)}</div>'


def meetup_card_html(ev, depth=0, *, variant="row", past=False):
    """Meetup-style event card: date badge, going count, RSVP."""
    interest = ev.get("interest", "Exchange")
    going = ev.get("going", 0)
    host = ev.get("host", "GPIC Collaborative")
    blurb = ev.get("blurb", "")
    slug = event_slug(ev)
    detail = f'{"../" * depth}{ev["program"]}/'
    rsvp = rsvp_href(ev)
    going_label = f"{going} went" if past else f"{going} going"
    cta = "View" if past else "RSVP"
    cta_href = detail if past else rsvp
    cta_class = "btn ghost" if past else "btn primary rsvp"
    klass = "meetup-card" + (" is-past" if past else "") + (" is-hero" if variant == "hero" else "")
    photo = ""
    if variant == "hero":
        pfx = "../" * depth
        photo = (
            f'<div class="meetup-hero-media">'
            f'<img src="{pfx}images/{ev.get("photo", "gathering.jpg")}" alt="" width="900" height="560">'
            f'</div>'
        )
    return (
        f'<article class="{klass}" id="ev-{slug}" data-interest="{interest}" data-reveal>\n'
        f'  {date_badge_html(ev)}\n'
        f'  <div class="meetup-main">\n'
        f'{photo}'
        f'    <p class="meetup-when">{weekday_line(ev)}</p>\n'
        f'    <h3 class="meetup-title"><a href="{detail}">{ev["title"]}</a></h3>\n'
        f'    <p class="meetup-where">{ev["where"]}</p>\n'
        f'    <p class="meetup-host">Hosted by {host} · {ev["kind"]} · {interest}</p>\n'
        + (f'    <p class="meetup-blurb">{blurb}</p>\n' if variant == "hero" and blurb else "")
        + f'    <div class="meetup-social">\n'
        f'      {attendee_chips_html(ev)}\n'
        f'      <span class="going">{going_label}</span>\n'
        f'    </div>\n'
        f'  </div>\n'
        f'  <div class="meetup-cta">\n'
        f'    <a class="{cta_class}" href="{cta_href}">{cta}</a>\n'
        + (f'    <a class="btn ghost" href="{detail}">Details</a>\n' if not past else "")
        + f'  </div>\n'
        f'</article>'
    )


def interest_tabs_html(prefix=""):
    buttons = ['      <button type="button" class="interest-tab is-active" data-filter="all" aria-pressed="true">All</button>']
    for name in INTERESTS:
        buttons.append(
            f'      <button type="button" class="interest-tab" data-filter="{name}" aria-pressed="false">{name}</button>'
        )
    return (
        f'  <div class="interest-bar" data-interest-filter{(" " + prefix) if prefix else ""}>\n'
        f'    <p class="guide-kicker">Find your people</p>\n'
        f'    <div class="interest-tabs" role="tablist" aria-label="Filter by interest">\n'
        + "\n".join(buttons) + "\n"
        f'    </div>\n'
        f'  </div>'
    )


def compact_event_row(ev, href, dense=False):
    mode = ev.get("mode", "")
    audience = ev.get("audience", "")
    tip = f'{ev["kind"]}. {ev["where"]}'
    if audience:
        tip += f' · {audience}'
    place = ev["where"]
    if mode and mode.lower() not in place.lower():
        place = f'{place} · {mode}'
    if dense:
        return (
            '      <li>\n'
            f'        <a href="{href}" title="{tip}">\n'
            f'          <span class="day">{fmt_compact_day(ev, dense=True)}</span>\n'
            f'          <span class="title">{ev["title"]}</span>\n'
            '        </a>\n'
            '      </li>'
        )
    aud = f'\n            <span class="audience">{audience}</span>' if audience else ""
    return (
        '      <li>\n'
        f'        <a href="{href}" title="{tip}">\n'
        f'          <span class="day">{fmt_compact_day(ev)}</span>\n'
        '          <span class="what">\n'
        f'            <span class="title">{ev["title"]}</span>\n'
        f'            <span class="kind">{ev["kind"]}</span>\n'
        f'            <span class="place">{place}</span>{aud}\n'
        '          </span>\n'
        '        </a>\n'
        '      </li>'
    )


def event_items(events, depth):
    return "\n".join(meetup_card_html(ev, depth) for ev in events)


def events_by_month():
    quarters = []
    current_q = None
    months = []
    current_m = None
    chunk = []
    for ev in EVENTS:
        q = quarter_of(ev["date"])
        m = (ev["date"].year, ev["date"].month)
        if q != current_q:
            if chunk:
                months.append((current_m, chunk))
                chunk = []
            if months:
                quarters.append((current_q, months))
            current_q = q
            months = []
            current_m = m
        elif m != current_m:
            months.append((current_m, chunk))
            current_m = m
            chunk = []
        chunk.append(ev)
    if chunk:
        months.append((current_m, chunk))
    if months:
        quarters.append((current_q, months))
    return quarters


def fmt_feat_day(ev):
    start = ev["date"]
    end = ev.get("end")
    if not end or end == start:
        return f"{start.day} {start.strftime('%b %Y')}"
    if start.month == end.month and start.year == end.year:
        return f"{start.day}–{end.day} {start.strftime('%b %Y')}"
    if start.year == end.year:
        return f"{start.day} {start.strftime('%b')}–{end.day} {end.strftime('%b %Y')}"
    return f"{start.day} {start.strftime('%b %Y')}–{end.day} {end.strftime('%b %Y')}"


def featured_events():
    feat = [ev for ev in EVENTS if ev.get("featured") and ev["date"] >= TODAY]
    if not feat:
        feat = [ev for ev in EVENTS if ev.get("featured")]
    if not feat:
        feat = upcoming_events(8)
    return feat[:8]


def popular_events(n=4):
    up = [ev for ev in EVENTS if ev["date"] >= TODAY]
    return sorted(up, key=lambda e: e.get("going", 0), reverse=True)[:n]


def past_events(n=6):
    past = [ev for ev in EVENTS if ev["date"] < TODAY]
    return list(reversed(past))[:n]


def featured_html(depth):
    parts = [
        '  <p class="cal-now">Popular upcoming</p>',
        '  <ul class="feat-grid">',
    ]
    for ev in popular_events(8):
        href = f'#ev-{event_slug(ev)}'
        photo = ev.get("photo", "gathering.jpg")
        meta = f'{fmt_feat_day(ev)} · {ev.get("going", 0)} going'
        parts.append(
            '    <li>\n'
            f'      <a class="feat" href="{href}">\n'
            f'        <img src="{"../" * depth}images/{photo}" alt="" width="800" height="500">\n'
            '        <span class="feat-copy">\n'
            f'          <span class="k">{meta}</span>\n'
            f'          <span class="feat-title">{ev.get("feat", ev["title"])}</span>\n'
            '        </span>\n'
            '      </a>\n'
            '    </li>'
        )
    parts.append("  </ul>")
    return "\n".join(parts)


def agenda_list_html(depth):
    up = [ev for ev in EVENTS if ev["date"] >= TODAY]
    parts = [
        '  <div class="cal-list band meetup-feed" id="list">',
        '    <h2>All upcoming</h2>',
        '    <p class="program-note">FY27 estimated dates. RSVP is a demo mailto: tell us which seat you hold.</p>',
        interest_tabs_html(),
        '    <div class="meetup-list" data-meetup-list>',
    ]
    for ev in up:
        parts.append(meetup_card_html(ev, depth))
    parts.append("    </div>")
    parts.append("  </div>")
    past = past_events(8)
    if past:
        parts.append('  <div class="cal-list band meetup-feed is-past" id="past">')
        parts.append("    <h2>Past events</h2>")
        parts.append('    <p class="program-note">Recent rooms that already met: proof the calendar is lived-in.</p>')
        parts.append('    <div class="meetup-list">')
        for ev in past:
            parts.append(meetup_card_html(ev, depth, past=True))
        parts.append("    </div>")
        parts.append("  </div>")
    return "\n".join(parts)


def calendar_html(depth):
    p = "../" * depth
    next_ev = upcoming_events(1)
    next_block = ""
    if next_ev:
        next_block = (
            '  <section class="next-meetup" id="next">\n'
            '    <p class="guide-kicker">Next meetup</p>\n'
            + meetup_card_html(next_ev[0], depth, variant="hero") + "\n"
            "  </section>\n"
        )
    parts = [
        '  <div class="group-strip" data-reveal>\n'
        '    <div class="group-identity">\n'
        '      <p class="guide-kicker">Meetup group</p>\n'
        '      <h2>GPIC Collaborative</h2>\n'
        f'      <p class="group-meta"><strong>{GROUP_MEMBERS} members</strong> · Public group · Geothermal permitting</p>\n'
        '      <p>Federal, state, Tribal, and applicant people who show up for workshops, exchange, office hours, and cohorts.</p>\n'
        '    </div>\n'
        '    <div class="group-actions">\n'
        f'      <a class="btn primary" href="{p}about/#join">Join this group</a>\n'
        '      <a class="btn ghost" href="#list">Browse events</a>\n'
        '    </div>\n'
        '  </div>\n',
        next_block,
        '  <nav class="cal-jump" aria-label="Calendar sections">',
        '    <a href="#next">Next meetup</a>',
        '    <a href="#featured">Popular</a>',
        '    <a href="#list">Upcoming</a>',
        '    <a href="#past">Past</a>',
        '    <a href="#months">Month view</a>',
        '  </nav>',
        '  <div id="featured">',
        featured_html(depth),
        '  </div>',
        agenda_list_html(depth),
        '  <p class="cal-now" id="months">Month by month · Oct 2026 – Sep 2027</p>',
        '  <div class="cal-grid year">',
    ]
    for _, months in events_by_month():
        for (year, month), evs in months:
            label = date(year, month, 1).strftime("%b %Y")
            parts.append(f'    <div class="cal-month" id="m-{year}-{month:02d}">')
            parts.append(f"      <h3>{label}</h3>")
            parts.append("      <ol>")
            for ev in evs:
                parts.append(compact_event_row(ev, f'#ev-{event_slug(ev)}', dense=True))
            parts.append("      </ol>")
            parts.append("    </div>")
    parts.append("  </div>")
    return "\n".join(parts)


def guide_card_html(href, kicker, title, lede, photo):
    return f'''    <a class="guide-card" href="{href}">
      <span class="guide-card-media"><img src="images/{photo}" alt="" width="800" height="500"></span>
      <span class="guide-card-body">
        <span class="guide-kicker">{kicker}</span>
        <h2>{title}</h2>
        <p>{lede}</p>
        <span class="guide-arrow">Read →</span>
      </span>
    </a>'''


def card_html(href, kicker, title, body, heading="h2", photo=None, depth=0):
    pfx = "../" * depth
    media = (
        f'          <span class="card-media"><img src="{pfx}images/{photo}" alt="" width="800" height="500"></span>\n'
        if photo else ""
    )
    return f'''      <li>
        <a class="card" href="{href}">
{media}          <span class="card-body">
          <span class="k">{kicker}</span>
          <{heading}>{title}</{heading}>
          <p>{body}</p>
          </span>
        </a>
      </li>'''


def events_for(slug):
    return [e for e in EVENTS if e["program"] == slug]


def related_html(slugs, depth):
    by = {p["slug"]: p for p in PROGRAMS}
    pfx = "../" * depth
    links = " ".join(
        f'<a href="{pfx}{s}/">{by[s]["title"]}</a>' for s in slugs if s in by
    )
    return f'''    <div class="also">
      <h2>Related programs</h2>
      <p>{links}</p>
    </div>'''


def story_html(sit, depth, reverse=False):
    pfx = "../" * depth
    klass = "story reverse" if reverse else "story"
    return f'''    <article class="{klass}" id="{sit["id"]}" data-reveal>
      <div class="story-media"><img src="{pfx}images/{sit["photo"]}" alt="" width="1200" height="800"></div>
      <div class="story-body">
        <span class="k">{sit["kicker"]}</span>
        <h3>{sit["title"]}</h3>
        <p>{sit["lede"]}</p>
        <p>{sit["body"]}</p>
      </div>
    </article>'''


def innovation_body(depth):
    stories = "\n".join(
        story_html(sit, depth, reverse=i % 2 == 1)
        for i, sit in enumerate(INNOVATION_SITS)
    )
    cal = events_for("innovation")
    return f'''  <article>
    <h2>Year 1 events</h2>
    <p>Three challenge events bring industry, government, and applicants into the same room. Problem statements, judging criteria, and data-access arrangements are required before each event. Selected outputs enter the backlog as candidates.</p>
  </article>
{stories}
  <article data-reveal>
    <h2>Procedure</h2>
    <ul class="steps">
      <li><span class="n">Before</span><p>Problem statements, judging criteria, and data-access arrangements are settled before an event is held.</p></li>
      <li><span class="n">During</span><p>Federal and non-federal teams work published statements. At least one non-federal team participates during the year. At least one event is co-hosted with a state agency.</p></li>
      <li><span class="n">After</span><p>Each output is assessed and dispositioned with NLR. Prototypes enter the backlog as candidate requirements.</p></li>
    </ul>
    <h2>Dates</h2>
    <div class="meetup-list">
{event_items(cal, depth)}
    </div>
    <p>State agencies that intend to co-host notify the Collaborative before the third event is sited. Problem statements are posted with each event.</p>
{related_html(["accelerator", "support-team", "research"], depth)}
  </article>'''


def resource_list(groups):
    parts = []
    for heading, rows in groups:
        parts.append(f'    <h2>{heading}</h2>')
        parts.append('    <ul class="res-cards">')
        for row in rows:
            if isinstance(row, dict):
                name = row["name"]
                url = row.get("url")
                note = row.get("note", "")
                rtype = row.get("type", "Resource")
                updated = row.get("updated", "")
                status = row.get("status", "draft")
            else:
                name, url, note = row
                rtype, updated = "Resource", ""
                status = "now" if url else "draft"
            st_class = "now" if status == "now" else ""
            st_label = "Available" if status == "now" else "In progress"
            title = f'<a href="{url}">{name}</a>' if url else name
            meta = f'{rtype}'
            if updated:
                meta += f' · Updated {updated}'
            parts.append(
                '      <li class="res-card">\n'
                '        <div class="res-card-top">\n'
                f'          <span class="k">{meta}</span>\n'
                f'          <span class="st {st_class}">{st_label}</span>\n'
                '        </div>\n'
                f'        <span class="name">{title}</span>\n'
                f'        <p>{note}</p>\n'
                '      </li>'
            )
        parts.append("    </ul>")
    return "\n".join(parts)


def upcoming_events(n=4):
    upcoming = [ev for ev in EVENTS if ev["date"] >= TODAY]
    return upcoming[:n]


def this_month_activity():
    y, m = TODAY.year, TODAY.month
    return [ev for ev in EVENTS if ev["date"].year == y and ev["date"].month == m]


def home_community_body():
    up = upcoming_events(10)
    next_ev = up[0] if up else None
    feed = up[1:7] if next_ev else up[:6]
    popular = popular_events(4)
    past = past_events(3)

    primary = [p for p in PROGRAMS if p.get("primary")]
    spotlight = next((p for p in PROGRAMS if p.get("spotlight")), None)
    program_cards = "\n".join(
        guide_card_html(f'{p["slug"]}/', p["kicker"], p["title"], p["card"], p.get("photo", "gathering.jpg"))
        for p in primary
    )
    edoh_html = ""
    if spotlight:
        edoh_html = (
            '  <section class="home-band edoh-band" data-reveal>\n'
            '    <div class="wrap">\n'
            '      <header class="home-guide-intro">\n'
            '        <p class="guide-kicker">Program</p>\n'
            f'        <h2>{spotlight["title"]}</h2>\n'
            f'        <p>{spotlight["lede"]}</p>\n'
            '      </header>\n'
            '      <div class="home-guide-grid">\n'
            + guide_card_html(
                f'{spotlight["slug"]}/',
                spotlight["kicker"],
                spotlight["title"],
                spotlight["card"],
                spotlight.get("photo", "steam.jpg"),
            )
            + "\n"
            + guide_card_html(
                "fellows/",
                "Fellows",
                "Fellows across the portfolio",
                "Research and pathway seats that help staff Collaborative rooms.",
                "documents.jpg",
            )
            + "\n"
            '      </div>\n'
            '    </div>\n'
            '  </section>\n'
        )

    next_html = ""
    if next_ev:
        next_html = (
            '  <section class="home-band next-meetup-band" data-reveal>\n'
            '    <div class="wrap">\n'
            '      <header class="home-guide-intro">\n'
            '        <p class="guide-kicker">Next meetup</p>\n'
            '        <h2>Show up to this one</h2>\n'
            '        <p>The nearest session on the Collaborative calendar. RSVP to claim a seat.</p>\n'
            '      </header>\n'
            + meetup_card_html(next_ev, 0, variant="hero") + "\n"
            '    </div>\n'
            '  </section>\n'
        )

    feed_cards = "\n".join(meetup_card_html(ev, 0) for ev in feed)
    pop_cards = "\n".join(meetup_card_html(ev, 0) for ev in popular)
    past_cards = "\n".join(meetup_card_html(ev, 0, past=True) for ev in past)

    activity = past or this_month_activity()
    if not activity:
        activity_items = [
            '      <li><span class="day">Sep</span><span class="title">Membership map drafting</span><span class="kind">Operations</span></li>',
        ]
    else:
        activity_items = [
            (
                f'      <li><span class="day">{ev["date"].strftime("%b")}</span>'
                f'<span class="title">{ev["title"]}</span>'
                f'<span class="kind">{ev.get("going", 0)} {"went" if ev["date"] < TODAY else "going"}</span></li>'
            )
            for ev in activity[:4]
        ]

    next_label = (
        f'{next_ev["date"].strftime("%b")} {next_ev["date"].day}'
        if next_ev else "TBA"
    )

    return (
        '  <section class="group-strip home-group" data-reveal>\n'
        '    <div class="wrap group-strip-inner">\n'
        '      <div class="group-identity">\n'
        '        <p class="guide-kicker">This is the group</p>\n'
        '        <h2>GPIC Collaborative</h2>\n'
        f'        <p class="group-meta"><strong>{GROUP_MEMBERS} members</strong> · Public · Next meetup {next_label}</p>\n'
        '        <p>A living Meetup-style room for people who already work geothermal permitting. Discover events, find your people, join the next session.</p>\n'
        '      </div>\n'
        '      <div class="group-actions">\n'
        '        <a class="btn primary" href="about/#join">Join this group</a>\n'
        '        <a class="btn ghost" href="events/">See all events</a>\n'
        '      </div>\n'
        '    </div>\n'
        '  </section>\n'
        + next_html
        + '  <section class="home-band" data-reveal>\n'
        '    <div class="wrap">\n'
        '      <header class="home-guide-intro">\n'
        '        <p class="guide-kicker">Upcoming</p>\n'
        '        <h2>Next meetups</h2>\n'
        '        <p>Date, time, place, and who is going: the meetup feed.</p>\n'
        '      </header>\n'
        + interest_tabs_html() + "\n"
        '      <div class="meetup-list" data-meetup-list>\n'
        + feed_cards + "\n"
        '      </div>\n'
        '      <p class="home-more"><a href="events/">Full events calendar →</a></p>\n'
        '    </div>\n'
        '  </section>\n'
        '  <section class="home-band" data-reveal>\n'
        '    <div class="wrap">\n'
        '      <header class="home-guide-intro">\n'
        '        <p class="guide-kicker">Popular</p>\n'
        '        <h2>Popular events</h2>\n'
        '        <p>Highest RSVP interest on the FY27 calendar.</p>\n'
        '      </header>\n'
        '      <div class="meetup-list compact-popular">\n'
        + pop_cards + "\n"
        '      </div>\n'
        '    </div>\n'
        '  </section>\n'
        '  <section class="activity-strip" data-reveal>\n'
        '    <div class="wrap">\n'
        '      <p class="guide-kicker">Recent activity</p>\n'
        '      <ul class="activity-list">\n'
        + "\n".join(activity_items) + "\n"
        '      </ul>\n'
        '    </div>\n'
        '  </section>\n'
        + (
            '  <section class="home-band" data-reveal>\n'
            '    <div class="wrap">\n'
            '      <header class="home-guide-intro">\n'
            '        <p class="guide-kicker">Past</p>\n'
            '        <h2>Past events</h2>\n'
            '        <p>Rooms that already met, before the next RSVP.</p>\n'
            '      </header>\n'
            '      <div class="meetup-list">\n'
            + past_cards + "\n"
            '      </div>\n'
            '    </div>\n'
            '  </section>\n'
            if past else ""
        )
        + '  <section class="home-band topics-band" data-reveal>\n'
        '    <div class="wrap">\n'
        '      <header class="home-guide-intro">\n'
        '        <p class="guide-kicker">Programs</p>\n'
        '        <h2>Three programs</h2>\n'
        '        <p>Support Team placements, the Intergovernmental Geothermal Accelerator, and the Permitting Innovation Exchange.</p>\n'
        '      </header>\n'
        '      <div class="home-guide-grid">\n'
        + program_cards + "\n"
        '      </div>\n'
        '      <p class="home-more"><a href="programs/">All programs →</a> · <a href="resources/">Resource libraries →</a></p>\n'
        '    </div>\n'
        '  </section>\n'
        + edoh_html
        + '  <section class="home-band join-cta-band" data-reveal>\n'
        '    <div class="wrap join-cta">\n'
        '      <div>\n'
        '        <p class="guide-kicker">Membership</p>\n'
        f'        <h2>Join {GROUP_MEMBERS} people in the room</h2>\n'
        '        <p>No dues. Membership is showing up: Accelerator sessions, Innovation Exchange events, Support Team design, or a working group seat.</p>\n'
        '      </div>\n'
        '      <div class="group-actions">\n'
        '        <a class="btn primary" href="about/#join">Join this group</a>\n'
        '        <a class="btn ghost" href="events/#list">RSVP an event</a>\n'
        '      </div>\n'
        '    </div>\n'
        '  </section>'
    )


def write(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text)
    print("wrote", path.relative_to(ROOT))


def main():
    home_actions = (
        '      <div class="actions">\n'
        '        <a class="btn primary" href="about/#join">Join this group</a>\n'
        '        <a class="btn ghost" href="events/#next">Find events</a>\n'
        '      </div>\n'
    )
    write(ROOT / "index.html", page(
        title="Geothermal Permitting Innovation Collaborative",
        eyebrow="",
        heading="GPIC <i>Collaborative</i>",
        lede="Discover meetups, find your people, and RSVP. The living community for geothermal permitting across governments and industry.",
        body=home_community_body(),
        active="",
        footer="Thermal Underground. Geothermal Permitting Innovation Collaborative.",
        depth=0,
        home=True,
        show_rule=True,
        wrap_body=False,
        photo="gathering.jpg",
        hero_mosaic=True,
        actions=home_actions,
    ))

    primary = [p for p in PROGRAMS if p.get("primary")]
    spotlight = next((p for p in PROGRAMS if p.get("spotlight")), None)
    secondary = [p for p in PROGRAMS if not p.get("primary") and not p.get("spotlight")]
    prog_cards = "\n".join(
        card_html(f'../{p["slug"]}/', p["kicker"], p["title"], p["card"], photo=p.get("photo"), depth=1)
        for p in primary
    )
    edoh_card = ""
    if spotlight:
        edoh_card = (
            '  <header class="programs-intro" data-reveal>\n'
            '    <p class="guide-kicker">Program</p>\n'
            '    <h2>Energy Determinants of Health</h2>\n'
            f'    <p>{spotlight["lede"]}</p>\n'
            '  </header>\n'
            '  <ul class="cards programs">\n'
            + card_html(
                f'../{spotlight["slug"]}/',
                spotlight["kicker"],
                spotlight["title"],
                spotlight["card"],
                photo=spotlight.get("photo"),
                depth=1,
            )
            + "\n"
            '  </ul>\n'
        )
    more_cards = "\n".join(
        card_html(f'../{p["slug"]}/', p["kicker"], p["title"], p["card"], photo=p.get("photo"), depth=1)
        for p in secondary
    )
    write(ROOT / "programs" / "index.html", page(
        title="Programs · GPIC",
        eyebrow="Programs",
        heading="Programs",
        lede="Three named efforts: Permitting Support Team, Intergovernmental Geothermal Accelerator, and Permitting Innovation Exchange.",
        body=(
            '  <header class="programs-intro" data-reveal>\n'
            '    <p class="guide-kicker">The work</p>\n'
            '    <h2>Three programs</h2>\n'
            '    <p>Open a card for who is in the room, what they do, and what success looks like. Audience libraries stay under Resources.</p>\n'
            '  </header>\n'
            '  <ul class="cards programs">\n'
            f'{prog_cards}\n'
            '  </ul>\n'
            + edoh_card
            + '  <header class="programs-intro" data-reveal>\n'
            '    <p class="guide-kicker">Also in Year 1</p>\n'
            '    <h2>Supporting streams</h2>\n'
            '    <p>Operations, training, evidence, research, and fellows keep the three programs moving.</p>\n'
            '  </header>\n'
            '  <ul class="cards programs">\n'
            f'{more_cards}\n'
            '  </ul>'
        ),
        active="programs",
        footer='Thermal Underground. Geothermal Permitting Innovation Collaborative. <a href="../events/">Calendar</a>.',
        depth=1,
        photo="desert.jpg",
        hero_mosaic=True,
    ))

    write(ROOT / "events" / "index.html", page(
        title="Events · GPIC",
        eyebrow="Meetup calendar",
        heading="Events",
        lede="Upcoming meetups with dates, times, places, who’s going, and RSVP, plus past rooms and a month view for the full FY27 year.",
        body=calendar_html(1),
        active="events",
        footer='Thermal Underground. Geothermal Permitting Innovation Collaborative. <a href="../programs/">Programs</a>.',
        depth=1,
        compact=True,
    ))

    res_cards = "\n".join(
        card_html(f'../resources/{h["slug"]}/', h["kicker"], h["title"], h["card"], photo=h.get("photo"), depth=1)
        for h in RESOURCE_HUBS
    )
    write(ROOT / "resources" / "index.html", page(
        title="Resources · GPIC",
        eyebrow="Contents",
        heading="Resources",
        lede="Stocked libraries for federal, state and local, Tribal, and applicant practitioners: guides, templates, and playbooks with update dates.",
        body=f'''  <article>
    <h2>Four libraries</h2>
    <p>Each library mixes live agency sources with Collaborative guides, templates, and playbooks. Available items are ready to use; in-progress items show when they were last updated.</p>
  </article>
  <ul class="cards four">
{res_cards}
  </ul>''',
        active="resources",
        footer='Thermal Underground. Geothermal Permitting Innovation Collaborative. <a href="../events/">Calendar</a>.',
        depth=1,
        photo="maps.jpg",
    ))

    for h in RESOURCE_HUBS:
        intro = "".join(f"    <p>{para}</p>\n" for para in h["intro"])
        write(ROOT / "resources" / h["slug"] / "index.html", page(
            title=f'{h["title"]} · GPIC',
            eyebrow=h["kicker"],
            heading=h["title"],
            lede=h["lede"],
            body=f"  <article>\n{intro}{resource_list(h['groups'])}\n  </article>",
            active=f"resources/{h['slug']}",
            footer='Thermal Underground. Geothermal Permitting Innovation Collaborative. <a href="../../resources/">Resources</a>.',
            depth=2,
            photo=h.get("photo"),
        ))

    write(ROOT / "about" / "index.html", page(
        title="About · GPIC",
        eyebrow="About & membership",
        heading="The <i>Collaborative</i>",
        lede="How the Collaborative works, who is in the room, and how to participate.",
        body=about_body(1),
        active="about",
        footer='Thermal Underground. Geothermal Permitting Innovation Collaborative. <a href="../programs/">Programs</a>.',
        depth=1,
        about=True,
        show_rule=True,
        wrap_body=False,
        photo="steam.jpg",
        actions=(
            '      <div class="actions">\n'
            '        <a class="btn primary" href="#join">How to participate</a>\n'
            '        <a class="btn ghost" href="../events/">Events calendar</a>\n'
            '      </div>\n'
        ),
    ))

    for p in PROGRAMS:
        if p["slug"] == "innovation":
            write(ROOT / "innovation" / "index.html", page(
                title="Permitting Innovation Exchange · GPIC",
                eyebrow="Program",
                heading="Permitting Innovation Exchange",
                lede="Hackathons, shark tanks, and challenge events where industry, government, and applicants solve live permitting problems together.",
                body=innovation_body(1),
                active="innovation",
                footer='Thermal Underground. Geothermal Permitting Innovation Collaborative. <a href="../programs/">Programs</a>.',
                depth=1,
                show_rule=True,
                photo="workshop.jpg",
            ))
            continue
        who = next((paras[0] for h, paras in p["sections"] if h == "Who"), p["sections"][0][1][0])
        what = next((paras[0] for h, paras in p["sections"] if h == "What"), p["sections"][1][1][0] if len(p["sections"]) > 1 else "")
        success = next((paras[0] for h, paras in p["sections"] if h == "Success"), p["card"])
        pillars = (
            '  <ul class="pillars" data-reveal>\n'
            f'    <li><span class="k">Who</span><h2>Who</h2><p>{who}</p></li>\n'
            f'    <li><span class="k">What</span><h2>What</h2><p>{what}</p></li>\n'
            f'    <li><span class="k">Success</span><h2>Success</h2><p>{success}</p></li>\n'
            '  </ul>'
        )
        extras = []
        # Full section body for spotlight / primary detail beyond pillars
        if p.get("spotlight") or p.get("primary"):
            extras.append("  <article>")
            for heading, paras in p["sections"]:
                if heading in ("Who", "What", "Success"):
                    rest = paras[1:]
                    if not rest:
                        continue
                    extras.append(f"    <h2>{heading}</h2>")
                    for para in rest:
                        extras.append(f"    <p>{para}</p>")
                    continue
                extras.append(f"    <h2>{heading}</h2>")
                for para in paras:
                    extras.append(f"    <p>{para}</p>")
            extras.append("  </article>")
        related_events = events_for(p["slug"])
        if related_events:
            extras.append("  <article>")
            extras.append("    <h2>Upcoming in this topic</h2>")
            extras.append('    <div class="meetup-list">')
            extras.append(event_items(related_events, 1))
            extras.append("    </div>")
            extras.append("  </article>")
        more = ["  <article>"]
        if p.get("resource"):
            label = {"federal": "Federal", "state": "State and local", "tribal": "Tribal", "applicants": "Applicant"}.get(p["resource"], p["resource"].capitalize())
            more.append(
                f'    <p class="program-note"><a href="../resources/{p["resource"]}/">{label} resources</a></p>'
            )
        more.append(related_html(p["related"], 1))
        more.append("  </article>")
        inner = pillars + "\n" + "\n".join(extras + more)
        nav_active = p["slug"] if p["slug"] in ("support-team", "accelerator", "edoh", "fellows") else "programs"
        write(ROOT / p["slug"] / "index.html", page(
            title=f'{p["title"]} · GPIC',
            eyebrow=p["kicker"],
            heading=p["title"],
            lede=p["lede"],
            body=inner,
            active=nav_active,
            footer='Thermal Underground. Geothermal Permitting Innovation Collaborative. <a href="../programs/">Programs</a>.',
            depth=1,
            photo=p.get("photo"),
        ))

    # Retire old audience program URLs into Resources or new program homes
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
<script>location.replace("{dest}");</script>
</head>
<body>
<p><a href="{dest}">{title}</a></p>
</body>
</html>
"""
    for slug, dest, title in (
        ("federal", "../resources/federal/", "Federal resources"),
        ("states", "../accelerator/", "Intergovernmental Geothermal Accelerator"),
        ("tribal", "../resources/tribal/", "Tribal resources"),
        ("exchange", "../accelerator/", "Intergovernmental Geothermal Accelerator"),
    ):
        write(ROOT / slug / "index.html", redirect_page(title, dest))

    write(ROOT / "work" / "index.html", """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta http-equiv="refresh" content="0; url=../programs/">
<link rel="canonical" href="../programs/">
<title>Programs</title>
<script>location.replace("../programs/");</script>
</head>
<body>
<p><a href="../programs/">Programs</a></p>
</body>
</html>
""")


if __name__ == "__main__":
    main()
