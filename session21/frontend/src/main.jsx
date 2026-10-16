import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const API = '/api';

function App() {
  const [incidents, setIncidents] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    investigating: 0,
    mitigated: 0,
    resolved: 0,
    critical: 0,
  });
  const [filter, setFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchIncidentsAndStats = async () => {
    try {
      setError('');
      const [resIncidents, resStats] = await Promise.all([
        fetch(`${API}/incidents`),
        fetch(`${API}/incidents/stats`),
      ]);

      if (!resIncidents.ok || !resStats.ok) {
        throw new Error('API service unreachable. Verify backend container and database.');
      }

      const incidentsData = await resIncidents.json();
      const statsData = await resStats.json();

      setIncidents(incidentsData);
      setStats(statsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidentsAndStats();
  }, []);

  const visibleIncidents =
    filter === 'ALL'
      ? incidents
      : incidents.filter((item) => item.status === filter);

  const advanceStatus = async (item) => {
    const statusWorkflow = {
      OPEN: 'INVESTIGATING',
      INVESTIGATING: 'MITIGATED',
      MITIGATED: 'RESOLVED',
      RESOLVED: 'OPEN',
    };
    const nextStatus = statusWorkflow[item.status] || 'OPEN';

    try {
      const res = await fetch(`${API}/incidents/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        fetchIncidentsAndStats();
      }
    } catch (err) {
      console.error('Failed to update incident status:', err);
    }
  };

  const deleteIncident = async (id) => {
    if (!window.confirm('Are you sure you want to delete this incident record?')) return;
    try {
      const res = await fetch(`${API}/incidents/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchIncidentsAndStats();
      }
    } catch (err) {
      console.error('Failed to delete incident:', err);
    }
  };

  const handleCreateIncident = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      title: formData.get('title'),
      service_name: formData.get('service_name'),
      severity: formData.get('severity'),
      status: 'OPEN',
      assignee: formData.get('assignee') || 'On-Call Engineer',
      description: formData.get('description') || '',
    };

    try {
      const res = await fetch(`${API}/incidents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        e.currentTarget.reset();
        setShowModal(false);
        fetchIncidentsAndStats();
      }
    } catch (err) {
      console.error('Failed to create incident:', err);
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">⚡</span>
          <div>
            <b>OpsPulse</b>
            <small>Incident & Reliability Platform</small>
          </div>
        </div>

        <nav>
          <a className="active">
            <span>🚨 Active Incidents</span>
          </a>
          <a>
            <span>📊 Service Health</span>
          </a>
          <a>
            <span>📈 SLOs & Metrics</span>
          </a>
          <a>
            <span>⚙️ Cluster Status</span>
          </a>
        </nav>

        <div className="side-bottom">
          <div className="system-pill">
            <span className="status-indicator live"></span>
            <div>
              <strong>Kubernetes EKS</strong>
              <small>Helm Release v1.0.0</small>
            </div>
          </div>
          <div className="profile">
            <div className="avatar">KC</div>
            <div>
              <b>Karthikeya</b>
              <small>DevOps Engineer</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header>
          <div>
            <p className="eyebrow">RELIABILITY / INCIDENT OPERATIONS</p>
            <h1>Production Incident Command</h1>
            <p className="muted">
              Live observability and rapid incident triage across Kubernetes services.
            </p>
          </div>
          <button className="primary" onClick={() => setShowModal(true)}>
            ＋ Log Incident
          </button>
        </header>

        {error && (
          <div className="alert">
            <span>⚠️</span>
            <div>
              <strong>Service Error:</strong> {error}
            </div>
          </div>
        )}

        <section className="stats">
          <StatCard label="Total Incidents" value={stats.total} icon="📋" />
          <StatCard label="Open / Triage" value={stats.open} icon="🚨" highlight={stats.open > 0} />
          <StatCard label="Investigating" value={stats.investigating} icon="🔍" />
          <StatCard label="Mitigated" value={stats.mitigated} icon="🛡️" />
          <StatCard label="Resolved" value={stats.resolved} icon="✅" />
          <StatCard
            label="Critical (P1)"
            value={stats.critical}
            icon="🔥"
            critical={stats.critical > 0}
          />
        </section>

        <section className="content-grid">
          <div className="panel tasks-panel">
            <div className="panel-head">
              <div>
                <h2>Incident Triage Queue</h2>
                <p className="muted">Filter by status to view active outages and mitigations.</p>
              </div>

              <div className="filters">
                {['ALL', 'OPEN', 'INVESTIGATING', 'MITIGATED', 'RESOLVED'].map((statusKey) => (
                  <button
                    key={statusKey}
                    className={filter === statusKey ? 'selected' : ''}
                    onClick={() => setFilter(statusKey)}
                  >
                    {statusKey === 'ALL' ? 'All Incidents' : statusKey}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="empty">Loading active incident stream…</div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Incident Title</th>
                      <th>Service</th>
                      <th>Severity</th>
                      <th>Status</th>
                      <th>Assignee</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleIncidents.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="task-title">
                            <span className={`dot ${item.severity.toLowerCase().replace('-', '_')}`}></span>
                            <div>
                              <b>{item.title}</b>
                              <small>{item.description || 'No impact notes provided'}</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="service-tag">{item.service_name}</span>
                        </td>
                        <td>
                          <span className={`priority ${item.severity.toLowerCase().replace('-', '_')}`}>
                            {item.severity}
                          </span>
                        </td>
                        <td>
                          <span className={`status ${item.status.toLowerCase()}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>{item.assignee}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="icon-btn"
                              onClick={() => advanceStatus(item)}
                              title="Advance Status"
                            >
                              ↻
                            </button>
                            <button
                              className="icon-btn delete-btn"
                              onClick={() => deleteIncident(item.id)}
                              title="Delete Incident"
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!visibleIncidents.length && (
                  <div className="empty">No incidents found in this filter view. All systems nominal.</div>
                )}
              </div>
            )}
          </div>

          <aside className="panel activity">
            <div className="panel-head">
              <div>
                <h2>Live Runbook Feed</h2>
                <p className="muted">Automated triggers and deployment telemetry.</p>
              </div>
            </div>

            <ActivityRow
              icon="🚀"
              text="Kubernetes deployment rolling update synced"
              time="4 min ago"
            />
            <ActivityRow
              icon="📡"
              text="Prometheus scrape target verified healthy"
              time="18 min ago"
            />
            <ActivityRow
              icon="🛡️"
              text="Trivy security gate completed with 0 Critical CVEs"
              time="45 min ago"
            />
            <ActivityRow
              icon="⚡"
              text="HPA scaled backend pods based on CPU utilization"
              time="2 hrs ago"
            />

            <div className="pipeline-tracker">
              <span className="step done">GitHub Actions</span>
              <span className="arrow">→</span>
              <span className="step done">Trivy</span>
              <span className="arrow">→</span>
              <span className="step done">GHCR</span>
              <span className="arrow">→</span>
              <span className="step active">EKS Helm</span>
            </div>
          </aside>
        </section>

        {showModal && (
          <div className="modal-backdrop">
            <form className="modal" onSubmit={handleCreateIncident}>
              <div className="modal-head">
                <div>
                  <p className="eyebrow">NEW INCIDENT</p>
                  <h2>Declare Operational Incident</h2>
                </div>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>

              <label>
                Incident Title
                <input
                  name="title"
                  required
                  placeholder="e.g. 504 Gateway Timeout spike on /api/checkout"
                />
              </label>

              <div className="form-row">
                <label>
                  Impacted Service
                  <input
                    name="service_name"
                    required
                    placeholder="e.g. auth-service, payment-api"
                  />
                </label>

                <label>
                  Severity
                  <select name="severity">
                    <option value="P1-CRITICAL">P1 - CRITICAL</option>
                    <option value="P2-HIGH">P2 - HIGH</option>
                    <option value="P3-MEDIUM" selected>
                      P3 - MEDIUM
                    </option>
                    <option value="P4-LOW">P4 - LOW</option>
                  </select>
                </label>
              </div>

              <div className="form-row">
                <label>
                  Lead Incident Responder / Assignee
                  <input
                    name="assignee"
                    defaultValue="Karthikeya"
                    placeholder="Responder name"
                  />
                </label>
              </div>

              <label>
                Impact Description & Mitigation Notes
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Observed error rates, affected customer segments, initial runbook steps taken..."
                ></textarea>
              </label>

              <button className="primary full" type="submit">
                Submit Incident to Command
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value, icon, highlight, critical }) {
  return (
    <div className={`stat ${highlight ? 'highlight' : ''} ${critical ? 'critical-box' : ''}`}>
      <div className="stat-icon">{icon}</div>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function ActivityRow({ icon, text, time }) {
  return (
    <div className="activity-row">
      <span className="activity-icon">{icon}</span>
      <div>
        <b>{text}</b>
        <small>{time}</small>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
