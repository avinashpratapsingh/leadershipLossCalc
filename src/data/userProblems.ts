import { UserProblem, ProblemMapping } from '../types';

export const userProblems: UserProblem[] = [
  {
    id: 'communication-issues',
    text: 'Team members often misunderstand instructions or tasks',
    category: 'Communication'
  },
  {
    id: 'frequent-conflicts',
    text: 'There are frequent conflicts or tensions between team members',
    category: 'Team Dynamics'
  },
  {
    id: 'low-productivity',
    text: 'Team productivity is lower than expected',
    category: 'Performance'
  },
  {
    id: 'decision-delays',
    text: 'Important decisions take too long to make',
    category: 'Decision Making'
  },
  {
    id: 'employee-turnover',
    text: 'Good employees are leaving the company',
    category: 'Retention'
  },
  {
    id: 'missed-deadlines',
    text: 'Projects frequently miss deadlines',
    category: 'Project Management'
  },
  {
    id: 'lack-initiative',
    text: 'Team members wait for instructions instead of taking initiative',
    category: 'Ownership'
  },
  {
    id: 'poor-feedback',
    text: 'Employees seem unaware of their performance issues',
    category: 'Feedback'
  },
  {
    id: 'owner-overwhelm',
    text: 'As an owner/manager, I feel overwhelmed doing everything myself',
    category: 'Delegation'
  },
  {
    id: 'meeting-waste',
    text: 'Meetings are unproductive and waste time',
    category: 'Meetings'
  },
  {
    id: 'training-ineffective',
    text: 'Training programs don\'t seem to improve performance',
    category: 'Development'
  },
  {
    id: 'vision-unclear',
    text: 'Team members don\'t understand the company vision or goals',
    category: 'Vision'
  },
  {
    id: 'stress-burnout',
    text: 'High stress levels and burnout in the team',
    category: 'Well-being'
  },
  {
    id: 'hiring-mistakes',
    text: 'We often make poor hiring decisions',
    category: 'Hiring'
  },
  {
    id: 'email-chaos',
    text: 'Email communication is chaotic and inefficient',
    category: 'Communication'
  }
];

export const problemMappings: ProblemMapping[] = [
  {
    userProblem: userProblems.find(p => p.id === 'communication-issues')!,
    suggestedGaps: [1, 15, 21],
    explanation: 'Communication issues often stem from poor communication skills, ineffective meetings, and email management problems.'
  },
  {
    userProblem: userProblems.find(p => p.id === 'frequent-conflicts')!,
    suggestedGaps: [2, 10, 20],
    explanation: 'Team conflicts indicate gaps in emotional intelligence, conflict management, and overall conflict resolution skills.'
  },
  {
    userProblem: userProblems.find(p => p.id === 'low-productivity')!,
    suggestedGaps: [3, 17, 9],
    explanation: 'Low productivity is often caused by poor prioritization, time management issues, and lack of motivation.'
  },
  {
    userProblem: userProblems.find(p => p.id === 'decision-delays')!,
    suggestedGaps: [5, 4],
    explanation: 'Decision delays indicate poor decision-making processes and weak problem-solving capabilities.'
  },
  {
    userProblem: userProblems.find(p => p.id === 'employee-turnover')!,
    suggestedGaps: [2, 8, 9, 16],
    explanation: 'High turnover often results from poor emotional intelligence, ineffective feedback, low motivation, and lack of individual coaching.'
  },
  {
    userProblem: userProblems.find(p => p.id === 'missed-deadlines')!,
    suggestedGaps: [22, 17, 19],
    explanation: 'Missed deadlines indicate problems with project management, time management, and delegation.'
  },
  {
    userProblem: userProblems.find(p => p.id === 'lack-initiative')!,
    suggestedGaps: [9, 6, 7],
    explanation: 'Lack of initiative stems from low motivation, poor delegation, and lack of trust and openness.'
  },
  {
    userProblem: userProblems.find(p => p.id === 'poor-feedback')!,
    suggestedGaps: [8, 13, 16],
    explanation: 'Poor feedback indicates gaps in feedback skills, coaching abilities, and one-on-one coaching practices.'
  },
  {
    userProblem: userProblems.find(p => p.id === 'owner-overwhelm')!,
    suggestedGaps: [6, 19, 17],
    explanation: 'Owner overwhelm is typically caused by delegation gaps, poor delegation skills, and time management issues.'
  },
  {
    userProblem: userProblems.find(p => p.id === 'meeting-waste')!,
    suggestedGaps: [15],
    explanation: 'Unproductive meetings indicate a clear gap in meeting facilitation and management skills.'
  },
  {
    userProblem: userProblems.find(p => p.id === 'training-ineffective')!,
    suggestedGaps: [14, 13],
    explanation: 'Ineffective training suggests problems with classroom training delivery and coaching methodologies.'
  },
  {
    userProblem: userProblems.find(p => p.id === 'vision-unclear')!,
    suggestedGaps: [23, 1],
    explanation: 'Unclear vision indicates gaps in vision-centric leadership and communication of company direction.'
  },
  {
    userProblem: userProblems.find(p => p.id === 'stress-burnout')!,
    suggestedGaps: [11, 2, 17],
    explanation: 'Stress and burnout indicate mind management deficits, emotional intelligence gaps, and time management issues.'
  },
  {
    userProblem: userProblems.find(p => p.id === 'hiring-mistakes')!,
    suggestedGaps: [18],
    explanation: 'Poor hiring decisions directly indicate gaps in interviewing and candidate assessment skills.'
  },
  {
    userProblem: userProblems.find(p => p.id === 'email-chaos')!,
    suggestedGaps: [21],
    explanation: 'Email chaos indicates a clear gap in email management and communication efficiency.'
  }
];