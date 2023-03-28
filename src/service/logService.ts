import { query } from '../db';
import { Action, Log } from '../db/models/log';

class LogService {
  createLog = async (
    action: Action,
    userId: number,
    productName: string
  ): Promise<void> => {
    await query<Log>(
      'INSERT INTO log (action, user_id, product_name) VALUES ($1, $2, $3)',
      [action, userId, productName]
    );
  };

  getLogs = async (): Promise<Log[]> => {
    const logs = await query<Log>(`
      SELECT log.id, log.datetime, log.product_name, log.action, "user".name as user_name
      FROM log
      INNER JOIN "user" ON log.user_id = "user".id
      order by log.id desc`);

    return logs.rows;
  };
}

export default new LogService();
