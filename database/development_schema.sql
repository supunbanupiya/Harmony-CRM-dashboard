DROP DATABASE IF EXISTS harmony_crm_development;
CREATE DATABASE harmony_crm_development CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE harmony_crm_development;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  company_name VARCHAR(160) DEFAULT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','manager','agent') NOT NULL DEFAULT 'admin',
  avatar_url VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT NOT NULL,
  name VARCHAR(160) NOT NULL,
  company VARCHAR(160) DEFAULT NULL,
  email VARCHAR(160) DEFAULT NULL,
  phone VARCHAR(40) DEFAULT NULL,
  status ENUM('lead','active','at_risk','won','lost') NOT NULL DEFAULT 'lead',
  value DECIMAL(12,2) NOT NULL DEFAULT 0,
  source VARCHAR(80) DEFAULT 'Website',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_clients_owner_status (owner_id, status),
  CONSTRAINT fk_clients_owner_dev FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE pipeline_stages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  sort_order INT NOT NULL,
  color VARCHAR(30) DEFAULT 'violet'
);

CREATE TABLE deals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT NOT NULL,
  client_id INT NOT NULL,
  stage_id INT NOT NULL,
  title VARCHAR(160) NOT NULL,
  amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  probability INT NOT NULL DEFAULT 20,
  expected_close_date DATE DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_deals_owner_stage (owner_id, stage_id),
  CONSTRAINT fk_deals_owner_dev FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_deals_client_dev FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  CONSTRAINT fk_deals_stage_dev FOREIGN KEY (stage_id) REFERENCES pipeline_stages(id)
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT NOT NULL,
  client_id INT DEFAULT NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT,
  status ENUM('todo','in_progress','completed') NOT NULL DEFAULT 'todo',
  priority ENUM('low','medium','high') NOT NULL DEFAULT 'medium',
  due_date DATE DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_tasks_owner_status (owner_id, status),
  CONSTRAINT fk_tasks_owner_dev FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_tasks_client_dev FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
);

CREATE TABLE communications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT NOT NULL,
  client_id INT NOT NULL,
  channel ENUM('email','phone','meeting','whatsapp','note') NOT NULL DEFAULT 'note',
  subject VARCHAR(180) NOT NULL,
  message TEXT,
  direction ENUM('inbound','outbound') NOT NULL DEFAULT 'outbound',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_comms_owner_client (owner_id, client_id),
  CONSTRAINT fk_comms_owner_dev FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_comms_client_dev FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  company VARCHAR(160) DEFAULT NULL,
  message TEXT NOT NULL,
  status ENUM('new','reviewed','closed') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_contact_status (status)
);
