import app from './app';
import { log } from './utils/logger-error.util';

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  log.info(`Server is running on port ${PORT}`);
});
