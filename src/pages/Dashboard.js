import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { fetchLogs, fetchStats } from '../common/backendHelper';
import { ProSidebar } from '../components/ProSidebar';
import { isLoggedIn } from '../common/commonMethods';

const LEVELS = ['', 'INFO', 'WARN', 'ERROR'];
const SERVICES = ['', 'auth', 'payments', 'notifications'];

export const Dashboard = () => {
    const isUserLoggedIn = isLoggedIn();
    const navigate = useNavigate();

    const [logs, setLogs] = useState([]);
    const [stats, setStats] = useState({ counts: { INFO: 0, WARN: 0, ERROR: 0 }, totalCount: 0, errorRate: 0 });

    const [filters, setFilters] = useState({
        level: '',
        service: '',
        search: '',
    });

    useEffect(() => {
        if (!isUserLoggedIn) {
            navigate('/');
        }
    }, [isUserLoggedIn, navigate]);

    const fetchLogsAndStats = async () => {
        try {
            const params = { limit: 50 };
            if (filters.level) params.level = filters.level;
            if (filters.service) params.service = filters.service;

            const [logsRes, statsRes] = await Promise.all([
                fetchLogs(params),
                fetchStats(60),
            ]);

            setLogs(logsRes.data);
            setStats(statsRes.data);
        } catch (err) {
            console.error('Error fetching logs or stats:', err);
        }
    };

    useEffect(() => {
        fetchLogsAndStats();
        const interval = setInterval(fetchLogsAndStats, 5000);
        return () => clearInterval(interval);
    }, [filters.level, filters.service]);

    const filteredLogs = useMemo(() => {
        if (!filters.search) return logs;
        const s = filters.search.toLowerCase();
        return logs.filter(log =>
            log.message.toLowerCase().includes(s) ||
            log.level.toLowerCase().includes(s) ||
            log.service.toLowerCase().includes(s)
        );
    }, [logs, filters.search]);

    return (
        <div className='dashboardOuter'>
            <ProSidebar />
            <div className='mt-5 mx-5 w-100'>
                <h2 className='text-center mb-4'>Log Visualizer</h2>

                <div className='mb-4 d-flex gap-3 flex-wrap'>
                    <select
                        value={filters.level}
                        onChange={e => setFilters(f => ({ ...f, level: e.target.value }))}
                        className='form-select'
                        style={{ width: '150px' }}
                    >
                        {LEVELS.map(level => (
                            <option key={level} value={level}>
                                {level || 'All Levels'}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filters.service}
                        onChange={e => setFilters(f => ({ ...f, service: e.target.value }))}
                        className='form-select'
                        style={{ width: '180px' }}
                    >
                        {SERVICES.map(service => (
                            <option key={service} value={service}>
                                {service || 'All Services'}
                            </option>
                        ))}
                    </select>

                    <input
                        type='text'
                        placeholder='Search logs...'
                        value={filters.search}
                        onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
                        className='form-control'
                        style={{ flexGrow: 1, minWidth: '200px' }}
                    />
                </div>

                <div>
                    <h4>Recent Logs</h4>
                    <table className='table table-bordered table-striped mt-3'>
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>Level</th>
                                <th>Service</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className='text-center p-3'>
                                        No logs found.
                                    </td>
                                </tr>
                            ) : (
                                filteredLogs.map(log => (
                                    <tr key={log._id}>
                                        <td>{new Date(log.timestamp).toLocaleString()}</td>
                                        <td>{log.level}</td>
                                        <td>{log.service}</td>
                                        <td>{log.message}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className='mb-5'>
                    <h4>Log Stats (last 60s)</h4>
                    <Bar
                        data={{
                            labels: ['INFO', 'WARN', 'ERROR'],
                            datasets: [
                                {
                                    label: 'Count',
                                    data: [
                                        stats.counts.INFO || 0,
                                        stats.counts.WARN || 0,
                                        stats.counts.ERROR || 0,
                                    ],
                                    backgroundColor: ['#36a2eb', '#ffcc00', '#ff6384'],
                                },
                            ],
                        }}
                        options={{ responsive: true }}
                    />
                    <p className='mt-3'>
                        Total Logs: {stats.totalCount} | Error Rate: {stats.errorRate}%
                    </p>
                </div>
            </div>
        </div>
    );
};
