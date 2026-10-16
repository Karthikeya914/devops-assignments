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
        throw new Error('Could not reach backend API. Check if services are running.');
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
      console.error('Failed to update ticket status:', err);
    }
  };

  const deleteIncident = async (id) => {
    if (!window.confirm('Delete this ticket record?')) return;
    try {
      const res = await fetch(`${API}/incidents/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchIncidentsAndStats();
      }
    } catch (err) {
      console.error('Failed to delete ticket:', err);
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
      assignee: formData.get('assignee') || 'Karthikeya',
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
      console.error('Failed to create ticket:', err);
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">⚡</span>
          <div>
            <b>OpsPulse</b>
            <small>Helpdesk & Incident Queue</small>
          </div>
        </div>

        <nav>
          <a className="active">
            <span>📋 All Tickets</span>
          </a>
          <a>
            <span>📊 Service Status</span>
          </a>
          <a>
            <span>📈 Metrics & Latency</span>
          </a>
          <a>
            <span>⚙️ Cluster Health</span>
          </a>
        </nav>

        <div className="side-bottom">
          <div className="system-pill">
            <span className="status-indicator live"></span>
            <div>
              <strong>AWS EKS Cluster</strong>
              <small>Helm Release: opspulse</small>
            </div>
          </div>
          <div className="profile">
            <div className="avatar">KC</div>
            <div>
              <b>Karthikeya</b>
              <small>DevOps Lead</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header>
          <div>
            <p className="eyebrow">SUPPORT & OPERATIONS QUEUE</p>
            <h1>Incident & Ticket Board</h1>
            <p className="muted">
              Live operational tickets, ongoing investigations, and team mitigation notes.
            </p>
          </div>
          <button className="primary" onClick={() => setShowModal(true)}>
            ＋ New Ticket
          </button>
        </header>

        {error && (
          <div className="alert">
            <span>⚠️</span>
            <div>
              <strong>Backend Notice:</strong> {error}
            </div>
          </div>
        )}

        <section className="stats">
          <StatCard label="Total Tickets" value={stats.total} icon="📋" />
          <StatCard label="Needs Action" value={stats.open} icon="🚨" highlight={stats.open > 0} />
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
                <h2>Active Tickets</h2>
                <p className="muted">Filter by progress stage or priority.</p>
              </div>

              <div className="filters">
                {['ALL', 'OPEN', 'INVESTIGATING', 'MITIGATED', 'RESOLVED'].map((statusKey) => (
                  <button
                    key={statusKey}
                    className={filter === statusKey ? 'selected' : ''}
                    onClick={() => setFilter(statusKey)}
                  >
                    {statusKey === 'ALL' ? 'All' : statusKey.charAt(0) + statusKey.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="empty">Loading tickets from database…</div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Ticket Title</th>
                      <th>Service</th>
                      <th>Priority</th>
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
                              <small>{item.description || 'No additional notes provided'}</small>
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
                              title="Next Status Stage"
                            >
                              ↻ Next
                            </button>
                            <button
                              className="icon-btn delete-btn"
                              onClick={() => deleteIncident(item.id)}
                              title="Delete Record"
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
                  <div className="empty">No tickets in this view. Everything looks good!</div>
                )}
              </div>
            )}
          </div>

          <aside className="panel activity">
            <div className="panel-head">
              <div>
                <h2>Recent Events</h2>
                <p className="muted">Cluster and CI/CD automated updates.</p>
              </div>
            </div>

            <ActivityRow
              icon="🚀"
              text="Kubernetes deployment running in opspulse namespace"
              time="5 min ago"
            />
            <ActivityRow
              icon="📡"
              text="Prometheus scraping /metrics endpoint (HTTP 200)"
              time="12 min ago"
            />
            <ActivityRow
              icon="🛡️"
              text="Trivy security scan passed with 0 high CVEs"
              time="35 min ago"
            />
            <ActivityRow
              icon="⚡"
              text="PostgreSQL health check and connection pool OK"
              time="1 hr ago"
            />

            <div className="pipeline-tracker">
              <span className="step done">Pytest</span>
              <span className="arrow">→</span>
              <span className="step done">Trivy</span>
              <span className="arrow">→</span>
              <span className="step done">GHCR</span>
              <span className="arrow">→</span>
              <span className="step active">Helm</span>
            </div>
          </aside>
        </section>

        {showModal && (
          <div className="modal-backdrop">
            <form className="modal" onSubmit={handleCreateIncident}>
              <div className="modal-head">
                <div>
                  <p className="eyebrow">NEW TICKET</p>
                  <h2>Create Support Ticket</h2>
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
                Ticket Title
                <input
                  name="title"
                  required
                  placeholder="e.g. High latency observed on checkout endpoint"
                />
              </label>

              <div className="form-row">
                <label>
                  Affected Service
                  <input
                    name="service_name"
                    required
                    placeholder="e.g. core-api, auth-service"
                  />
                </label>

                <label>
                  Priority
                  <select name="severity">
                    <option value="P1-CRITICAL">P1 - Critical</option>
                    <option value="P2-HIGH">P2 - High</option>
                    <option value="P3-MEDIUM" selected>
                      P3 - Medium
                    </option>
                    <option value="P4-LOW">P4 - Low</option>
                  </select>
                </label>
              </div>

              <div className="form-row">
                <label>
                  Assignee
                  <input
                    name="assignee"
                    defaultValue="Karthikeya"
                    placeholder="Engineer name"
                  />
                </label>
              </div>

              <label>
                Details & Notes
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Steps taken, error logs observed, or notes for the team..."
                ></textarea>
              </label>

              <button className="primary full" type="submit">
                Save Ticket
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
