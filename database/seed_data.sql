USE harmony_crm_local;

INSERT INTO users (id, name, company_name, email, password_hash, role, avatar_url) VALUES
(1, 'Harmony Admin', 'Harmony CRM', 'admin@harmonycrm.com', '$2a$10$uDCLAqTzO0BtJCU7JXmMqeD2U0cLQxdIfuXY.CIMwrTYz1BR6SUT.', 'admin', '/images/avatar-admin.svg');
-- Password: Admin@12345

INSERT INTO pipeline_stages (id, name, sort_order, color) VALUES
(1, 'New Lead', 1, 'sky'),
(2, 'Qualified', 2, 'violet'),
(3, 'Proposal', 3, 'amber'),
(4, 'Negotiation', 4, 'pink'),
(5, 'Won', 5, 'emerald');

INSERT INTO clients (id, owner_id, name, company, email, phone, status, value, source, notes) VALUES
(1, 1, 'Ava Perera', 'BrightPath Academy', 'ava@brightpath.test', '+94 77 123 4567', 'active', 42000, 'Website', 'Interested in annual CRM subscription.'),
(2, 1, 'Noah Silva', 'Nexa Imports', 'noah@nexa.test', '+94 71 555 8899', 'lead', 18500, 'Referral', 'Needs pipeline automation.'),
(3, 1, 'Mia Fernando', 'CloudNine Events', 'mia@cloudnine.test', '+94 76 888 2020', 'at_risk', 12200, 'LinkedIn', 'Requested follow-up this week.'),
(4, 1, 'Liam Jay', 'UrbanDesk Co', 'liam@urbandesk.test', '+94 70 444 3322', 'won', 76000, 'Campaign', 'Closed enterprise plan.'),
(5, 1, 'Sara Khan', 'EduPilot Global', 'sara@edupilot.test', '+94 75 101 6060', 'active', 53500, 'Website', 'Wants onboarding session.');

INSERT INTO deals (owner_id, client_id, stage_id, title, amount, probability, expected_close_date) VALUES
(1, 1, 3, 'Annual CRM subscription', 42000, 65, '2026-06-20'),
(1, 2, 1, 'Lead capture automation', 18500, 25, '2026-06-10'),
(1, 3, 4, 'Retention package', 12200, 50, '2026-05-28'),
(1, 4, 5, 'Enterprise CRM rollout', 76000, 100, '2026-05-12'),
(1, 5, 2, 'Education consultant dashboard', 53500, 45, '2026-07-01');

INSERT INTO tasks (owner_id, client_id, title, description, status, priority, due_date) VALUES
(1, 1, 'Send proposal PDF', 'Send final pricing and implementation timeline.', 'todo', 'high', '2026-05-22'),
(1, 2, 'Discovery call', 'Understand pipeline automation requirements.', 'in_progress', 'medium', '2026-05-24'),
(1, 3, 'Retention follow-up', 'Call and collect product feedback.', 'todo', 'high', '2026-05-21'),
(1, 5, 'Book onboarding demo', 'Create demo agenda for training session.', 'completed', 'medium', '2026-05-18');

INSERT INTO communications (owner_id, client_id, channel, subject, message, direction) VALUES
(1, 1, 'email', 'Proposal discussion', 'Shared pricing proposal and next steps.', 'outbound'),
(1, 2, 'phone', 'Discovery call booked', 'Client requested call on Thursday.', 'outbound'),
(1, 3, 'whatsapp', 'Support concern', 'Client mentioned low usage by team.', 'inbound'),
(1, 4, 'meeting', 'Implementation kickoff', 'Kickoff meeting completed successfully.', 'outbound'),
(1, 5, 'note', 'Training requirement', 'Client prefers weekend onboarding.', 'inbound');
