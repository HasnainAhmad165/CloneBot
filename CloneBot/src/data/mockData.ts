export type NavKey = 'Dashboard' | 'Add Knowledge' | 'Knowledge Review' | 'Assistant' | 'Calendar' | 'Privacy' | 'Assistant Settings'

export const navItems: NavKey[] = ['Dashboard', 'Add Knowledge', 'Knowledge Review', 'Assistant', 'Calendar', 'Privacy', 'Assistant Settings']

export const initialEvents = [
  { id: 1, title: 'FYP meeting with Prof. Ahmad', date: '2026-10-03', time: '3:00 PM', color: 'purple', reminder: '30 minutes before' },
  { id: 2, title: 'Lunch with Bilal', date: '2026-10-08', time: '1:00 PM', color: 'blue', reminder: '10 minutes before' },
  { id: 3, title: 'SRS deadline', date: '2026-10-14', time: '11:59 PM', color: 'orange', reminder: '1 hour before' },
  { id: 4, title: 'Call with supplier', date: '2026-10-28', time: '4:00 PM', color: 'gray', reminder: 'No reminder' },
]

export const initialFacts = [
  { id: 1, type: 'Event', text: 'Meeting on Tuesday at 3pm at HQ Office', source: 'WhatsApp chat · Sana' },
  { id: 2, type: 'Fact', text: 'Prefers reports in PDF format rather than slide deck formats', source: 'Sana Chat · Sep' },
  { id: 3, type: 'Person', text: 'Hamza is the lead developer of the frontend client library', source: 'Manual typed input' },
  { id: 4, type: 'Preference', text: 'Never schedule follow-ups on Friday afternoons after 4pm', source: 'WhatsApp · Sana' },
  { id: 5, type: 'Commitment', text: 'Submit final pricing sheet by Wednesday noon', source: 'Sana Chat · Sep' },
]

export const initialReplies = [
  { id: 1, name: 'Bilal', message: 'Are you free tomorrow at 3?', draft: 'I already have a meeting around that time. Could we do 4 PM instead?', mode: 'Approval' },
  { id: 2, name: 'Sana', message: 'Can we review the slides?', draft: "Sure, let's look at them after lunch tomorrow.", mode: 'Approval' },
  { id: 3, name: 'Hamza', message: 'Project structure completed', draft: 'Sounds good, checking the repository now.', mode: 'Automatic' },
]
