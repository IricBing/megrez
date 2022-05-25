const nodeExporter = require('./node_exporter');
const postgresExporter = require('./postgres_exporter');
const mongodbExporter = require('./mongodb_exporter');
const redisExporter = require('./redis_exporter');
const clickhouseExporter = require('./clickhouse_exporter');
const nodejs = require('./nodejs');

module.exports = {
  title: 'exporters',
  path: '/运维/监控/Prometheus/exporters/',
  children: [nodeExporter, postgresExporter, redisExporter, mongodbExporter, clickhouseExporter, nodejs]
};
