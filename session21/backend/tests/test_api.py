def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "UP"}

def test_root_endpoint(client):
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["service"] == "OpsPulse API"
    assert data["version"] == "1.0.0"

def test_readiness_check(client):
    response = client.get("/ready")
    assert response.status_code == 200
    assert response.json() == {"status": "READY"}

def test_create_incident(client):
    payload = {
        "title": "Payment Gateway Timeout Spike",
        "service_name": "payment-service",
        "severity": "P1-CRITICAL",
        "status": "OPEN",
        "description": "504 Gateway Timeouts exceeding 12% on checkout route",
        "assignee": "Karthikeya",
    }
    response = client.post("/api/incidents", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["id"] is not None
    assert data["title"] == payload["title"]
    assert data["severity"] == "P1-CRITICAL"
    assert data["status"] == "OPEN"
    assert data["service_name"] == "payment-service"

def test_list_incidents(client):
    client.post("/api/incidents", json={"title": "DB Connection Pool Exhaustion", "service_name": "db-cluster", "severity": "P2-HIGH"})
    client.post("/api/incidents", json={"title": "Redis Cache Miss Ratio Elevated", "service_name": "cache-service", "severity": "P3-MEDIUM"})

    response = client.get("/api/incidents")
    assert response.status_code == 200
    incidents = response.json()
    assert len(incidents) == 2
    assert incidents[0]["title"] == "Redis Cache Miss Ratio Elevated"  # ordered by id desc

def test_get_incident_by_id(client):
    res = client.post("/api/incidents", json={"title": "K8s Ingress Controller CrashLoop", "service_name": "ingress-nginx"})
    created_id = res.json()["id"]

    response = client.get(f"/api/incidents/{created_id}")
    assert response.status_code == 200
    assert response.json()["title"] == "K8s Ingress Controller CrashLoop"

def test_get_incident_not_found(client):
    response = client.get("/api/incidents/99999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Incident not found"

def test_update_incident(client):
    res = client.post("/api/incidents", json={"title": "TLS Certificate Expiry Warning", "status": "OPEN", "severity": "P2-HIGH"})
    created_id = res.json()["id"]

    update_payload = {"status": "MITIGATED", "description": "Renewed Let's Encrypt cert via Cert-Manager"}
    update_res = client.put(f"/api/incidents/{created_id}", json=update_payload)
    assert update_res.status_code == 200
    updated_data = update_res.json()
    assert updated_data["status"] == "MITIGATED"
    assert updated_data["description"] == update_payload["description"]

def test_incident_stats(client):
    client.post("/api/incidents", json={"title": "Inc 1", "status": "OPEN", "severity": "P1-CRITICAL"})
    client.post("/api/incidents", json={"title": "Inc 2", "status": "INVESTIGATING", "severity": "P2-HIGH"})
    client.post("/api/incidents", json={"title": "Inc 3", "status": "RESOLVED", "severity": "P3-MEDIUM"})

    response = client.get("/api/incidents/stats")
    assert response.status_code == 200
    stats = response.json()
    assert stats["total"] == 3
    assert stats["open"] == 1
    assert stats["investigating"] == 1
    assert stats["resolved"] == 1
    assert stats["critical"] == 1

def test_delete_incident(client):
    res = client.post("/api/incidents", json={"title": "Temporary Test Incident"})
    created_id = res.json()["id"]

    del_res = client.delete(f"/api/incidents/{created_id}")
    assert del_res.status_code == 204

    # Verify deleted
    get_res = client.get(f"/api/incidents/{created_id}")
    assert get_res.status_code == 404
