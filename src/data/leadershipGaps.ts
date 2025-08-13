import { LeadershipGap } from '../types';

export const initialLeadershipGaps: LeadershipGap[] = [
  {
    id: 1,
    title: "Communication Gap",
    description: "Misunderstandings, rework, unclear delegation",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'weekly_hours',
    inputLabel1: "Hours wasted weekly due to poor communication",
    inputLabel2: "Estimated cost per hour (₹)"
  },
  {
    id: 2,
    title: "Emotional Intelligence",
    description: "Conflicts, attrition, emotional volatility",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'monthly_incidents',
    inputLabel1: "Number of emotional incidents monthly",
    inputLabel2: "Estimated cost per incident (₹)"
  },
  {
    id: 3,
    title: "Low Productivity",
    description: "Poor prioritization, task mismanagement",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'weekly_hours',
    inputLabel1: "Hours lost weekly to poor productivity",
    inputLabel2: "Estimated cost per hour (₹)"
  },
  {
    id: 4,
    title: "Weak Problem Solving",
    description: "Unnecessary escalation to owner/senior leaders",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'monthly_incidents',
    inputLabel1: "Number of escalations monthly",
    inputLabel2: "Estimated cost per escalation (₹)"
  },
  {
    id: 5,
    title: "Poor Decision-Making",
    description: "Missed opportunities, wrong hires/vendors",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'monthly_incidents',
    inputLabel1: "Number of poor decisions monthly",
    inputLabel2: "Estimated cost per poor decision (₹)"
  },
  {
    id: 6,
    title: "Delegation Gap",
    description: "Owner doing everything, team lacks initiative",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'weekly_hours',
    inputLabel1: "Owner's hours spent on delegable tasks weekly",
    inputLabel2: "Owner's hourly rate (₹)"
  },
  {
    id: 7,
    title: "Lack of Trust & Openness",
    description: "Concealed mistakes, poor collaboration",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'monthly_incidents',
    inputLabel1: "Trust-related incidents monthly",
    inputLabel2: "Estimated cost per incident (₹)"
  },
  {
    id: 8,
    title: "Ineffective Feedback",
    description: "Employees unaware of performance issues",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'weekly_hours',
    inputLabel1: "Hours spent on performance issues weekly",
    inputLabel2: "Estimated cost per hour (₹)"
  },
  {
    id: 9,
    title: "Low Motivation & Ownership",
    description: "Passive team, missed targets",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'monthly_incidents',
    inputLabel1: "Number of missed targets monthly",
    inputLabel2: "Estimated cost per missed target (₹)"
  },
  {
    id: 10,
    title: "Conflict Mismanagement",
    description: "Inter-team friction, lost clients or deals",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'monthly_incidents',
    inputLabel1: "Number of conflicts monthly",
    inputLabel2: "Estimated cost per conflict (₹)"
  },
  {
    id: 11,
    title: "Mind Management Deficit",
    description: "Burnout, reactivity, poor emotional control",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'weekly_hours',
    inputLabel1: "Hours lost to burnout/reactivity weekly",
    inputLabel2: "Estimated cost per hour (₹)"
  },
  {
    id: 12,
    title: "Situational Leadership",
    description: "Inability to adapt leadership style to different situations and team members",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'weekly_hours',
    inputLabel1: "Hours wasted due to inappropriate leadership approach weekly",
    inputLabel2: "Estimated cost per hour (₹)"
  },
  {
    id: 13,
    title: "Coaching",
    description: "Lack of coaching skills to develop team members effectively",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'weekly_hours',
    inputLabel1: "Hours that could be saved with better coaching weekly",
    inputLabel2: "Estimated cost per hour (₹)"
  },
  {
    id: 14,
    title: "Classroom Training",
    description: "Ineffective training delivery and knowledge transfer",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'monthly_incidents',
    inputLabel1: "Number of ineffective training sessions monthly",
    inputLabel2: "Estimated cost per failed training session (₹)"
  },
  {
    id: 15,
    title: "Meetings",
    description: "Unproductive meetings, poor facilitation, time wastage",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'weekly_hours',
    inputLabel1: "Hours wasted in unproductive meetings weekly",
    inputLabel2: "Estimated cost per hour (₹)"
  },
  {
    id: 16,
    title: "One-on-One Coaching",
    description: "Lack of individual mentoring and personalized development",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'weekly_hours',
    inputLabel1: "Hours lost due to lack of individual coaching weekly",
    inputLabel2: "Estimated cost per hour (₹)"
  },
  {
    id: 17,
    title: "Time Management",
    description: "Poor prioritization and time allocation across the organization",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'weekly_hours',
    inputLabel1: "Hours wasted due to poor time management weekly",
    inputLabel2: "Estimated cost per hour (₹)"
  },
  {
    id: 18,
    title: "Interviewing",
    description: "Poor hiring decisions due to ineffective interview processes",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'monthly_incidents',
    inputLabel1: "Number of poor hiring decisions monthly",
    inputLabel2: "Estimated cost per bad hire (₹)"
  },
  {
    id: 19,
    title: "Delegation",
    description: "Ineffective task assignment and follow-up processes",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'weekly_hours',
    inputLabel1: "Hours wasted due to poor delegation weekly",
    inputLabel2: "Estimated cost per hour (₹)"
  },
  {
    id: 20,
    title: "Conflict Management",
    description: "Inability to resolve disputes and maintain team harmony",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'monthly_incidents',
    inputLabel1: "Number of unresolved conflicts monthly",
    inputLabel2: "Estimated cost per unresolved conflict (₹)"
  },
  {
    id: 21,
    title: "Email Management",
    description: "Poor email communication and information overload",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'weekly_hours',
    inputLabel1: "Hours wasted on email inefficiencies weekly",
    inputLabel2: "Estimated cost per hour (₹)"
  },
  {
    id: 22,
    title: "Project Management",
    description: "Lack of structured project planning and execution",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'monthly_incidents',
    inputLabel1: "Number of delayed/failed projects monthly",
    inputLabel2: "Estimated cost per project failure (₹)"
  },
  {
    id: 23,
    title: "Vision Centric",
    description: "Lack of clear vision communication and alignment",
    isActive: false,
    timeWasted: 0,
    costPerUnit: 0,
    calculationType: 'weekly_hours',
    inputLabel1: "Hours lost due to lack of vision clarity weekly",
    inputLabel2: "Estimated cost per hour (₹)"
  }
];