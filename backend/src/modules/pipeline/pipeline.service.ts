import { RowDataPacket } from 'mysql2';
import { pool } from '../../db/pool';

export async function getPipeline(ownerId: number) {
  const [stages] = await pool.query<RowDataPacket[]>(
    `SELECT id, name, sort_order AS sortOrder, color FROM pipeline_stages ORDER BY sort_order ASC`
  );

  const [deals] = await pool.query<RowDataPacket[]>(
    `SELECT d.id, d.title, d.amount, d.probability, d.stage_id AS stageId,
            d.expected_close_date AS expectedCloseDate,
            c.name AS clientName, c.company AS clientCompany
     FROM deals d
     INNER JOIN clients c ON c.id = d.client_id
     WHERE d.owner_id = ?
     ORDER BY d.updated_at DESC`,
    [ownerId]
  );

  return stages.map((stage) => ({
    ...stage,
    deals: deals.filter((deal) => deal.stageId === stage.id)
  }));
}
