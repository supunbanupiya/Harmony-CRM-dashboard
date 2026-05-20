import { RowDataPacket } from 'mysql2';
import { pool } from '../../db/pool';

type CountRow = RowDataPacket & { total: number };
type MoneyRow = RowDataPacket & { total: number | string | null };

export async function getDashboardSummary(ownerId: number) {
  const [[clients]] = await pool.query<CountRow[]>('SELECT COUNT(*) AS total FROM clients WHERE owner_id = ?', [ownerId]);
  const [[activeClients]] = await pool.query<CountRow[]>(
    "SELECT COUNT(*) AS total FROM clients WHERE owner_id = ? AND status = 'active'",
    [ownerId]
  );
  const [[openTasks]] = await pool.query<CountRow[]>(
    "SELECT COUNT(*) AS total FROM tasks WHERE owner_id = ? AND status != 'completed'",
    [ownerId]
  );
  const [[revenue]] = await pool.query<MoneyRow[]>(
    "SELECT COALESCE(SUM(amount), 0) AS total FROM deals WHERE owner_id = ? AND stage_id = 5",
    [ownerId]
  );
  const [[pipeline]] = await pool.query<MoneyRow[]>(
    'SELECT COALESCE(SUM(amount), 0) AS total FROM deals WHERE owner_id = ?',
    [ownerId]
  );

  const [stageRows] = await pool.query<RowDataPacket[]>(
    `SELECT ps.name, ps.color, COUNT(d.id) AS deals, COALESCE(SUM(d.amount), 0) AS amount
     FROM pipeline_stages ps
     LEFT JOIN deals d ON d.stage_id = ps.id AND d.owner_id = ?
     GROUP BY ps.id
     ORDER BY ps.sort_order ASC`,
    [ownerId]
  );

  const [recentActivity] = await pool.query<RowDataPacket[]>(
    `SELECT c.name AS clientName, cm.channel, cm.subject, cm.direction, cm.created_at AS createdAt
     FROM communications cm
     INNER JOIN clients c ON c.id = cm.client_id
     WHERE cm.owner_id = ?
     ORDER BY cm.created_at DESC
     LIMIT 6`,
    [ownerId]
  );

  return {
    cards: {
      clients: Number(clients.total),
      activeClients: Number(activeClients.total),
      openTasks: Number(openTasks.total),
      wonRevenue: Number(revenue.total),
      pipelineValue: Number(pipeline.total)
    },
    pipelineByStage: stageRows.map((row) => ({
      name: row.name,
      color: row.color,
      deals: Number(row.deals),
      amount: Number(row.amount)
    })),
    recentActivity
  };
}
